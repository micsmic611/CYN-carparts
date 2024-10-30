using backend.src.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class CartPaymentDbo
{
    [Key]
    [Column("Id", TypeName = "int")]
    public int Id { get; set; }

    [ForeignKey("PaymentDbo")]
    [Column("buy_id", TypeName = "int")] // Foreign key ไปยัง Payment
    public int BuyId { get; set; }

    [ForeignKey("CartDbo")]
    [Column("cart_id", TypeName = "int")]
    public int CartId { get; set; }

    [ForeignKey("ProductDbo")]
    [Column("ProductId", TypeName = "int")]
    public int ProductId { get; set; }

    // เพิ่มคุณสมบัตินี้
    [Column("PaymentBuy_id", TypeName = "int")] // ชื่อใหม่ของฟิลด์
    public int PaymentBuyId { get; set; } // Foreign key ไปยัง Payment

    public virtual PaymentDbo Payment { get; set; }
    public virtual ProductDbo Product { get; set; }
}
