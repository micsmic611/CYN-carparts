namespace backend.DTOs
{
    public class AddCartDto
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
    public class CartItemDto
    {
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } // ชื่อสินค้า
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
