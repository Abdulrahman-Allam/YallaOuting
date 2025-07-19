using System.ComponentModel.DataAnnotations;

namespace Application.Dtos.YallaOutingUser.Request
{
    public class LoginUserRequest
    {
        [Required]
        public string UsernameOrEmail { get; set; } = string.Empty;
        
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}