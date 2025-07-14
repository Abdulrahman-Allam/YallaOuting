using Application.Dtos.Authentication;
using Application.Dtos.Authentication.Request;
using Application.Dtos.Authentication.Response;
using Domain.Enums;
using Domain.Results;

namespace Application.Contracts.Authentication
{
    public interface IAuthenticationService
    {
        Task<OperationResultSingle<AuthenticationResponse>> LoginAsync(LoginRequest request);
        Task<OperationResultSingle<string>> CreateUserAsync(BaseCreateUserRequest request, UserRolesEnum userRole);


        //Task<Response<GetUserResponse>> RefreshTokenAsync(string token);
        //Task<Response<bool>> RevokeTokenAsync(string token);
        //Task<Response<bool>> SendConfirmationEmailAsync(string email);
        //Task<Response<bool>> ConfirmEmailAsync(ConfirmEmailRequest request);
        //Task<Response<string>> ForgetPassword(string email);
        //Task<Response<string>> ResetPassword(ResetPasswordRequest request);
    }
}
