using Domain.Entities.User;
using Domain.Interfaces.UnitOfWorkInterfaces;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data.Seeds
{
    public static class SeedsMaster
    {
        public static async Task SeedAsync(RoleManager<ApplicationRole> _roleManager,
                                           UserManager<ApplicationUser> _userManager,
                                           IUnitOfWork unitOfWork)
        {
            await RoleSeeds.SeedAsync(_roleManager);
            await LookupSeeds.SeedAsync(unitOfWork);
            await UserSeeds.SeedAsync(_userManager);
        }
    }
}
