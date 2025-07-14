namespace Application.Dtos.Authentication.Request
{
    public class LoginRequest
    {
        public string EmailOrUsernameOrPhone { get; set; }
        public string Password { get; set; }
    }
}