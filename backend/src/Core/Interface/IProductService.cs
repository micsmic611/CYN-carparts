using backend.src.Entity;
using Product.DTOs;

namespace backend.src.Core.Interface
{
    public interface IProductService
    {
        Task<List<ProductDbo>> GetProductByCategoriesIDAsync(int categoryId);
        Task<ProductDbo> GetAllProductByProductNameAsync(string ProductName);
        Task<List<ProductWithCategoryDto>> GetAllProductsWithCategory();
    }

}
