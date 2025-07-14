using System.Linq.Expressions;

namespace Domain.Interfaces.GenericrRepositoryInterfaces
{
    public interface IExistRepository<T> where T : class
    {
        bool Exists(Expression<Func<T, bool>> filter);
    }
}
