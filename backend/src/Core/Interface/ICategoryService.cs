using backend.src.Entity;

namespace backend.src.Core.Interface
{
    public interface ICategoryService
    {
        Task<List<CategorieDbo>> GetAllCategoriesAsync();
    }
}
