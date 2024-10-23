using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace backend.src.Entity
{
    [Table("Orders")]
    public class Orders
    {
        
        [Key]
        [Required]
        [Column("order_id", TypeName = "int")]
        public int order_id { get; set; }
        
        [Column("user_id", TypeName = "int")]
        public int? user_id { get; set; }

        
        [Column("total_amount", TypeName = "DECIMAL(10,2)")]
        public Decimal? totalamount { get; set; }

        [Column("order_status", TypeName = "VARCHAR(50)")]
        public String? total_amount { get; set; }
        
        [Column("created_at", TypeName = "DATETIME")]
        public DateTime? createdat { get; set; }    

    }
}
