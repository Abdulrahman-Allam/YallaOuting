namespace Domain.Permissions.PermissionsCategories
{
    public sealed record UsersPermissions
    {
        public const string USER_VIEW = "Permissions.User.View";
        public const string USER_GET = "Permissions.User.Get";
        public const string USER_CREATE = "Permissions.User.Create";
        public const string USER_EDIT = "Permissions.User.Edit";
        public const string USER_DELETE = "Permissions.User.Delete";
    }
}
