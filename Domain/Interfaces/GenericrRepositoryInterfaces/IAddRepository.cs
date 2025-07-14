namespace Domain.Interfaces.GenericrRepositoryInterfaces
{
    public interface IAddRepository<T> where T : class
    {
        void Add(T entity);
        Task AddAsync(T entity);
        void AddRange(IEnumerable<T> entities);
        Task AddRangeAsync(IEnumerable<T> entities);
    }
}
