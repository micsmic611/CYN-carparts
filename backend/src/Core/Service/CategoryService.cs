using System.Collections.Generic;
using System.Threading.Tasks;
using backend.src.Entity;
using backend.src.Infrastructure.Interface;
using backend.src.Repository;
using backend.src.Core.Interface;
namespace backend.src.Service
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repository;

        public CategoryService(ICategoryRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<CategorieDbo>> GetAllCategoriesAsync()
        {
            return await _repository.GetAllCategoriesAsync();
        }
    }
}