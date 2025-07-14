using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Domain.Entities.User;

namespace Infrastructure.Data.Configurations.Users
{
    public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            builder.HasKey(u => u.Id);

            builder.Property(u => u.UserName).IsRequired().HasMaxLength(50);
            builder.Property(u => u.Email).IsRequired().HasMaxLength(100);
            builder.Property(u => u.PhoneNumber).IsRequired().HasMaxLength(15);
            builder.Property(u => u.FirstName).IsRequired().HasMaxLength(50);
            builder.Property(u => u.LastName).IsRequired().HasMaxLength(50);

            builder.HasOne(u => u.Country)
                   .WithMany()
                   .HasForeignKey(u => u.CountryId);

            builder.HasOne(u => u.Governorate)
                   .WithMany()
                   .HasForeignKey(u => u.GovernorateId);

            builder.HasOne(u => u.District)
                   .WithMany()
                   .HasForeignKey(u => u.DistrictId);

            builder.HasOne(u => u.Gender)
                  .WithMany()
                  .HasForeignKey(u => u.GenderId);

            builder.HasOne(u => u.AccountStatus)
                  .WithMany()
                  .HasForeignKey(u => u.AccountStatusId);

            builder.HasOne(u => u.ApplicationRole)
                  .WithMany()
                  .HasForeignKey(u => u.ApplicationRoleId);
        }
    }
}
