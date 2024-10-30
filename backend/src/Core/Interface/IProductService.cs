using backend.src.Entity;
using Product.DTOs;

namespace backend.src.Core.Interface
{
    public interface IProductService
    {
        Task<List<ProductDbo>> GetProductByCategoriesIDAsync(int categoryId);
        Task<ProductDbo> GetAllProductByProductNameAsync(string ProductName);
        Task<List<ProductWithCategoryDto>> GetAllProductsWithCategory();
        Task<ProductDtos> AddProductAsync(ProductDtos productDtos, string imagePath);
        Task UpdateProductAsync(ProductDbo product);
        Task<ProductDbo> GetProductAsync(int productId);
        Task DeleteProductAsync(int productId);
        Task<LocationDbo> GetAllLocationByUseridAsync(int User_id);
        Task<ShippingDbo> GetAllShippingByshippingidAsync(int Shipping_id);
    }

}
