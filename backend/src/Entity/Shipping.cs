using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace backend.src.Entity
{
    [Table("Shipping")]
    public class ShippingDbo
    {
        [Key]
        [Required]
        [Column("shipping_id", TypeName = "int")]
        public int Shipping_id { get; set; }

        [Column("shipping_name", TypeName = "varchar(50)")]
        public string? Shipping_name { get; set; }

    
    }
}
