using Domain.Entities.Lookups;
using Domain.Entities.User;
using Domain.Entities;

using Infrastructure.Data.Configurations.LookupConf;

using Infrastructure.Data.Configurations.Users;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    sealed public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
    {
        public string _userId = string.Empty;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Add DbSets for the new entities
        public DbSet<YallaOutingUser> YallaOutingUsers { get; set; }
        public DbSet<Hangout> Hangouts { get; set; }
        public DbSet<HangoutParticipant> HangoutParticipants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

            modelBuilder.ApplyConfiguration(new ApplicationUserConfiguration());
         
            modelBuilder.ApplyConfiguration(new AccountStatusConfiguration());
            modelBuilder.ApplyConfiguration(new CountryConfiguration());
            modelBuilder.ApplyConfiguration(new DistrictConfiguration());
            modelBuilder.ApplyConfiguration(new GenderConfiguration());
            modelBuilder.ApplyConfiguration(new GovernorateConfiguration());
            modelBuilder.ApplyConfiguration(new LookupConfiguration());

            // Configure YallaOutingUser entity
            modelBuilder.Entity<YallaOutingUser>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Username).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(50);
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(50);
                entity.Property(e => e.PasswordHash).IsRequired();
                entity.Property(e => e.PhoneNumber).IsRequired().HasMaxLength(15);
                entity.Property(e => e.Role).IsRequired().HasMaxLength(20);
                
                entity.HasIndex(e => e.Username).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();
                entity.HasIndex(e => e.PhoneNumber).IsUnique();
            });

            // Configure Hangout entity
            modelBuilder.Entity<Hangout>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.Location).IsRequired().HasMaxLength(200);
                
                entity.HasOne(e => e.CreatedBy)
                      .WithMany(u => u.CreatedHangouts)
                      .HasForeignKey(e => e.CreatedByUserId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure HangoutParticipant entity
            modelBuilder.Entity<HangoutParticipant>(entity =>
            {
                entity.HasKey(e => e.Id);
                
                entity.HasOne(e => e.Hangout)
                      .WithMany(h => h.Participants)
                      .HasForeignKey(e => e.HangoutId)
                      .OnDelete(DeleteBehavior.Cascade);
                      
                entity.HasOne(e => e.User)
                      .WithMany(u => u.HangoutParticipations)
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
                      
                entity.HasIndex(e => new { e.HangoutId, e.UserId }).IsUnique();
            });

            base.OnModelCreating(modelBuilder);
        }


        public override int SaveChanges()
        {
            ApplyCommonActionsBeforeSave();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            ApplyCommonActionsBeforeSave();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void ApplyCommonActionsBeforeSave()
        {
            // Detect changes in entities
            ChangeTracker.DetectChanges();

            // Iterate over added entities and apply the added properties
            var addedEntities = ChangeTracker.Entries()
                                    .Where(t => t.State == EntityState.Added)
                                    .Select(t => t.Entity);

            foreach (var entity in addedEntities)
            {
                SetCreatedValues(entity);
            }

            // Iterate over modified entities and apply the updated properties
            var modifiedEntities = ChangeTracker.Entries()
                                    .Where(t => t.State == EntityState.Modified)
                                    .Select(t => t.Entity);

            foreach (var entity in modifiedEntities)
            {
                SetUpdatedValues(entity);
            }
        }

        private void SetCreatedValues(object entity)
        {
            SetEntityProperty(entity, "CreatedDate", DateTime.UtcNow);
            SetEntityProperty(entity, "CreatedBy", _userId);
            SetEntityProperty(entity, "IsActive", true);
            SetEntityProperty(entity, "IsDeleted", false);
            SetIsSystem(entity);
        }

        private void SetUpdatedValues(object entity)
        {
            SetEntityProperty(entity, "UpdateDate", DateTime.UtcNow);
            SetEntityProperty(entity, "UpdatedBy", _userId);

            // Handle deletion scenario
            if (IsEntityMarkedAsDeleted(entity))
            {
                SetDeletedValues(entity);
            }
        }

        private void SetDeletedValues(object entity)
        {
            SetEntityProperty(entity, "DeletedBy", _userId);
        }

        private void SetIsSystem(object entity)
        {
            bool isSystem = _userId == "System";
            SetEntityProperty(entity, "IsSystem", isSystem);
        }

        private bool IsEntityMarkedAsDeleted(object entity)
        {
            var isDeleted = GetEntityProperty(entity, "IsDeleted");
            return isDeleted is bool deleted && deleted;
        }

        private void SetEntityProperty(object entity, string propertyName, object value)
        {
            var property = entity.GetType().GetProperty(propertyName);
            if (property != null && property.CanWrite)
            {
                property.SetValue(entity, value);
            }
        }

        private object GetEntityProperty(object entity, string propertyName)
        {
            var property = entity.GetType().GetProperty(propertyName);
            return property?.GetValue(entity);
        }
    }
}
