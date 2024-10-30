using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;


namespace backend.src.Entity
{
    [Table("Payment")]
    public class PaymentDbo
    {
        [Key]
        [Required]
        [Column("buy_id", TypeName = "int")]
        public int Buy_id { get; set; }

        [Column("user_id", TypeName = "int")]
        public int? User_id { get; set; }

        //[Column("cart_id", TypeName = "int")]
        //public int? Cart_id { get; set; }

        [Column("total_price", TypeName = "DECIMAL(10,2)")]
        public decimal Total_price { get; set; }

        [Column("location_id", TypeName = "int")]
        public int? Location_id { get; set; }

        [Column("status", TypeName = "varchar(20)")]
        public string? Status { get; set; }

        [Column("shipping_id", TypeName = "int")]
        public int? shipping_id { get; set; }
        [Column("created_at", TypeName = "DATETIME")]
        public DateTime? Created_at { get; set; } = DateTime.Now;

        public virtual ICollection<CartPaymentDbo> CartPayments { get; set; }
    }
}
