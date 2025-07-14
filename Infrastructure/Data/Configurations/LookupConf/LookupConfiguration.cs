using Domain.Entities.Lookups;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;

public class LookupConfiguration : IEntityTypeConfiguration<Lookup>
{
    public void Configure(EntityTypeBuilder<Lookup> builder)
    {
        builder.HasKey(l => l.Id);

        builder.Property(l => l.Name_Ar)
            .IsRequired()
            .HasMaxLength(30);

        builder.Property(l => l.Name_En)
            .IsRequired()
            .HasMaxLength(30);
    }
}
