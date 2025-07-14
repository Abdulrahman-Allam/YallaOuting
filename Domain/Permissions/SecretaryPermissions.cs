using System.Collections.Immutable;

namespace Domain.Permissions
{
   public static class SecretaryPermissions
    {
        public static IReadOnlyList<string> Permissions { get; }

        static SecretaryPermissions()
        {
            Permissions = ImmutableList.Create(
                ApplicationPermissions.PermissionsPermissions.PERMISSION_VIEW,
                ApplicationPermissions.PermissionsPermissions.PERMISSION_GET,
                ApplicationPermissions.RolesPermissions.ROLE_DELETE,
                ApplicationPermissions.RolesPermissions.ROLE_EDIT
            );
        }
    }
}
