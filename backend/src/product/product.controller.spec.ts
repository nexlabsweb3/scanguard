import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

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
});
