
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.DTOs
{
    public class UserDto
    {
        public int UserID { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string? email { get; set; }
        public string? phone { get; set; }
        public string? address { get; set; }
        public int? RoleId { get; set; }
    }
    public class LoginDto
    {
        public string? Username { set; get; }
        public string? Password { set; get; }
    }
    public class RegisterDto
    {

        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string? email { get; set; }
        public string? phone { get; set; }
        public string? address { get; set; }
        public int? RoleId { get; set; }
    }
    public class Updateuser
    {
        public int UserID { get; set; }
        public string? Username { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }

    }
}
