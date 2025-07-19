using Application.Contracts.YallaOutingUser;
using Application.Dtos.YallaOutingUser.Request;
using Application.Dtos.YallaOutingUser.Response;
using AutoMapper;
using Domain.Entities.User;
using Domain.Interfaces.CommonInterfaces.OperationResultFactoryInterfaces;
using Domain.Interfaces.RepositoryInterfaces;
using Domain.Results;
using Infrastructure.Utility.Authentication;
using Microsoft.Extensions.Logging;

namespace Application.Services.YallaOutingUser
{
    public class YallaOutingUserService : IYallaOutingUserService
    {
        private readonly IYallaOutingUserRepository _userRepository;
        private readonly IOperationResultFactory _operationResultFactory;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IMapper _mapper;
        private readonly ILogger<YallaOutingUserService> _logger;

        public YallaOutingUserService(
            IYallaOutingUserRepository userRepository,
            IOperationResultFactory operationResultFactory,
            IJwtTokenGenerator jwtTokenGenerator,
            IMapper mapper,
            ILogger<YallaOutingUserService> logger)
        {
            _userRepository = userRepository;
            _operationResultFactory = operationResultFactory;
            _jwtTokenGenerator = jwtTokenGenerator;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<OperationResultSingle<UserAuthResponse>> RegisterAsync(RegisterUserRequest request)
        {
            try
            {
                // Check if username already exists
                if (await _userRepository.UsernameExistsAsync(request.Username))
                {
                    return _operationResultFactory.BadRequest<UserAuthResponse>("Username already exists");
                }

                // Check if email already exists
                if (await _userRepository.EmailExistsAsync(request.Email))
                {
                    return _operationResultFactory.BadRequest<UserAuthResponse>("Email already exists");
                }

                // Check if phone number already exists
                if (await _userRepository.PhoneNumberExistsAsync(request.PhoneNumber))
                {
                    return _operationResultFactory.BadRequest<UserAuthResponse>("Phone number already exists");
                }

                // Hash the password
                var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

                // Create new user
                var newUser = new Domain.Entities.User.YallaOutingUser
                {
                    Username = request.Username,
                    Email = request.Email,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    PasswordHash = passwordHash,
                    PhoneNumber = request.PhoneNumber,
                    XpLevel = 1,
                    Role = "User",
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                };

                var createdUser = await _userRepository.CreateAsync(newUser);

                // Generate JWT token
                var token = _jwtTokenGenerator.GenerateToken(createdUser.Id, createdUser.Username);

                // Update last login
                createdUser.LastLoginAt = DateTime.UtcNow;
                await _userRepository.UpdateAsync(createdUser);

                var response = _mapper.Map<UserAuthResponse>(createdUser);
                response.Token = token;

                return _operationResultFactory.Created(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during user registration");
                return _operationResultFactory.InternalServerError<UserAuthResponse>("Registration failed");
            }
        }

        public async Task<OperationResultSingle<UserAuthResponse>> LoginAsync(LoginUserRequest request)
        {
            try
            {
                var user = await _userRepository.GetByUsernameOrEmailAsync(request.UsernameOrEmail);
                
                if (user == null || !user.IsActive)
                {
                    return _operationResultFactory.Unauthorized<UserAuthResponse>();
                }

                // Verify password
                if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                {
                    return _operationResultFactory.Unauthorized<UserAuthResponse>();
                }

                // Generate JWT token
                var token = _jwtTokenGenerator.GenerateToken(user.Id, user.Username);

                // Update last login
                user.LastLoginAt = DateTime.UtcNow;
                await _userRepository.UpdateAsync(user);

                var response = _mapper.Map<UserAuthResponse>(user);
                response.Token = token;

                return _operationResultFactory.Success(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during user login");
                return _operationResultFactory.InternalServerError<UserAuthResponse>("Login failed");
            }
        }

        public async Task<OperationResultSingle<string>> LogoutAsync(int userId)
        {
            try
            {
                // In a JWT-based system, logout is typically handled client-side
                // by removing the token. Here we can just log the action.
                _logger.LogInformation($"User {userId} logged out");
                return _operationResultFactory.Success("Logged out successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during user logout");
                return _operationResultFactory.InternalServerError<string>("Logout failed");
            }
        }
    }
}