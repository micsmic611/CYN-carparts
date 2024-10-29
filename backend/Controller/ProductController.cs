using backend.src.Core.Interface;
using backend.src.Entity;
using Microsoft.AspNetCore.Mvc;
using Product.DTOs;

namespace backend.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _ProductService;
        private readonly ILogger<ProductDto> _logger;

        public ProductController(IProductService productService, ILogger<ProductDto> logger)
        {
            _ProductService = productService;
            _logger = logger;
        }

        [HttpGet("ProductbycategoryId/{categoryId}")]
        public async Task<ActionResult<List<ProductDto>>> GetProductByCategoriesIDAsync(int categoryId)
        {
            try
            {
                var products = await _ProductService.GetProductByCategoriesIDAsync(categoryId);

                if (products == null || !products.Any())
                {
                    return NotFound($"No products found for category ID {categoryId}");
                }

                return Ok(products);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving products for category ID {CategoryId}", categoryId);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("ProductByProductName/{productName}")] // ใช้ชื่อที่ถูกต้องและตรงกัน
        public async Task<ActionResult<ProductDbo>> GetAllProductByProductNameAsync(string productName)
        {
            try
            {
                // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลผลิตภัณฑ์ตามชื่อ
                var product = await _ProductService.GetAllProductByProductNameAsync(productName);

                // ตรวจสอบว่าพบผลิตภัณฑ์หรือไม่
                if (product == null)
                {
                    return NotFound($"No product found for name {productName}");
                }

                return Ok(product); // ส่งคืนข้อมูลผลิตภัณฑ์ที่ค้นพบ
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving product for name {ProductName}", productName);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("warehouserental")]
        public async Task<IActionResult> GetAllProductsWithCategory()
        {
            try
            {

                var productService = await _ProductService.GetAllProductsWithCategory();
                return Ok(productService); // ส่งผลลัพธ์กลับในรูปแบบ JSON
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message }); // ส่ง HTTP 404 ถ้าไม่พบข้อมูล
            }
            catch (ApplicationException ex)
            {
                return StatusCode(500, new { message = ex.Message }); // ส่ง HTTP 500 เมื่อเกิดข้อผิดพลาดภายใน
            }
        }



    }
}
