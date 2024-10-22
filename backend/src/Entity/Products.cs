using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace backend.src.Entity
{
    [Table("Products")]
    public class Products
    {
        [Key]
        [Required]
        [Column("product_id", TypeName = "int")]
        public int productid { get; set; }

        [Column("seller_id", TypeName = "int")]
        public int seller_id { get; set; }

        [Column("product_name ", TypeName = "varchar(255)")]
        public string? productname { get; set; }
        [Column("description ", TypeName = "varchar(255)")]
        public string? description { get; set; }

        [Column("price ", TypeName = "DECIMAL(10,2)")]
        public Decimal? price { get; set; }

        [Column("stock ", TypeName = "int")]
        public int? stock { get; set; }

        [Column("category_id ", TypeName = "int")]
        public int? categoryid { get; set; }
 
        [Column("created_at", TypeName = "DATETIME")]
        public DateTime? created_at { get; set; }
    }
}
