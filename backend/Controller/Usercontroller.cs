using System;
using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.src.Infrastructure.Interface;
using backend.src.Entities;
using BCrypt.Net;
using backend.Helpers;
using System.Net;
using backend.src.Core.Interface;
using backend.src.Core.Service;
using Product.DTOs;
using Microsoft.Extensions.Logging;

namespace backend.Controller
{
    [Route("api")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly IUserService _UserService;
        private readonly ILogger<UserController> _logger; // ใช้ ILogger<UserController>

        public UserController(IUserRepository repository, IUserService userService, ILogger<UserController> logger)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _UserService = userService ?? throw new ArgumentNullException(nameof(userService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));  // ตรวจสอบว่า logger ไม่เป็น null
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var user = new backend.src.Entities.UserDbo
            {
                Username = dto.Username,
                Firstname = dto.Firstname,
                Lastname = dto.Lastname,
                email = dto.email,
                phone = dto.phone,
                address = dto.address,
                RoleId = dto.RoleId = 1,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            await _repository.AddUserAsync(user);
            return Created("success", user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _repository.GetByusername(dto.Username);
            if (user == null)
            {
                return Unauthorized("Invalid credentials.");
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.Password);
            if (!isPasswordValid)
            {
                return Unauthorized("Invalid credentials.");
            }

            // Generate JWT
            var token = _UserService.Generate(user.UserID, user.RoleId ?? 0); // ส่ง userID และ roleID
            return Ok(new { Token = token });
        }

        [HttpGet("user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _UserService.Verify(jwt);
                int userId = int.Parse(token.Issuer);
                var user = _repository.GetById(userId);
                return Ok(user);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new { message = "success" });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(string username, string newPassword)
        {
            var user = await _repository.GetByusername(username);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);
            await _repository.Update(user); // สมมุติว่ามีเมธอดสำหรับอัปเดตผู้ใช้

            return Ok("Password reset successfully.");
        }

        [HttpGet("user/{userID}")]
        public async Task<ActionResult<UserDbo>> GetUserByUserID(int userID)
        {
            try
            {
                var user = await _UserService.GetUserByUserID(userID);

                if (user == null)
                {
                    return NotFound($"User with ID {userID} not found.");
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving user for userID {UserID}", userID);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("Userbyrole")]
        public async Task<ActionResult<List<ProductDto>>> GetProductByCategoriesIDAsync()
        {
            try
            {
                var user = await _UserService.Getalluserbyrole();

                if (user == null || !user.Any())
                {
                    return NotFound($"No user found for role ID = 1 ");
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving user for role ID 1");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPut("UpdateUser/{UserId}")]
        public async Task<IActionResult> UpdateUserAsync(int UserId, [FromBody] Updateuser updateRequest)
        {
            try
            {
                updateRequest.UserID = UserId;
                var updatedUser = await _UserService.UpdateUserAsync(updateRequest);
                return Ok(new { message = "User updated successfully", user = updatedUser });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to update user with ID: {UserId}", UserId);
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
