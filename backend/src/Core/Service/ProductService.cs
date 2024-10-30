using backend.DTOs;
using backend.src.Core.Interface;
using backend.src.Entity;
using backend.src.Infrastructure.Interface;
using backend.src.Infrastructure.Repository;
using backendAPI;
using Microsoft.EntityFrameworkCore;
using Product.DTOs;


namespace backend.src.Core.Service
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _ProductRepository;
        private readonly ILogger<ProductService> _logger;
        private readonly DataContext _dataContext;

        public ProductService(IProductRepository productRepository, ILogger<ProductService> logger, DataContext dataContext)
        {
            _ProductRepository = productRepository;
            _logger = logger;
            _dataContext = dataContext;
        }

        public async Task<List<ProductDbo>> GetProductByCategoriesIDAsync(int categoryId)
        {
            try
            {
                // ดึงข้อมูลผลิตภัณฑ์ตาม categoryIds
                var products = await _ProductRepository.GetProductByCategoriesIDAsync(categoryId);
                var productDtos = products.Select(s => new ProductDbo
                {
                    Productname = s.Productname,
                    ProductDescription = s.ProductDescription
                    // สามารถเพิ่มข้อมูลอื่นๆ ที่ต้องการได้ที่นี่
                }).ToList();

                return productDtos;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving products for category ID {CategoryId}", categoryId);
                throw; // หรือจัดการ exception ตามที่ต้องการ
            }
        }

        public async Task<ProductDbo> GetAllProductByProductNameAsync(string ProductName)
        {
            try
            {
                // ค้นหาสินค้าที่มีชื่อเท่ากับ ProductName ในฐานข้อมูล
                var product = await _dataContext.Products
                                              .Where(p => p.Productname == ProductName)
                                              .Select(p => new ProductDbo
                                              {
                                                  Productid = p.Productid,
                                                  //Sellerid = p.Sellerid,
                                                  Productname = p.Productname,
                                                  ProductDescription = p.ProductDescription,
                                                  Price = p.Price,
                                                  Stock = p.Stock,
                                                  Categoryid = p.Categoryid,
                                                  Created_at = p.Created_at
                                              })
                                              .FirstOrDefaultAsync();

                return product;
            }
            catch (Exception ex)
            {
                // จัดการ exception และส่งต่อถ้าต้องการ
                throw new Exception($"Error retrieving product by name: {ProductName}", ex);
            }
        }

        public async Task<List<ProductWithCategoryDto>> GetAllProductsWithCategory()
        {
            try
            {
                var productsWithCategory = await _ProductRepository.GetAllProductsWithCategory();
                if (productsWithCategory == null)
                {
                    throw new KeyNotFoundException("product not found .");
                }
                return productsWithCategory;
            }
            catch (Exception ex)
            {
                // เพิ่มข้อความแสดงข้อผิดพลาดจาก exception ที่แท้จริง
                throw new ApplicationException($"An error occurred while retrieving the product data: {ex.Message}", ex);
            }
        }
        public async Task<ProductDtos> AddProductAsync(ProductDtos productDtos, string imagePath)
        {
            // สร้าง Dbo จาก Dto ที่ส่งเข้ามา
            var product = new ProductDbo
            {
                Productname = productDtos.ProductName,
                ProductDescription = productDtos.ProductDescription,
                Price = productDtos.Price,
                Stock = productDtos.Stock,
                Categoryid = productDtos.CategoryId,
                Product_img = imagePath, // บันทึก path ของรูป
                Created_at = DateTime.Now
            };

            // บันทึกสินค้าในฐานข้อมูล
            await _ProductRepository.AddProductAsync(product);

            return productDtos;
        }
        public async Task<ProductDbo> GetProductAsync(int productId)
        {
            return await _ProductRepository.GetProductByIdAsync(productId);
        }

        public async Task UpdateProductAsync(ProductDbo product)
        {
            await _ProductRepository.UpdateProductAsync(product);
        }
        public async Task DeleteProductAsync(int productId)
        {
            await _ProductRepository.DeleteProductAsync(productId);
        }
        public async Task<LocationDbo> GetAllLocationByUseridAsync(int User_id)
        {
            return await _dataContext.Location
                .Where(u => u.User_id == User_id)
                .Select(u => new LocationDbo
                {
                    Location_id = u.Location_id,
                    User_id = u.User_id,
                    Address = u.Address,

                })
                .FirstOrDefaultAsync();
        }

        public async Task<ShippingDbo> GetAllShippingByshippingidAsync(int Shipping_id)
        {
            return await _dataContext.Shipping
                .Where(s => s.Shipping_id == Shipping_id)
                .Select(s => new ShippingDbo
                {
                    Shipping_id = s.Shipping_id,
                    Shipping_name = s.Shipping_name,
                })
                .FirstOrDefaultAsync();
        }
    }
}