using backend.src.Entity;
using Product.DTOs;

namespace backend.src.Infrastructure.Interface
{
    public interface IProductRepository
    {
        Task<List<ProductDbo>> GetProductByCategoriesIDAsync(int categoryId);
        Task<ProductDbo> GetAllProductByrPoductNameAsync(string ProductName);
        Task<List<ProductWithCategoryDto>> GetAllProductsWithCategory();
        Task<ProductDbo> AddProductAsync(ProductDbo product);
        Task<ProductDbo> GetProductByIdAsync(int productId);
        Task UpdateProductAsync(ProductDbo product);
        Task DeleteProductAsync(int productId);
        Task<ShippingDbo> GetAllShippingByshippingidAsync(int Shipping_id);
        Task<List<LocationDbo>> GetAllLocationByUseridAsync(int User_id);
        Task<ProductWithCategoryDto> GetProductsWithCategory1(int productId);

    }
}
