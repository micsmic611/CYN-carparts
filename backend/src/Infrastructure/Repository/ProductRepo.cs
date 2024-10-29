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
        private readonly ILogger<Products> _logger;

        public ProductRepository(DataContext dbContext, ILogger<Products> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task<List<Products>> GetProductByCategoriesIDAsync(int categoryId)
        {
            // ดึงข้อมูลที่มี categoryId ตรงกัน
            return await _dbContext.Product
                .Where(p => p.Categoryid == categoryId) // กรองตาม categoryId
                .ToListAsync();
        }


        public async Task<Products> GetAllProductByrPoductNameAsync(string ProductName)
        {
            return await _dbContext.Product.FirstOrDefaultAsync(u => u.Productname == ProductName);
        }

        public async Task<List<ProductWithCategoryDto>> GetAllProductsWithCategory()
        {
            return await _dbContext.Product
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
        //อัพเดต โปรไฟล์
        //public async Task<UserDbo> UpdateUserAsync(UserDbo user)

        //หน้ารายงาน
        //public async Task<Orders>


    }
}
