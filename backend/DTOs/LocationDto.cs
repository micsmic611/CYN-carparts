namespace backend.DTOs
{
    public class LocationRequest
    {
        public int UserId { get; set; }
        public string Address { get; set; }
    }
    public class UpdateLocationRequest
    {
        public string NewAddress { get; set; }
    }
}
