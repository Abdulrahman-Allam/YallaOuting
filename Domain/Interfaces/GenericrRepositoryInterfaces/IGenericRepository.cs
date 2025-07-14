namespace Domain.Interfaces.GenericrRepositoryInterfaces
{
    public interface IGenericRepository<T> :
          IAddRepository<T>,
          IDeleteRepository<T>,
          IUpdateRepository<T>,
          IRetrieveRepository<T>,
          IExistRepository<T>
          where T : class
    {
    }
}
