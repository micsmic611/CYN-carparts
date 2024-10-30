namespace backend.src.Core.Interface
{
    public interface ILocationService
    {
        Task AddLocation(int userId, string address);
        Task UpdateLocationByUserId(int userId, string newAddress, int location_id);
    }
}
