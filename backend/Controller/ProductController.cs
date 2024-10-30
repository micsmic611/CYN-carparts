using backend.src.Core.Interface;
using backend.src.Core.Service;
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
        private readonly string _imagePath = @"D:\Internet\src\img";

        public ProductController(IProductService productService, ILogger<ProductDto> logger)
        {
            _ProductService = productService;
            _logger = logger;
            if (!Directory.Exists(_imagePath))
            {
                Directory.CreateDirectory(_imagePath); // ตรวจสอบและสร้างโฟลเดอร์หากยังไม่มี
            }
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
        [HttpPost("add")]
        public async Task<IActionResult> AddProduct([FromForm] ProductDtos productDtos, IFormFile productImage)
        {
            if (productImage == null || productImage.Length == 0)
                return BadRequest("Please upload a valid image.");

            // สร้างชื่อไฟล์ใหม่ด้วย GUID เพื่อป้องกันชื่อซ้ำกัน
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(productImage.FileName)}";
            var fullPath = Path.Combine(_imagePath, fileName);

            // บันทึกรูปภาพลง path
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await productImage.CopyToAsync(stream);
            }

            // บันทึกข้อมูลสินค้า พร้อม path ของรูปในฐานข้อมูล
            productDtos.ProductImgPath = fullPath; // อัปเดต path ใน Dto

            var result = await _ProductService.AddProductAsync(productDtos, fullPath);

            return Ok(result);
        }
        [HttpPut("{productId}")]
        public async Task<IActionResult> UpdateProduct(int productId, [FromBody] UpdateProductDto productDto)
        {
            if (productId != productDto.Productid)
            {
                return BadRequest("Product ID mismatch");
            }

            var productToUpdate = new ProductDbo
            {
                Productid = productDto.Productid,
                Productname = productDto.Productname,
                ProductDescription = productDto.ProductDescription,
                Price = productDto.Price,
                Stock = productDto.Stock,
                Categoryid = productDto.Categoryid,
                //Created_at = productDto.Created_at
            };

            await _ProductService.UpdateProductAsync(productToUpdate);
            return NoContent(); // สถานะ HTTP 204 No Content
        }
        [HttpDelete("{productId}")]
        public async Task<IActionResult> DeleteProduct(int productId)
        {
            var product = await _ProductService.GetProductAsync(productId);
            if (product == null)
            {
                return NotFound(); // สถานะ HTTP 404 Not Found
            }

            await _ProductService.DeleteProductAsync(productId);
            return NoContent(); // สถานะ HTTP 204 No Content
        }
        [HttpGet("Location")]
        public async Task<ActionResult<LocationDbo>> GetAllLocationByUseridAsync(int User_id)
        {
            try
            {
                var user = await _ProductService.GetAllLocationByUseridAsync(User_id);

                if (user == null)
                {
                    return NotFound($"User with ID {User_id} not found.");
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving user for userID {UserID}", User_id);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("Shipping")]
        public async Task<ActionResult<ShippingDbo>> GetAllShippingByshippingidAsync(int Shipping_id)
        {
            try
            {
                var user = await _ProductService.GetAllShippingByshippingidAsync(Shipping_id);

                if (user == null)
                {
                    return NotFound($"User with ID {Shipping_id} not found.");
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving user for userID {UserID}", Shipping_id);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}