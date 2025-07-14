using Domain.Interfaces.GenericrRepositoryInterfaces;

namespace Infrastructure.Repository.Implementations
{
    public partial class GenericRepository<T> : IUpdateRepository<T> where T : class
    {
        public async Task<T> UpdateAsync(int id, T updatedEntity)
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity == null) return null!;

            UpdateEntityFromDto(entity, updatedEntity);
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public T Update(int id, T updatedEntity)
        {
            var entity = _dbSet.Find(id);
            if (entity == null) return null!;

            UpdateEntityFromDto(entity, updatedEntity);
            _dbSet.Update(entity);
            _context.SaveChanges();
            return entity;
        }

        private void UpdateEntityFromDto(T entity, T updatedDto)
        {
            foreach (var property in _propertyInfos)
            {
                var updatedValue = property.GetValue(updatedDto);
                if (updatedValue != null)
                {
                    property.SetValue(entity, updatedValue);
                }
            }
        }
    }
}
