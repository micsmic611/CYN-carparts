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
    public class PaymentHistoryDto
    {
        public int BuyId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public string PaymentStatus { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public string send_status { get; set; }
    }
    public class PaymentDto
    {
        public int BuyId { get; set; }
        public string Username { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; }
        public int ShippingId { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<string> ProductNames { get; set; } // เก็บชื่อผลิตภัณฑ์เป็นอาเรย์
    }
}
