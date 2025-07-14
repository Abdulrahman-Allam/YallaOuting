namespace Domain.Interfaces.GenericrRepositoryInterfaces
{
    public interface IUpdateRepository<T> where T : class
    {
        Task<T> UpdateAsync(int id, T updatedEntity);
        T Update(int id, T updatedEntity);
    }
}
