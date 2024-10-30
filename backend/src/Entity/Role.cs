using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.src.Entity
{
    [Table("Role")]
    public class RoleDbo
    {
        [Key]
        [Required]
        [Column("role_id", TypeName = "int")]
        public int Role_id { get; set; }

        [Column("rolename", TypeName = "varchar(50)")]
        public string? Rolename { get; set; }
    }
}
