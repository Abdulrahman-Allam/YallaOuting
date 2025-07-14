using Application.Dtos.Authentication.Request;
using Domain.Results;

namespace Application.Strategies.UserStrategies.CreateNewUserStrategy
{
    public interface ICreateNewUserStrategy
    {
        public Task<OperationResultSingle<string>> CreateNewUser(BaseCreateUserRequest request);
    }
}
