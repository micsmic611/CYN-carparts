using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
namespace backend.src.Entity
{
    [Table("Categories")]
    public class Categories
    {
        [Key]
        [Required]
        [Column("category_id", TypeName = "int")]
        public int Categoryid { get; set; }
        [Column("category_name ", TypeName = "varchar(100)")]
        public string? categoryname { get; set; }
        
        [Column("description ", TypeName = "varchar(100)")]
        public string? description { get; set; }

    }
}
