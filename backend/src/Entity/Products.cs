using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace backend.src.Entity
{
    [Table("Products")]
    public class ProductDbo
    {
        [Key]
        [Required]
        [Column("product_id", TypeName = "int")]
        public int Productid { get; set; }

        [Column("seller_id", TypeName = "int")]
        public int Sellerid { get; set; }

        [Column("product_name ", TypeName = "varchar(255)")]
        public string? Productname { get; set; }

        [Column("description ", TypeName = "varchar(255)")]
        public string? ProductDescription { get; set; }

        [Column("price ", TypeName = "DECIMAL(10,2)")]
        public Decimal? Price { get; set; }

        [Column("stock ", TypeName = "int")]
        public int? Stock { get; set; }

        [Column("category_id ", TypeName = "int")]
        public int? Categoryid { get; set; }
 
        [Column("created_at", TypeName = "DATETIME")]
        public DateTime? Created_at { get; set; }

        [Column("product_img", TypeName = "varchar(250)")]
        public string? Product_img { get; set; }

    }
}
