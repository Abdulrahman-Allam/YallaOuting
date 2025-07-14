using Domain.Constants;
using Domain.Entities.User;
using Domain.Enums;
using Domain.Permissions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Infrastructure.Data.Seeds
{
    public static class RoleSeeds
    {
        public static async Task SeedAsync(RoleManager<ApplicationRole> roleManager)
        {
            var roles = new Dictionary<string, IReadOnlyList<string>>()
            {
                { UserRolesEnum.Admin.ToString(), AdminPermissions.Permissions },
                { UserRolesEnum.Doctor.ToString(), DoctorPermissions.Permissions },
                { UserRolesEnum.Patient.ToString(), PatientPermissions.Permissions },
                { UserRolesEnum.Secretary.ToString(), SecretaryPermissions.Permissions }
            };

            foreach (var role in roles)
            {
                if (!await RoleExistsAsync(roleManager, role.Key))
                {
                    await CreateRoleAsync(roleManager, role.Key);
                    await AddClaimsForRole(roleManager, role.Key, role.Value);
                }
            }
        }

        private static async Task<bool> RoleExistsAsync(RoleManager<ApplicationRole> roleManager, string roleName)
        {
            return await roleManager.Roles.AnyAsync(r => r.Name == roleName);
        }

        private static async Task CreateRoleAsync(RoleManager<ApplicationRole> roleManager, string roleName)
        {
            var role = new ApplicationRole { Name = roleName };
            var result = await roleManager.CreateAsync(role);
            if (!result.Succeeded)
            {
                throw new InvalidOperationException($"Failed to create role: {roleName}");
            }
        }

        private static async Task AddClaimsForRole(RoleManager<ApplicationRole> roleManager,
                                                   string roleName,
                                                   IReadOnlyList<string> permissions)
        {
            var role = await roleManager.FindByNameAsync(roleName);
            var existingClaims = await roleManager.GetClaimsAsync(role);

            foreach (var permission in permissions)
            {
                if (!existingClaims.Any(c => c.Type == AppConstants.Permission && c.Value == permission))
                {
                    var claim = new Claim(AppConstants.Permission, permission);
                    var result = await roleManager.AddClaimAsync(role, claim);
                    if (!result.Succeeded)
                    {
                        throw new InvalidOperationException($"Failed to add claim '{permission}' to role '{roleName}'");
                    }
                }
            }
        }
    }
}
