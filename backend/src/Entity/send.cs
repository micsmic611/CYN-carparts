using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.src.Entity
{
    [Table("Send")]
    public class SendDbo
    {
        [Key]
        [Required]
        [Column("send_id", TypeName = "int")]
        public int Send_id { get; set; }

        [Column("buy_id", TypeName = "int")]
        public int? Buy_id { get; set; }

        [Column("send_status", TypeName = "varchar(50)")]
        public string? Send_status { get; set; }

        [Column("TrackNum", TypeName = "varchar(100)")]
        public string? TrackNum { get; set; }

        [Column("user_id", TypeName = "int")]
        public int? User_id { get; set; }

    }
}
