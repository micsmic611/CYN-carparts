using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.src.Entity
{
    [Table("CartPayment")]
    public class CartPaymentDbo
    {
        [Key]
        public int Id { get; set; } // Primary key สำหรับ CartPayment

        [ForeignKey("PaymentDbo")]
        public int BuyId { get; set; } // Foreign key ไปยัง Payment

        [Column("cart_id", TypeName = "int")]
        public int CartId { get; set; } // เก็บ cart_id

        public virtual PaymentDbo Payment { get; set; } // Navigation property
    }
}
