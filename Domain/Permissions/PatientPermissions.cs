using System.Collections.Immutable;

namespace Domain.Permissions
{
    public static class PatientPermissions
    {
        public static IReadOnlyList<string> Permissions { get; }

        static PatientPermissions()
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
