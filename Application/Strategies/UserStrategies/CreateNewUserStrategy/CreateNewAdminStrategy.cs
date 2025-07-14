using Application.Dtos.Authentication.Request;
using AutoMapper;
using Domain.Entities.User;
using Domain.Enums;
using Domain.Interfaces.CommonInterfaces.OperationResultFactoryInterfaces;
using Domain.Interfaces.UtilityInterfaces.FileHandlerInterfaces;
using Domain.Results;
using Microsoft.AspNetCore.Identity;

namespace Application.Strategies.UserStrategies.CreateNewUserStrategy
{
    public class CreateNewAdminStrategy : BaseCreateUserStrategy, ICreateNewUserStrategy
    {
        public CreateNewAdminStrategy(IOperationResultFactory operationResultFactory, IFileHandler fileHandler, UserManager<ApplicationUser> userManager, IMapper mapper) 
            : base(operationResultFactory, fileHandler, userManager, mapper)
        {
        }

        public async Task<OperationResultSingle<string>> CreateNewUser(BaseCreateUserRequest req)
        {
            var request = req as CreateAdminRequest;

            var user = _mapper.Map<Admin>(request);
            user.ProfilePicture = await SaveUserPicture(request.ProfilePicture);

            SetUserBasicProfile(user, UserRolesEnum.Admin);

            try
            {
                var result = await _userManager.CreateAsync(user, request.Password);
                if (!result.Succeeded) {
                    DeleteUserPicture(user.ProfilePicture);
                }
                return await GetOperationResult(user.Id, result);
            }
            catch (Exception ex) {
                DeleteUserPicture(user.ProfilePicture);
                return await GetOperationResult(-1, null, ex.Message);
            }

        }
    }
}