using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
namespace backend.src.Entity
{
    [Table("Categories")]
    public class CategorieDbo
    {
        [Key]
        [Required]
        [Column("category_id", TypeName = "int")]
        public int CategoryId { get; set; }
        [Column("category_name ", TypeName = "varchar(100)")]
        public string? Categoryname { get; set; }
        

    }
}
