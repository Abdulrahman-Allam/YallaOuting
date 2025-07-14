using Domain.Interfaces.GenericrRepositoryInterfaces;

namespace Domain.Interfaces.UnitOfWorkInterfaces
{
    public interface IRepositoryUnitOfWork
    {
        IGenericRepository<T> GetRepository<T>() where T : class;
    }
}
