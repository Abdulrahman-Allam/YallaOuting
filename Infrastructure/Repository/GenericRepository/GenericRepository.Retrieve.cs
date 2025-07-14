using Domain.Interfaces.GenericrRepositoryInterfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;

namespace Infrastructure.Repository.Implementations
{
    public partial class GenericRepository<T> : IRetrieveRepository<T>
    {
        public T Get(Expression<Func<T, bool>> filter = null!, Func<IQueryable<T>, Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<T, object>> include = null!, bool disableTracking = true, bool isActive = true, bool isDeleted = false)
        {
            IQueryable<T> query = _dbSet;
            if (disableTracking) query = query.AsNoTracking();
            if (filter is not null) query = query.Where(filter);
            if (include is not null) query = include(query);
            foreach (PropertyInfo pInfo in PropertyInfos)
            {
                if (pInfo.Name == "IsDeleted")
                    query = query.ToList().Where(x => x.GetType().GetProperty(pInfo.Name)!.GetValue(x)!.Equals(isDeleted)).AsQueryable();
                if (pInfo.Name == "IsActive")
                    query = query.ToList().Where(x => x.GetType().GetProperty(pInfo.Name)!.GetValue(x)!.Equals(isActive)).AsQueryable();
            }
            return query.FirstOrDefault()!;
        }

        public IEnumerable<T> GetAll(Expression<Func<T, bool>> filter = null!, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null!, Func<IQueryable<T>, Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<T, object>> include = null!, bool disabledTracking = true, bool isActive = true, bool isDeleted = false)
        {
            IQueryable<T> query = _dbSet;
            if (disabledTracking) query = query.AsNoTracking();
            if (filter is not null) query = query.Where(filter);
            if (include is not null) query = include(query);
            foreach (PropertyInfo pInfo in PropertyInfos)
            {
                if (pInfo.Name == "IsDeleted")
                    query = query.ToList().Where(x => x.GetType().GetProperty(pInfo.Name)!.GetValue(x)!.Equals(isDeleted)).AsQueryable();
                if (pInfo.Name == "IsActive")
                    query = query.ToList().Where(x => x.GetType().GetProperty(pInfo.Name)!.GetValue(x)!.Equals(isActive)).AsQueryable();
            }
            if (orderBy is not null)
                return orderBy(query).ToList();
            else
                return query.ToList();
        }


        public virtual async Task<T?> GetAsync(Expression<Func<T, bool>> filter = null!, Func<IQueryable<T>, Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<T, object>> include = null!, bool disableTracking = true, bool isActive = true, bool isDeleted = false)
        {
            IQueryable<T> query = _dbSet.AsQueryable();
            if (disableTracking) query = query.AsNoTracking();
            if (filter is not null) query = query.Where(filter);
            if (include is not null) query = include(query);
            foreach (PropertyInfo pInfo in PropertyInfos)
            {
                if (pInfo.Name == "IsDeleted")
                    query = query.ToList().Where(x => x.GetType().GetProperty(pInfo.Name)!.GetValue(x)!.Equals(false)).AsQueryable();
                if (pInfo.Name == "IsActive")
                    query = query.ToList().Where(x => x.GetType().GetProperty(pInfo.Name)!.GetValue(x)!.Equals(true)).AsQueryable();
            }
            return await query.FirstOrDefaultAsync();
        }
        public virtual async Task<IEnumerable<T>> GetAllAsync(
    Expression<Func<T, bool>> filter = null!,
    Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null!,
    Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null!,
    bool disabledTracking = true,
    bool isActive = true,
    bool isDeleted = false)
        {
            IQueryable<T> query = _dbSet;

            // Apply AsNoTracking if needed
            if (disabledTracking)
                query = query.AsNoTracking();

            // Apply Include (for navigation properties)
            if (include is not null)
                query = include(query);

            // Apply main filter if provided
            if (filter is not null)
                query = query.Where(filter);

            // Apply IsActive and IsDeleted filtering at the database level
            if (typeof(T).GetProperty("IsDeleted") is not null)
                query = query.Where(x => EF.Property<bool>(x, "IsDeleted") == isDeleted);

            if (typeof(T).GetProperty("IsActive") is not null)
                query = query.Where(x => EF.Property<bool>(x, "IsActive") == isActive);

            // Apply ordering if provided
            if (orderBy is not null)
                query = orderBy(query);

            // Execute the query asynchronously
            return await query.ToListAsync();
        }


        public virtual T GetById(int id)
        {
            return _dbSet.Find(id)!;
        }

        public virtual async Task<T?> GetByIdAsync(int id, Expression<Func<T, object>>[] includes = null!)
        {
            IQueryable<T> query = _dbSet.AsNoTracking();

            // Include related entities using the includes
            if (includes != null && includes.Any())
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }

            // Execute the query and return the entity with the specified ID
            return await query.FirstOrDefaultAsync(e => EF.Property<int>(e, "Id") == id);
        }

    }
}
