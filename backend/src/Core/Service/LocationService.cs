using backend.src.Core.Interface;
using backend.src.Infrastructure.Interface;

namespace backend.src.Core.Service
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepo _locationRepo;

        public LocationService(ILocationRepo locationRepo)
        {
            _locationRepo = locationRepo;
        }

        public async Task AddLocation(int userId, string address)
        {
            var location = new Entity.LocationDbo
            {
                User_id = userId,
                Address = address
            };

            await _locationRepo.AddLocation(location);
        }
        public async Task UpdateLocationByUserId(int userId, string newAddress, int location_id)
        {
            await _locationRepo.UpdateLocationByUserId(userId, newAddress, location_id);
        }
    }
}
