using backend.src.Entity;

namespace backend.src.Infrastructure.Interface
{
    public interface ILocationRepo
    {
        Task AddLocation(LocationDbo location);
        Task UpdateLocationByUserId(int userId, string newAddress, int location_id);
        Task<LocationDbo> GetLocationByUserId(int userId, int location_id);
    }
}
