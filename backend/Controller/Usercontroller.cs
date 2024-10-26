using System;
using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.src.Infrastructure.Interface;
using backend.src.Entities;
using BCrypt.Net;
using backend.Helpers;
using System.Net;
using backend.src.Core.Interface;

namespace backend.Controller
{
    [Route("api")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly IUserService _UserService;

        public UserController(IUserRepository repository, IUserService UserService)
        {
            _repository = repository;
            _UserService = UserService;
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
    }
}
