using Domain.Entities.Lookups;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

public class DistrictConfiguration : IEntityTypeConfiguration<District>
{
    public void Configure(EntityTypeBuilder<District> builder)
    {
        builder.HasBaseType<Lookup>();


        builder.HasOne(d => d.Governorate)
            .WithMany(g => g.Districts)
            .HasForeignKey(d => d.GovernorateID)
            .OnDelete(DeleteBehavior.SetNull); // Or Cascade if required
    }
}
