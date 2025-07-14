using Microsoft.AspNetCore.Http;

namespace Application.Dtos.Authentication.Request
{
    public abstract class BaseCreateUserRequest
    {
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }

        public string? Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateOnly? DateOfBirth { get; set; }
        public IFormFile? ProfilePicture { get; set; }
        public int? GenderId { get; set; }
    }
}