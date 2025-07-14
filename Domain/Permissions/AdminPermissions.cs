using System.Collections.Immutable;
using System.Reflection;

namespace Domain.Permissions
{
    public static class AdminPermissions
    {
        public static IReadOnlyList<string> Permissions { get; }

        static AdminPermissions()
        {
            Permissions = ImmutableList<string>.Empty
                .AddRange(GetPermissionsFromType(ApplicationPermissions.RolesPermissions.GetType()))
                .AddRange(GetPermissionsFromType(ApplicationPermissions.UsersPermissions.GetType()))
                .AddRange(GetPermissionsFromType(ApplicationPermissions.PermissionsPermissions.GetType()));
        }

        // Helper method to get permission values from a given type
        private static IEnumerable<string> GetPermissionsFromType(Type type)
        {
            var result = type.GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)
                       .Where(f => f.FieldType == typeof(string))  // Filter for permission constants
                       .Select(f => f.GetValue(null) as string)    // Safely cast to string (nullable string)
                       .Where(value => value != null);             // Exclude null values

            return result!;
        }

    }
}
