using Domain.Entities.User;

namespace Domain.Interfaces.RepositoryInterfaces
{
    public interface IYallaOutingUserRepository
    {
        Task<YallaOutingUser?> GetByIdAsync(int id);
        Task<YallaOutingUser?> GetByUsernameAsync(string username);
        Task<YallaOutingUser?> GetByEmailAsync(string email);
        Task<YallaOutingUser?> GetByUsernameOrEmailAsync(string usernameOrEmail);
        Task<YallaOutingUser?> GetByPhoneNumberAsync(string phoneNumber);
        Task<bool> UsernameExistsAsync(string username);
        Task<bool> EmailExistsAsync(string email);
        Task<bool> PhoneNumberExistsAsync(string phoneNumber);
        Task<YallaOutingUser> CreateAsync(YallaOutingUser user);
        Task<YallaOutingUser> UpdateAsync(YallaOutingUser user);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<YallaOutingUser>> GetAllAsync();
    }
}