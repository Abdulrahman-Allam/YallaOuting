using Microsoft.AspNetCore.Authorization;

namespace Application.Authorization
{
    public sealed class PermissionRequirement : IAuthorizationRequirement
    {
        public string Permission { get; }
        public PermissionRequirement(string permission)
        {
            Permission = string.IsNullOrWhiteSpace(permission)
                ? throw new ArgumentNullException(nameof(permission), "Permission cannot be null or empty.")
                : permission;
        }
    }
}
