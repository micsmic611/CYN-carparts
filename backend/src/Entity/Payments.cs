using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;


namespace backend.src.Entity
{
    public class Payments
    {
        [Key]
        [Required]
        [Column("payment_id", TypeName = "int")]
        public int payment_id { get; set; }
        [Column("order_id", TypeName = "int")]
        public int? order_id { get; set; }

        [Column("payment_method", TypeName = "VARCHAR(50)")]
        public string? payment_method { get; set; }

        [Column("amount", TypeName = "DECIMAL(10,2)")]
        public decimal? amount { get; set; }
        [Column("payment_status", TypeName = "VARCHAR(50)")]
        public string? paymentstatus { get; set; }

        [Column("payment_date", TypeName = "DATETIME")]
        public DateTime? paymentdate { get; set; }

    }
}
