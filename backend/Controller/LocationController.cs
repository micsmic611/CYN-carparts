using backend.src.Core.Interface;
using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
namespace backend.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _locationService;

        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpPost]
        public async Task<IActionResult> AddLocation([FromBody] LocationRequest request)
        {
            await _locationService.AddLocation(request.UserId, request.Address);
            return Ok(new { Message = "Location added successfully" });
        }
        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateLocation(int userId, int location_id, [FromBody] UpdateLocationRequest request)
        {
            await _locationService.UpdateLocationByUserId(userId, request.NewAddress,location_id);
            return Ok(new { Message = "Location updated successfully" });
        }
        [HttpGet("{userId}/{locationId}")]
        public async Task<IActionResult> GetLocation(int userId, int locationId)
        {
            var location = await _locationService.GetLocation(userId, locationId); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูล location

            if (location != null)
            {
                return Ok(location); // ส่งคืนข้อมูล location ที่พบ
            }

            return NotFound("Location not found."); // ส่งคืน 404 หากไม่พบ location
        }
    }
}
