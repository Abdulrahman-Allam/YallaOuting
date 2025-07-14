using Domain.Entities.Lookups;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities.User
{
    public class ApplicationUser : IdentityUser<int>
    {
        public int Id { get; set; }
        public string? FirstName { get; set; } = string.Empty;
        public string? LastName { get; set; } = string.Empty;
        public DateOnly? DateOfBirth { get; set; }
        public string? ProfilePicture { get; set; } = string.Empty;
        public DateTime LastLogin { get; set; } = DateTime.UtcNow;

        public int? GenderId { get; set; }
        public virtual Gender Gender { get; set; }

        public int? CountryId { get; set; }
        public virtual Country Country { get; set; }

        public int? GovernorateId { get; set; }
        public virtual Governorate Governorate { get; set; }

        public int? DistrictId { get; set; }
        public virtual District District { get; set; }

        public int AccountStatusId { get; set; }
        public virtual AccountStatus AccountStatus { get; set; }

        public int ApplicationRoleId { get; set; }
        public virtual ApplicationRole ApplicationRole { get; set; }
    }
}
