using Domain.Interfaces.GenericrRepositoryInterfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infrastructure.Repository.Implementations
{
    public partial class GenericRepository<T> : IDeleteRepository<T> where T : class
    {
        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
            _context.SaveChanges();
        }

        public async Task DeleteAsync(T entity)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public void DeleteRange(IEnumerable<T> entities)
        {
            _dbSet.RemoveRange(entities);
            _context.SaveChanges();
        }

        public async Task DeleteRangeByAsync(Expression<Func<T, bool>> filter)
        {
            var entitiesToDelete = await _dbSet.Where(filter).ToListAsync();
            _dbSet.RemoveRange(entitiesToDelete);
            await _context.SaveChangesAsync();
        }
    }
}
