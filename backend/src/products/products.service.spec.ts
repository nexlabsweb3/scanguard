import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let configService: ConfigService;

  const mockConfigService = {
    get: jest.fn().mockReturnValue('mock-jwt-token'),
  };

  const mockProductDto = {
    name: 'Test Product',
    image: 'test-image.jpg',
    manufacturer: 'Test Manufacturer',
    manufactureDate: '2024-03-20',
    expiryDate: '2025-03-20',
  };

  const mockPinataResponse = {
    IpfsHash: 'QmTest123',
    PinSize: 1234,
    Timestamp: '2024-03-20T12:00:00.000Z',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    configService = module.get<ConfigService>(ConfigService);

    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockPinataResponse),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('submitProduct', () => {
    it('should successfully submit a product and return IPFS hash', async () => {
      const result = await service.submitProduct(mockProductDto);
      
      expect(result).toEqual({ ipfs_hash: mockPinataResponse.IpfsHash });
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        expect.objectContaining({
          method: 'POST',
          headers: {
            Authorization: 'Bearer mock-jwt-token',
          },
        })
      );
    });

    it('should generate a product_id of correct length', async () => {
      const spy = jest.spyOn(service as any, 'generateProductId');
      await service.submitProduct(mockProductDto);
      
      expect(spy).toHaveBeenCalledWith(10);
      const generatedId = spy.mock.results[0].value;
      expect(generatedId.length).toBe(10);
    });

    it('should throw an error when Pinata API call fails', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('API Error'));

      await expect(service.submitProduct(mockProductDto)).rejects.toThrow();
    });
  });
});
