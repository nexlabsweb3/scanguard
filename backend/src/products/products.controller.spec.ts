import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    submitProduct: jest.fn(),
  };

  const mockProductDto = {
    name: 'Test Product',
    image: 'test-image.jpg',
    manufacturer: 'Test Manufacturer',
    manufactureDate: '2024-03-20',
    expiryDate: '2025-03-20',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProduct', () => {
    it('should successfully create a product', async () => {
      const expectedResponse = { ipfs_hash: 'QmTest123' };
      mockProductsService.submitProduct.mockResolvedValue(expectedResponse);

      const result = await controller.createProduct(mockProductDto);

      expect(result).toEqual(expectedResponse);
      expect(service.submitProduct).toHaveBeenCalledWith(mockProductDto);
    });

    it('should throw BadRequest when required fields are missing', async () => {
      const incompleteDto = {
        name: 'Test Product',
        // missing other required fields
      };

      await expect(controller.createProduct(incompleteDto as any)).rejects
        .toThrow(new HttpException('Some fields are missing', HttpStatus.BAD_REQUEST));
      
      expect(service.submitProduct).not.toHaveBeenCalled();
    });

    it('should throw InternalServerError when service throws unknown error', async () => {
      mockProductsService.submitProduct.mockRejectedValue(new Error('Unknown error'));

      await expect(controller.createProduct(mockProductDto)).rejects
        .toThrow(new HttpException('Error uploading to IPFS', HttpStatus.INTERNAL_SERVER_ERROR));
    });

    it('should propagate HttpException from service', async () => {
      const httpError = new HttpException('Service error', HttpStatus.BAD_REQUEST);
      mockProductsService.submitProduct.mockRejectedValue(httpError);

      await expect(controller.createProduct(mockProductDto)).rejects
        .toThrow(httpError);
    });
  });
});
