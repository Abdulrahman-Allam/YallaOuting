using Application.Contracts.Authentication;
using Application.Dtos.Authentication;
using Application.Dtos.Authentication.Request;
using Application.Dtos.Authentication.Response;
using Application.Strategies.UserStrategies.CreateNewUserStrategy;
using AutoMapper;
using Domain.Entities.User;
using Domain.Enums;
using Domain.Interfaces.CommonInterfaces.OperationResultFactoryInterfaces;
using Domain.Interfaces.UnitOfWorkInterfaces;
using Domain.Interfaces.UtilityInterfaces.FileHandlerInterfaces;
using Domain.Results;
using Infrastructure.UnitOfWorkImplementation;
using Infrastructure.Utility.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Linq.Expressions;

namespace Application.Services.Authentication
{
    public class AuthentictionService : IAuthenticationService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IMapper _mapper;
        private readonly IOperationResultFactory _operationResultFactory;
        private readonly IFileHandler _fileHandler;

        private readonly CreateNewUserStrategyFactory _createNewUserStrategyFactory;
        private readonly IUnitOfWork _unitOfWork;

        public AuthentictionService(UserManager<ApplicationUser> userManager, IJwtTokenGenerator jwtTokenGenerator, IMapper mapper, 
            IOperationResultFactory operationResultFactory, IFileHandler fileHandler, IUnitOfWork unitOfWork,
            CreateNewUserStrategyFactory createNewUserStrategyFactory)
        {
            _userManager = userManager;
            _jwtTokenGenerator = jwtTokenGenerator;
            _mapper = mapper;
            _operationResultFactory = operationResultFactory;
            _fileHandler = fileHandler;
            _createNewUserStrategyFactory = createNewUserStrategyFactory;
            _unitOfWork = unitOfWork;
        }

        public async Task<OperationResultSingle<string>> CreateUserAsync(BaseCreateUserRequest request, UserRolesEnum userRole)
        {
            var strategy = _createNewUserStrategyFactory.GetStrategy(userRole);
            return await strategy.CreateNewUser(request);
        }

        //public async Task<OperationResultSingle<string>> CreatePartialPatient(CreatePartialPatientRequest request)
        //{
        //    var strategy = _createNewUserStrategyFactory.GetStrategy(UserRolesEnum.);
        //    return await strategy.CreateNewUser(request);
        //}

        public async Task<OperationResultSingle<AuthenticationResponse>> LoginAsync(LoginRequest request)
        {
            var authResult = new AuthenticationResponse();
            var user = await _userManager.Users
                             .Include(u => u.Gender)
                             .Include(u => u.Country)
                             .Include(u => u.Governorate)
                             .Include(u => u.District)
                             .Include(u => u.AccountStatus)
                             .Include(u => u.ApplicationRole)
                             .FirstOrDefaultAsync(u => u.Email == request.EmailOrUsernameOrPhone
                                                       || u.UserName == request.EmailOrUsernameOrPhone 
                                                       || u.PhoneNumber == request.EmailOrUsernameOrPhone);

            if (user is null || !await _userManager.CheckPasswordAsync(user, request.Password))
                return _operationResultFactory.Unauthorized<AuthenticationResponse>();

            var token = _jwtTokenGenerator.GenerateToken(user.Id, user.Email);
            authResult = _mapper.Map<AuthenticationResponse>(user);
            authResult.Token = token;
            return _operationResultFactory.Success(authResult);
        }
    }
}
