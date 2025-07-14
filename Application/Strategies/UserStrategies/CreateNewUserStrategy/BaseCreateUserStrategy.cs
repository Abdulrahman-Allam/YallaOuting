using AutoMapper;
using Domain.Constants;
using Domain.Entities.User;
using Domain.Enums;
using Domain.Interfaces.CommonInterfaces.OperationResultFactoryInterfaces;
using Domain.Interfaces.UtilityInterfaces.FileHandlerInterfaces;
using Domain.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Application.Strategies.UserStrategies.CreateNewUserStrategy
{
    public abstract class BaseCreateUserStrategy
    {
        protected readonly IOperationResultFactory _operationResultFactory;
        protected readonly IFileHandler _fileHandler;
        protected readonly UserManager<ApplicationUser> _userManager;
        protected readonly IMapper _mapper;

        protected BaseCreateUserStrategy(IOperationResultFactory operationResultFactory, IFileHandler fileHandler, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _operationResultFactory = operationResultFactory;
            _fileHandler = fileHandler;
            _userManager = userManager;
            _mapper = mapper;
        }

        protected async Task<string?> SaveUserPicture(IFormFile img)
        {
            if (img != null && img.Length > 0)
            {
                // Define the path where the image will be stored
                var folderPath = AppConstants.USERS_PROFILE_PICTURES_FOLDER_PATH;
                return await _fileHandler.UploadAsync(img, folderPath);
            }
            else
            {
                return null;
            }
        }

        protected void DeleteUserPicture(string? imgPath)
        {
            if (imgPath != null && imgPath.Length > 0)
            {
                _fileHandler.Delete(imgPath);
            }
        }


        protected void SetUserBasicProfile(ApplicationUser user ,UserRolesEnum userRole)
        {
            user.AccountStatusId = (int)AccountStatusEnum.Active;
            user.LastLogin = DateTime.Now;
            user.ApplicationRoleId = (int)userRole;
        }

        protected async Task<OperationResultSingle<string>> GetOperationResult(int CreatedId, IdentityResult? result, string message = "")
        {

            if (result != null && result.Succeeded)
            {
                return _operationResultFactory.Created(CreatedId.ToString());
            }
            else if (result == null)
            {
                return _operationResultFactory.BadRequest<string>(message);
            }
            else
            {
                return _operationResultFactory.BadRequest<string>(result.Errors.Select(e => e.Description).ToList());
            }
        }


    }
}
