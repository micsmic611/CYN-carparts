using backend.DTOs;
using backend.src.Entities;
using backend.DTOs;
using System.IdentityModel.Tokens.Jwt;
namespace backend.src.Core.Interface
{
    public interface IUserService
    {
        
        string Generate(int userID, int roleID);
        JwtSecurityToken Verify(string jwt);
        Task<UserDbo> GetUserByUserID(int userID);
    }
}
