using Domain.Entities.User;
using Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;
using System.Data;

namespace Infrastructure.Data.Seeds
{
    public static class UserSeeds
    {
        public static async Task SeedAsync(UserManager<ApplicationUser> userManager)
        {
            var users = ImmutableList<ApplicationUser>.Empty.Add(GetAdminUser());

            foreach (var user in users)
            {
                var newUser = await userManager.FindByEmailAsync(user.Email!);
                if (newUser is null)
                {
                    await userManager.CreateAsync(user, "7ogozati@2025");
                    await userManager.AddToRoleAsync(user, UserRolesEnum.Admin.ToString());
                }
            }
        }

        private static ApplicationUser GetAdminUser()
        {
            return new ApplicationUser()
            {
                Email = "mohamedaazizfcb@gmail.com",
                UserName = "MohamedAaziz",
                FirstName = "Mohamed",
                LastName = "Aaziz"
            };
        }

    }
}
