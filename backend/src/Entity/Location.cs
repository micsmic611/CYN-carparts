using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.src.Entity
{
    [Table("Location")]
    public class LocationDbo
    {
        [Key]
        [Required]
        [Column("location_id", TypeName = "int")]
        public int Location_id { get; set; }

        [Column("user_id ", TypeName = "int")]
        public int? User_id { get; set; }

        [Column("address ", TypeName = "text")]
        public string? Address { get; set; }
    }
}
}
