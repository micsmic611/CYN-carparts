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

namespace backend.Helpers
{
    public class UserService : IUserService
    {
        private readonly byte[] secureKey;
        private readonly DataContext _dataContext;

        public UserService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }


        public UserService()
        {
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
            return await _dataContext.User
                .Where(u => u.UserID == userID)
                .Select(u => new UserDbo
                {
                    UserID = u.UserID,
                    Username = u.Username,
                    Firstname = u.Firstname,
                    email = u.email,
                    
                })
                .FirstOrDefaultAsync();
        }

    }
}