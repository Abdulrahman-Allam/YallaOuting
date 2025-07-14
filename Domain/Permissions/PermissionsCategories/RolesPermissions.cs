namespace Domain.Permissions.PermissionsCategories
{
    public sealed record RolesPermissions
    {
        public readonly string ROLE_VIEW = "Permissions.Role.View";
        public readonly string ROLE_GET = "Permissions.Role.Get";
        public readonly string ROLE_CREATE = "Permissions.Role.Create";
        public readonly string ROLE_EDIT = "Permissions.Role.Edit";
        public readonly string ROLE_DELETE = "Permissions.Role.Delete";
    }
}
