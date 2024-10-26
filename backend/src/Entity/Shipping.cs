using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace backend.src.Entity
{
    [Table("Products")]
    public class Shipping
    {
        [Key]
        [Required]
        [Column("shipping_id", TypeName = "int")]
        public int shippingid { get; set; }
        [Column("order_id", TypeName = "int")]
        public int? order_id { get; set; }
        [Column("address", TypeName = "VARCHAR(255)")]
        public string? address { get; set; }
        [Column("shipping_status", TypeName = "VARCHAR(50)")]
        public string? shippingstatus { get; set; }

        [Column("tracking_number", TypeName = "VARCHAR(100)")]
        public string? trackingnumber { get; set; }
        [Column("shipping_date", TypeName = "DATETIME")]
        public DateTime? shippingdate { get; set; }
    
    }
}
