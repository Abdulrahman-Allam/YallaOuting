using Domain.Entities.Lookups;
using Domain.Entities.User;

namespace Application.Dtos.Authentication.Response
{
    public class AuthenticationResponse
    {
        public string Token { get; set; }
        public int Id { get; set; }
        public string Username{ get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string ProfilePicture { get; set; }
        public DateTime LastLogin { get; set; }
        public string? Gender_En { get; set; }
        public string? Gender_Ar { get; set; }

        public string? Country_En { get; set; }
        public string? Country_Ar { get; set; }


        public string? Governorate_En { get; set; }
        public string? Governorate_Ar { get; set; }

        public string? District_En { get; set; }
        public string? District_Ar { get; set; }

        public string? AccountStatus_En { get; set; }
        public string? AccountStatus_ar { get; set; }

        public string? ApplicationRole_En { get; set; }
        public string? ApplicationRole_Ar { get; set; }
        public int? doctorId { get; set; }
        public int? SpecializationId { get; set; }
        public int? ApplicationRole_ID { get; set; }
    }
}
