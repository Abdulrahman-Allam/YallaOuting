using Application.Dtos.YallaOutingUser.Request;
using Application.Dtos.YallaOutingUser.Response;
using Domain.Results;

namespace Application.Contracts.YallaOutingUser
{
    public interface IYallaOutingUserService
    {
        Task<OperationResultSingle<UserAuthResponse>> RegisterAsync(RegisterUserRequest request);
        Task<OperationResultSingle<UserAuthResponse>> LoginAsync(LoginUserRequest request);
        Task<OperationResultSingle<string>> LogoutAsync(int userId);
    }
}