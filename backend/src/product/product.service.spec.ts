import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { InternalServerErrorException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: {
            flaggedProduct: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('submitProduct', () => {
    it('should successfully submit a product and return IPFS hash', async () => {
      const dto: ProductDto = {
        name: 'Test Product',
        image: 'http://example.com/image.jpg',
        manufacturer: 'Test Manufacturer',
        manufactureDate: '2023-01-01',
        expiryDate: '2025-01-01',
      };

      jest.spyOn(service, 'pinToIPFS').mockResolvedValue({
        IpfsHash: 'QmUiPq1dRygSjwCBAqxvwaJxbGVFyHmPmSrL4YiytJFfkh',
      });

      const result = await service.uploadProduct(dto);
      expect(result).toEqual('QmUiPq1dRygSjwCBAqxvwaJxbGVFyHmPmSrL4YiytJFfkh');
    });

    it('should throw an error if pinToIPFS fails', async () => {
      const dto: ProductDto = {
        name: 'Test Product',
        image: 'http://example.com/image.jpg',
        manufacturer: 'Test Manufacturer',
        manufactureDate: '2023-10-01',
        expiryDate: '2025-01-01',
      };

      jest
        .spyOn(service, 'pinToIPFS')
        .mockRejectedValue(new Error('Error uploading to IPFS'));

      await expect(service.uploadProduct(dto)).rejects.toThrow(
        'Error uploading to IPFS'
      );
    });
  });

  describe('flagProduct', () => {
    const mockFlagProductDto = {
      name: 'Suspicious Product',
      image: 'http://example.com/suspicious.jpg',
      reason: 'Fake product',
    };

    it('should successfully flag a product', async () => {
      const mockCreatedProduct = {
        id: '1',
        ...mockFlagProductDto,
      };
      jest
        .spyOn(prismaService.flaggedProduct, 'create')
        .mockResolvedValue(mockCreatedProduct);

      const result = await service.flagProduct(mockFlagProductDto);

      expect(result).toEqual(mockCreatedProduct);
      expect(prismaService.flaggedProduct.create).toHaveBeenCalledWith({
        data: mockFlagProductDto,
      });
    });

    it('should throw InternalServerErrorException when flagging fails', async () => {
      jest
        .spyOn(prismaService.flaggedProduct, 'create')
        .mockRejectedValue(new Error('Database error'));

      await expect(service.flagProduct(mockFlagProductDto)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });

  describe('getFlaggedProducts', () => {
    it('should return all flagged products', async () => {
      const mockFlaggedProducts = [
        { id: '1', name: 'Product 1', image: 'image1.jpg', reason: 'Fake' },
        { id: '2', name: 'Product 2', image: 'image2.jpg', reason: 'Expired' },
      ];

      jest
        .spyOn(prismaService.flaggedProduct, 'findMany')
        .mockResolvedValue(mockFlaggedProducts);

      const result = await service.getFlaggedProducts();

      expect(result).toEqual(mockFlaggedProducts);
      expect(prismaService.flaggedProduct.findMany).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException when fetch fails', async () => {
      jest
        .spyOn(prismaService.flaggedProduct, 'findMany')
        .mockRejectedValue(new Error('Database error'));

      await expect(service.getFlaggedProducts()).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });
});
