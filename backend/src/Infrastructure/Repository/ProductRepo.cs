using backend.src.Entities;
using backend.src.Entity;
using backend.src.Infrastructure.Interface;
using backendAPI;
using Microsoft.EntityFrameworkCore;
using Product.DTOs;

namespace backend.src.Infrastructure.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _dbContext;
        private readonly ILogger<ProductDbo> _logger;

        public ProductRepository(DataContext dbContext, ILogger<ProductDbo> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task<List<ProductDbo>> GetProductByCategoriesIDAsync(int categoryId)
        {
            // ดึงข้อมูลที่มี categoryId ตรงกัน
            return await _dbContext.Products
                .Where(p => p.Categoryid == categoryId) // กรองตาม categoryId
                .ToListAsync();
        }


        public async Task<ProductDbo> GetAllProductByrPoductNameAsync(string ProductName)
        {
            return await _dbContext.Products.FirstOrDefaultAsync(u => u.Productname == ProductName);
        }

        public async Task<List<ProductWithCategoryDto>> GetAllProductsWithCategory()
        {
            return await _dbContext.Products
                .Join(
                    _dbContext.Categories,
                    product => product.Categoryid,
                    category => category.CategoryId,
                    (product, category) => new ProductWithCategoryDto
                    {
                        ProductId = product.Productid,
                        ProductName = product.Productname,
                        ProductDescription = product.ProductDescription,
                        Price = product.Price,
                        Stock = product.Stock,
                        CreatedAt = product.Created_at,
                        CategoryId = category.CategoryId,
                        Categoryname = category.Categoryname
                    }
                ).ToListAsync();
        }
        public async Task<ProductDbo> AddProductAsync(ProductDbo product)
        {
            await _dbContext.Set<ProductDbo>().AddAsync(product);
            await _dbContext.SaveChangesAsync();
            return product;
        }
        public async Task<ProductDbo> GetProductByIdAsync(int productId)
        {
            return await _dbContext.Products.FindAsync(productId);
        }

        public async Task UpdateProductAsync(ProductDbo product)
        {
            var existingProduct = await _dbContext.Products.FindAsync(product.Productid);
            if (existingProduct != null)
            {
                existingProduct.Productname = product.Productname;
                existingProduct.ProductDescription = product.ProductDescription;
                existingProduct.Price = product.Price;
                existingProduct.Stock = product.Stock;
                existingProduct.Categoryid = product.Categoryid;
                //existingProduct.Created_at = product.Created_at;
                // ไม่อัปเดตรูปภาพ
                // existingProduct.Product_img = product.Product_img; // คอมเมนต์บรรทัดนี้

                _dbContext.Products.Update(existingProduct);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task DeleteProductAsync(int productId)
        {
            var product = await _dbContext.Products.FindAsync(productId);
            if (product != null)
            {
                _dbContext.Products.Remove(product);
                await _dbContext.SaveChangesAsync();
            }
        }
        public async Task<LocationDbo> GetAllLocationByUseridAsync(int User_id)
        {
            return await _dbContext.Location.FirstOrDefaultAsync(u => u.User_id == User_id);
        }

        public async Task<ShippingDbo> GetAllShippingByshippingidAsync(int Shipping_id)
        {
            return await _dbContext.Shipping.FirstOrDefaultAsync(u => u.Shipping_id == Shipping_id);
        }

    }
}