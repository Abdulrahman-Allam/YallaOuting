using Domain.Entities.User;
using Domain.Interfaces.RepositoryInterfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository.UserRepository
{
    public class YallaOutingUserRepository : IYallaOutingUserRepository
    {
        private readonly ApplicationDbContext _context;

        public YallaOutingUserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<YallaOutingUser?> GetByIdAsync(int id)
        {
            return await _context.YallaOutingUsers.FindAsync(id);
        }

        public async Task<YallaOutingUser?> GetByUsernameAsync(string username)
        {
            return await _context.YallaOutingUsers
                .FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<YallaOutingUser?> GetByEmailAsync(string email)
        {
            return await _context.YallaOutingUsers
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<YallaOutingUser?> GetByUsernameOrEmailAsync(string usernameOrEmail)
        {
            return await _context.YallaOutingUsers
                .FirstOrDefaultAsync(u => u.Username == usernameOrEmail || u.Email == usernameOrEmail);
        }

        public async Task<YallaOutingUser?> GetByPhoneNumberAsync(string phoneNumber)
        {
            return await _context.YallaOutingUsers
                .FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
        }

        public async Task<bool> UsernameExistsAsync(string username)
        {
            return await _context.YallaOutingUsers
                .AnyAsync(u => u.Username == username);
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.YallaOutingUsers
                .AnyAsync(u => u.Email == email);
        }

        public async Task<bool> PhoneNumberExistsAsync(string phoneNumber)
        {
            return await _context.YallaOutingUsers
                .AnyAsync(u => u.PhoneNumber == phoneNumber);
        }

        public async Task<YallaOutingUser> CreateAsync(YallaOutingUser user)
        {
            _context.YallaOutingUsers.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<YallaOutingUser> UpdateAsync(YallaOutingUser user)
        {
            _context.YallaOutingUsers.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var user = await GetByIdAsync(id);
            if (user == null) return false;

            user.IsActive = false;
            await UpdateAsync(user);
            return true;
        }

        public async Task<IEnumerable<YallaOutingUser>> GetAllAsync()
        {
            return await _context.YallaOutingUsers
                .Where(u => u.IsActive)
                .ToListAsync();
        }
    }
}