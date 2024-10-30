using Microsoft.EntityFrameworkCore;
using backend.src.Entities;
using backend.src.Infrastructure.Interface;
using backendAPI;
using backend.Controller;
using Microsoft.Extensions.Logging;
using backend.src.Entities;
using backendAPI;
//using permissionAPI.DTOs;
//repo = select add delete update && same name function Interface repo next step goto service for business layer 
namespace permissionAPI.src.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dbContext;
        private readonly ILogger<UserDbo> _logger;

        public UserRepository(DataContext dbContext, ILogger<UserDbo> logger)
        {
            _dbContext = dbContext;
            _logger = logger;

        }
        public async Task<UserDbo> AddUserAsync(UserDbo User)
        {
            try
            {
                _dbContext.User.Add(User);
                await _dbContext.SaveChangesAsync();
                return User;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //new
        public async Task<UserDbo> Create(UserDbo user)
        {
            _dbContext.User.Add(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }

        public async Task<UserDbo> Update(UserDbo user)
        {
            var existingUser = await _dbContext.User.FirstOrDefaultAsync(u => u.UserID == user.UserID);
            if (existingUser == null)
            {
                throw new Exception("User not found.");
            }

            existingUser.Username = user.Username;
            existingUser.email = user.email;
            existingUser.Password = user.Password; // ????????????????????????????

            await _dbContext.SaveChangesAsync();
            return existingUser;
        }
        public async Task<UserDbo> GetByusername(string username)
        {
            return await _dbContext.User.FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<UserDbo> GetById(int UserID)
        {
            return await _dbContext.User.FirstOrDefaultAsync(u => u.UserID == UserID);
        }

        public async Task<UserDbo> UpdateUserAsync(UserDbo user)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                // Log before finding the user
                _logger.LogInformation("Attempting to update User with ID: {UserId}", user.UserID);

                var existingUser = await _dbContext.User.FindAsync(user.UserID);
                if (existingUser == null)
                {
                    _logger.LogError("User with ID {UserId} not found", user.UserID);
                    throw new Exception($"User with ID {user.UserID} not found");
                }

                _logger.LogInformation("Found User with ID: {UserId}. Updating user details excluding password.", user.UserID);
                existingUser.Username = user.Username;
                existingUser.Firstname = user.Firstname;
                existingUser.Lastname = user.Lastname;
                existingUser.email = user.email;
                existingUser.phone = user.phone;
                existingUser.address = user.address;
                _dbContext.User.Update(existingUser);


                await _dbContext.SaveChangesAsync();

                await transaction.CommitAsync();
                _logger.LogInformation("Successfully updated User with ID: {UserId}", user.UserID);

                return existingUser;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                _logger.LogError(ex, "Error occurred while updating User with ID: {UserId}. Inner exception: {InnerException}", user.UserID, ex.InnerException?.Message);
                throw new Exception($"Error occurred while updating User with ID {user.UserID}", ex);
            }
        }

        public async Task<UserDbo> GetUserByUserID(int UserID)
        {
            return await _dbContext.User.FirstOrDefaultAsync(u => u.UserID == UserID);
        }
        public async Task<List<UserDbo>> GetByroleId()
        {
            return await _dbContext.User
                .Where(u => u.RoleId == 1) // ???????????? RoleId ???????????
                .ToListAsync();
        }

        public async Task<string> GetUsernameById(int? userId)
        {
            if (userId == null) return null;

            var user = await _dbContext.User
                .Where(u => u.UserID == userId)
                .Select(u => u.Username)
                .FirstOrDefaultAsync();

            return user;
        }

        public async Task<UserDbo> UpdateUser1Async(UserDbo user)
        {
            var existingUser = await _dbContext.User.FindAsync(user.UserID);
            if (existingUser == null)
                throw new Exception($"User with ID {user.UserID} not found");

            existingUser.Username = user.Username;
            existingUser.Firstname = user.Firstname;
            existingUser.Lastname = user.Lastname;
            existingUser.email = user.email;
            existingUser.phone = user.phone;
            existingUser.address = user.address;

            await _dbContext.SaveChangesAsync();
            return existingUser;
        }
    }
}