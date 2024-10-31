using System.Collections.Generic;
using System.Threading.Tasks;
using backend.src.Core.Interface;
using backend.src.Entity;
using backend.src.Service;
using Microsoft.AspNetCore.Mvc;

namespace backend.src.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoryController(ICategoryService service)
        {
            _service = service;
        }

        // API สำหรับดึงข้อมูล Categories ทั้งหมด
        [HttpGet("GetAllcategoryId")]
        public async Task<ActionResult<List<CategorieDbo>>> GetAllcategoryId()
        {
            var categories = await _service.GetAllCategoriesAsync();
            if (categories == null || categories.Count == 0)
            {
                return NotFound("No categories found.");
            }
            return Ok(categories);
        }
    }
}
