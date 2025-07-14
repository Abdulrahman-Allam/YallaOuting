using Domain.Entities.Lookups;
using Domain.Entities.User;

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
