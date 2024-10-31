using System.Collections.Generic;
using System.Threading.Tasks;
using backend.src.Entity;
using Microsoft.EntityFrameworkCore;
using backend.src.Infrastructure.Interface;
using backendAPI;

namespace backend.src.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DataContext _dbcontext;
        public CategoryRepository(DataContext context) // แก้ไขตรงนี้เป็น DataContext
        {
            _dbcontext = context;
        }

        public async Task<List<CategorieDbo>> GetAllCategoriesAsync()
        {
            return await _dbcontext.Set<CategorieDbo>().ToListAsync();
        }
    }

    
}
