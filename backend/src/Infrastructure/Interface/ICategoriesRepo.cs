using backend.src.Entity;

namespace backend.src.Infrastructure.Interface
{
    public interface ICategoryRepository
    {
        Task<List<CategorieDbo>> GetAllCategoriesAsync();
    }
}
