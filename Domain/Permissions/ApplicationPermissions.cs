using Domain.Permissions.PermissionsCategories;

namespace Domain.Permissions
{
    public static class ApplicationPermissions
    {
        public static readonly RolesPermissions RolesPermissions = new RolesPermissions();
        public static readonly UsersPermissions UsersPermissions = new UsersPermissions();
        public static readonly PermissionsPermissions PermissionsPermissions = new PermissionsPermissions();
    }
}
