using Domain.Entities.Lookups;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

public class CountryConfiguration : IEntityTypeConfiguration<Country>
{
    public void Configure(EntityTypeBuilder<Country> builder)
    {
        builder.HasBaseType<Lookup>();

        builder.HasMany(c => c.Governorates)
            .WithOne(g => g.Country)
            .HasForeignKey(g => g.CountryID)
            .OnDelete(DeleteBehavior.Cascade);


    }
}
