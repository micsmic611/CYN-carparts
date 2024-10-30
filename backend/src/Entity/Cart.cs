using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace backend.src.Entity
{
    [Table("cart")]
    public class CartDbo
    {
        [Key]
        [Required]
        [Column("cart_id", TypeName = "int")]
        public int Cart_id { get; set; }

        [Column("user_id", TypeName = "int")]
        public int? User_id { get; set; }

        [Column("product_id", TypeName = "int")]
        public int? Product_id { get; set; }

        [Column("quantity", TypeName = "int")]
        public int Quantity { get; set; }

        [Column("total_price", TypeName = "DECIMAL(10,2)")]
        public decimal Total_price { get; set; }


    }
}
