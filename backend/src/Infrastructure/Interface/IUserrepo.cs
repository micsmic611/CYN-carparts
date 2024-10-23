using backend.src.Entities;
using backend.src.Entities;

namespace backend.src.Infrastructure.Interface
{
    public interface IUserRepository
    {

        Task<UserDbo> Create(UserDbo user);
        Task<UserDbo> Update(UserDbo user);
        Task<UserDbo> AddUserAsync(UserDbo User);
        Task<UserDbo> GetByusername(string username);
        Task<UserDbo> GetById(int UserID);
        Task<UserDbo> UpdateUserAsync(UserDbo user);



    }
}