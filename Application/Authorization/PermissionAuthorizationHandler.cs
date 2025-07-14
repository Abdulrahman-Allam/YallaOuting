using Domain.Constants;
using Microsoft.AspNetCore.Authorization;

namespace Application.Authorization
{
    public class PermissionAuthorizationHandler : AuthorizationHandler<PermissionRequirement>
    {
        protected override Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            PermissionRequirement requirement)
        {
            // Ensure the user is authenticated
            if (context.User?.Identity?.IsAuthenticated != true)
                return Task.CompletedTask;
            
            // Check if the user has the required permission
            var hasPermission = context.User.Claims.Any(
                claim => claim.Type == AppConstants.Permission && claim.Value == requirement.Permission);

            if (hasPermission)
            {
                // Succeed if the required permission exists
                context.Succeed(requirement);
            }

            // Always complete the task
            return Task.CompletedTask;
        }
    }
}
