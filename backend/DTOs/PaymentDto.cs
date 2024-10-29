namespace backend.DTOs
{
    public class AddPaymentRequest
    {
        public int UserId { get; set; }
        public int[] CartIds { get; set; }
        public int LocationId { get; set; }
        public int ShippingId { get; set; }
    }
    public class UpdatePaymentRequest
    {
        public int BuyId { get; set; }
        public int UserId { get; set; }
    }
}
