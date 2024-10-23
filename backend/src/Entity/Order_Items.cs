using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace backend.src.Entity
{
    [Table("Order_Items")]
    public class Order_Items
    {
        [Key]
        [Required]
        [Column("order_item_id", TypeName = "int")]
        public int order_item_id { get; set; }

        [Column("order_id", TypeName = "int")]
        public int? order_id { get; set; }

        [Column("product_id", TypeName = "int")]
        public int? product_id { get; set; }
        [Column("quantity", TypeName = "int")]
        public int? quantity { get; set; }
        [Column("price", TypeName = "DECIMAL(10,2)")]
        public decimal? quapricentity { get; set; }
        
    }
}
