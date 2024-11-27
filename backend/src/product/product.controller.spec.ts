import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { HttpException } from '@nestjs/common';

describe('ProductsController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            submitProduct: jest.fn(),
            flagProduct: jest.fn(),
            getFlaggedProducts: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('submitProduct', () => {
    it('should return IPFS hash on successful submission', async () => {
      const dto: ProductDto = {
        name: 'Test Product',
        image: 'http://example.com/image.jpg',
        manufacturer: 'Test Manufacturer',
        manufactureDate: '2023-01-01',
        expiryDate: '2025-01-01',
      };

      jest
        .spyOn(service, 'uploadProduct')
        .mockResolvedValue('QmUiPq1dRygSjwCBAqxvwaJxbGVFyHmPmSrL4YiytJFfkh');

      const result = await controller.uploadProduct(dto);
      expect(result).toEqual({
        ipfs_hash: 'QmUiPq1dRygSjwCBAqxvwaJxbGVFyHmPmSrL4YiytJFfkh',
      });
    });

    it('should throw an error if submission fails', async () => {
      const dto: ProductDto = {
        name: 'Test Product',
        image: 'http://example.com/image.jpg',
        manufacturer: 'Test Manufacturer',
        manufactureDate: '2023-01-01',
        expiryDate: '2025-01-01',
      };

      jest
        .spyOn(service, 'uploadProduct')
        .mockRejectedValue(new Error('Error uploading to IPFS'));

      await expect(controller.uploadProduct(dto)).rejects.toThrow();
    });
  });

  describe('flagProduct', () => {
    const mockFlagProductDto = {
      name: 'Suspicious Product',
      image: 'http://example.com/suspicious.jpg',
      reason: 'Fake product',
    };

    it('should successfully flag a product', async () => {
      const mockResponse = {
        id: '1',
        ...mockFlagProductDto,
      };
      jest.spyOn(service, 'flagProduct').mockResolvedValue(mockResponse);

      const result = await controller.flagProduct(mockFlagProductDto);

      expect(result).toEqual(mockResponse);
      expect(service.flagProduct).toHaveBeenCalledWith(mockFlagProductDto);
    });

    it('should throw HttpException when flagging fails', async () => {
      jest
        .spyOn(service, 'flagProduct')
        .mockRejectedValue(new Error('Failed to flag'));

      await expect(controller.flagProduct(mockFlagProductDto)).rejects.toThrow(
        HttpException
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
        .spyOn(service, 'getFlaggedProducts')
        .mockResolvedValue(mockFlaggedProducts);

      const result = await controller.getFlaggedProducts();

      expect(result).toEqual(mockFlaggedProducts);
      expect(service.getFlaggedProducts).toHaveBeenCalled();
    });
  });
});
