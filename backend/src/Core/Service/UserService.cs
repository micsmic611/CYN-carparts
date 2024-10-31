using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using backend.src.Core.Interface;
using backend.src.Core.Service;
using backend.src.Entities;
using backend.src.Infrastructure.Interface;
using backendAPI;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using permissionAPI.src.Infrastructure.Repositories;
using backend.DTOs;

namespace backend.Helpers
{
    public class UserService : IUserService
    {
        private readonly DataContext _dataContext;
        private readonly IUserRepository _userRepository;
        private readonly ILogger<UserService> _logger;
        private readonly byte[] secureKey;

        public UserService(DataContext dataContext, IUserRepository userRepository, ILogger<UserService> logger)
        {
            _dataContext = dataContext ?? throw new ArgumentNullException(nameof(dataContext));
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));

            secureKey = new byte[32]; // 32 bytes = 256 bits
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(secureKey);
            }
        }

        public string Generate(int userID, int roleID)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(secureKey);
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
        new Claim("userId", userID.ToString()),
        new Claim("roleId", roleID.ToString())
    };

            var token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1), // ตั้งค่าหมดอายุ
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public JwtSecurityToken Verify(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            tokenHandler.ValidateToken(jwt, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(secureKey),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken validatedToken);

            return (JwtSecurityToken)validatedToken;
        }

        public async Task<UserDbo> GetUserByUserID(int userID)
        {
            var user = await _dataContext.User // ตรวจสอบว่าชื่อ DbSet ถูกต้อง
                .Where(u => u.UserID == userID)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                throw new Exception($"User with ID {userID} not found."); // การจัดการกับผู้ใช้ที่ไม่พบ
            }

            return user;
        }
        public async Task<List<UserDbo>> Getalluserbyrole()
        {
            try
            {
                var userdata = await _userRepository.GetByroleId();
                if (userdata == null || !userdata.Any())  // ตรวจสอบว่าค่าที่ได้ไม่เป็น null หรือไม่มีข้อมูล
                {
                    throw new KeyNotFoundException("ไม่พบผู้ใช้ที่มี Role ตามที่กำหนด");
                }
                return userdata;
            }
            catch (Exception ex)
            {
                throw new ApplicationException($"เกิดข้อผิดพลาดขณะดึงข้อมูลผู้ใช้: {ex.Message}", ex);
            }
        }
        public async Task<Updateuser> UpdateUserAsync(Updateuser Updateuser)
        {
            try
            {
                _logger.LogInformation("Received request to update User with ID: {UserID} ", Updateuser.UserID);

                var User = new UserDbo
                {
                    UserID = Updateuser.UserID,
                    Firstname = Updateuser.Firstname,
                    Lastname = Updateuser.Lastname,
                    email = Updateuser.Email,
                    Username = Updateuser.Username,
                    phone = Updateuser.Phone,
                };


                var updatedUser = await _userRepository.UpdateUserAsync(User);

                _logger.LogInformation("Successfully updated User with ID: {UserID}", Updateuser.UserID);

                return new Updateuser
                {
                    UserID = Updateuser.UserID,
                    Firstname = Updateuser.Firstname,
                    Lastname = Updateuser.Lastname,
                    Email = Updateuser.Email,
                    Username = Updateuser.Username,
                    Phone = Updateuser.Phone,
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating User with ID: {UserID}. Inner exception: {InnerException}", Updateuser.UserID, ex.InnerException?.Message);
                throw new Exception("Error occurred while updating User", ex);
            }
        }
    }
}