using System.Linq.Expressions;

namespace Domain.Interfaces.GenericrRepositoryInterfaces
{
    public interface IRetrieveRepository<T> where T : class
    {
        T Get(Expression<Func<T, bool>> filter = null!, Func<IQueryable<T>, Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<T, object>> include = null!, bool disableTracking = true, bool isActive = true, bool isDeleted = false);
        IEnumerable<T> GetAll(Expression<Func<T, bool>> filter = null!, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null!, Func<IQueryable<T>, Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<T, object>> include = null!, bool disabledTracking = true, bool isActive = true, bool isDeleted = false);
        Task<T?> GetAsync(Expression<Func<T, bool>> filter = null!, Func<IQueryable<T>, Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<T, object>> include = null!, bool disableTracking = true, bool isActive = true, bool isDeleted = false);
        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> filter = null!, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null!, Func<IQueryable<T>, Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<T, object>> include = null!, bool disabledTracking = true, bool isActive = true, bool isDeleted = false);
        T GetById(int id);
        Task<T?> GetByIdAsync(int id, Expression<Func<T, object>>[] includes = null!);
    }
}
