using backend.src.Entity;
using Product.DTOs;

namespace backend.src.Infrastructure.Interface
{
    public interface IProductRepository
    {
        Task<List<ProductDbo>> GetProductByCategoriesIDAsync(int categoryId);
        Task<ProductDbo> GetAllProductByrPoductNameAsync(string ProductName);
        Task<List<ProductWithCategoryDto>> GetAllProductsWithCategory();
    }
}
