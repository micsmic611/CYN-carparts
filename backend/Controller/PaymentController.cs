using backend.src.Core.Service;
using Microsoft.AspNetCore.Mvc;
using backend.src.Core.Interface;
using backend.DTOs;


namespace backend.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost]
        public async Task<IActionResult> AddPayment([FromBody] AddPaymentRequest request)
        {
            if (request == null || request.CartIds == null || request.CartIds.Length == 0)
            {
                return BadRequest("Invalid payment data.");
            }

            var payment = await _paymentService.AddPaymentAsync(
                request.UserId,
                request.CartIds,
                request.LocationId,
                request.ShippingId
            );

            // ดึง CartIds จากฐานข้อมูลเพื่อแสดงใน response
            var cartIds = payment.CartPayments.Select(cp => cp.CartId).ToArray();

            return CreatedAtAction(nameof(GetPaymentById), new
            {
                id = payment.Buy_id
            }, new
            {
                payment.Buy_id,
                payment.User_id,
                CartIds = cartIds, // ส่งกลับเป็น array
                payment.Total_price,
                payment.Location_id,
                payment.Status,
                payment.shipping_id
            });
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPaymentById(int id)
        {
            var payment = await _paymentService.GetPaymentByIdAsync(id);
            if (payment == null)
            {
                return NotFound();
            }

            return Ok(payment);
        }
        [HttpPost("update")]
        public async Task<IActionResult> UpdatePaymentStatus([FromBody] UpdatePaymentRequest request)
        {
            if (request == null)
            {
                return BadRequest("Request cannot be null.");
            }

            try
            {
                // อัปเดตสถานะการชำระเงินและเพิ่มข้อมูลใน Send
                await _paymentService.UpdatePaymentAndSendAsync(request.BuyId, request.UserId);
                return Ok("Payment status updated and Send record added.");
            }
            catch (Exception ex)
            {
                // จัดการข้อผิดพลาด
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("history/{userId}")]
        public async Task<IActionResult> GetPaymentHistory(int userId)
        {
            var history = await _paymentService.GetPaymentHistoryAsync(userId);
            if (history == null || !history.Any())
            {
                return NotFound("No payment history found.");
            }
            return Ok(history);
        }
    }
}
