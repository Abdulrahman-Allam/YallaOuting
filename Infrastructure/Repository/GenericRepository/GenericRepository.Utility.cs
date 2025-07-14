using Domain.Interfaces.GenericrRepositoryInterfaces;
using System.Linq.Expressions;

namespace Infrastructure.Repository.Implementations
{
    public partial class GenericRepository<T>: IExistRepository<T>
    {
        public bool Exists(Expression<Func<T, bool>> filter)
        {
            return _dbSet.Any(filter);
        }
    }
}
