using Domain.Entities.Lookups;
using Domain.Enums;
using Domain.Interfaces.UnitOfWorkInterfaces;

namespace Infrastructure.Data.Seeds
{
    public static class LookupSeeds
    {
        public static async Task SeedAsync(IUnitOfWork unitOfWork)
        {
            await SeedLookup<AccountStatus, AccountStatusEnum>(unitOfWork);
            await SeedLookup<Gender, GendersEnum>(unitOfWork);

        }


        private static async Task SeedLookup<T, E>(IUnitOfWork unitOfWork)
            where T : Lookup, new() // Ensure T is a Lookup and has a parameterless constructor
            where E : Enum
        {
            // Get enum values
            var enumValues = Enum.GetValues(typeof(E)).Cast<E>();

            var repository = unitOfWork.GetRepository<T>();

            foreach (var val in enumValues)
            {
                var id = (int)(object)val; // Cast to int for ID

                // Check if the value exists
                var exists = repository.Exists(g => g.Id == id);
                if (!exists)
                {
                    // Add the lookup entry
                    var lookupEntry = new T
                    {
                        Id = id,
                        Name_En = val.ToString(),
                        Name_Ar = val.ToString()
                    };

                    await repository.AddAsync(lookupEntry);
                }
            }

            // Save changes
            await unitOfWork.SaveAsync();
        }



    }
}
