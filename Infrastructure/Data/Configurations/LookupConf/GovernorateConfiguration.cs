using Domain.Entities.Lookups;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

public class GovernorateConfiguration : IEntityTypeConfiguration<Governorate>
{
    public void Configure(EntityTypeBuilder<Governorate> builder)
    {
        builder.HasBaseType<Lookup>();

        builder.HasMany(g => g.Districts)
            .WithOne(d => d.Governorate)
            .HasForeignKey(d => d.GovernorateID)
            .OnDelete(DeleteBehavior.Cascade); // Or Cascade if required

        builder.HasOne(g => g.Country)
            .WithMany(c => c.Governorates)
            .HasForeignKey(g => g.CountryID)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
