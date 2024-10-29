using backend.src.Entity;
using backend.src.Infrastructure.Interface;
using backendAPI;
using Microsoft.EntityFrameworkCore;

namespace backend.src.Infrastructure.Repository
{
    public class LocationRepo : ILocationRepo
    {
        private readonly DataContext _context;

        public LocationRepo(DataContext context)
        {
            _context = context;
        }

        public async Task AddLocation(LocationDbo location)
        {
            _context.Location.Add(location);
            await _context.SaveChangesAsync();
        }
        public async Task<LocationDbo> GetLocationByUserId(int userId,int location_id)
        {
            return await _context.Location.FirstOrDefaultAsync(loc => loc.User_id == userId&&loc.Location_id== location_id);
        }

        public async Task UpdateLocationByUserId(int userId, string newAddress, int location_id)
        {
            var location = await GetLocationByUserId(userId, location_id);

            if (location != null)
            {
                location.Address = newAddress;
                await _context.SaveChangesAsync();
            }
        }
    }
}
