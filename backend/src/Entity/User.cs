using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
//connect database && go to datacontext 
namespace backend.src.Entities
{
    [Table("Users")]
    public class UserDbo
    {
        [Key]
        [Required]
        [Column("user_id", TypeName = "int")]
        public int UserID { get; set; }

        [Column("username ", TypeName = "varchar(255)")]
        public string? Username { get; set; }

        [Column("password ", TypeName = "varchar(255)")]
        public string? Password { get; set; }

        [Column("Firstname", TypeName = "varchar(255)")]
        public string? Firstname { get; set; }

        [Column("Lastname", TypeName = "varchar(255)")]
        public string? Lastname { get; set; }

        [Column("email", TypeName = "varchar(255)")]
        public string? email { get; set; }

        [Column("phone_number", TypeName = "varchar(20)")]
        public string? phone { get; set; }

        [Column("Uaddress", TypeName = "varchar(255)")]
        public string? address { get; set; }

        [Column("role_id", TypeName = "int")]
        public int? RoleId { get; set; }
    }
}
