using System.Linq.Expressions;

namespace Domain.Interfaces.GenericrRepositoryInterfaces
{
    public interface IDeleteRepository<T> where T : class
    {
        void Delete(T entity);
        Task DeleteAsync(T entity);
        void DeleteRange(IEnumerable<T> entities);
        Task DeleteRangeByAsync(Expression<Func<T, bool>> filter);
    }
}
