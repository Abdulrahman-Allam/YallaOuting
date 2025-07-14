using Microsoft.AspNetCore.Identity;

namespace Domain.Entities.User
{
    public class ApplicationRole : IdentityRole<int>
    {
            public string CreatedBy { get; set; }
            public string? UpdatedBy { get; set; }
            public string? DeletedBy { get; set; }
            public DateTime CreatedDate { get; set; }
            public DateTime? UpdateDate { get; set; }
            public DateTime? DeletedDate { get; set; }
            public bool IsActive { get; set; }
            public bool IsDeleted { get; set; }
            public bool IsSystem { get; set; }
    }
}
