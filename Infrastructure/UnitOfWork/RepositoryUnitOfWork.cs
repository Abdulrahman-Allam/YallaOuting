using Domain.Entities.Lookups;
using Domain.Interfaces.GenericrRepositoryInterfaces;
using Domain.Interfaces.UnitOfWorkInterfaces;
using Infrastructure.Repository.Implementations;
using Infrastructure.Repository.LookupsRepository;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.UnitOfWorkImplementation
{
    public partial class UnitOfWork : IRepositoryUnitOfWork
    {

        public IGenericRepository<T> GetRepository<T>() where T : class
        {
            var type = typeof(T);

            // Check if repository already exists in the cache
            if (_repositories.ContainsKey(type))
            {
                return (IGenericRepository<T>)_repositories[type];
            }

            // Instantiate and return specific repositories if defined
            var specificRepository = CreateSpecificRepository<T>();
            if (specificRepository != null)
            {
                _repositories.Add(type, specificRepository);
                return specificRepository;
            }

            // Fallback to generic repository
            var genericRepository = new GenericRepository<T>(_context);
            _repositories.Add(type, genericRepository);
            return genericRepository;
        }

        private IGenericRepository<T>? CreateSpecificRepository<T>() where T : class
        {
            // Define specific repositories mapping
            if (typeof(T) == typeof(Country))
            {
                return (IGenericRepository<T>)new CountryRepository(_context);
            }

            if (typeof(T) == typeof(Governorate))
            {
                return (IGenericRepository<T>)new GovernorateRepository(_context);
            }

            if (typeof(T) == typeof(District))
            {
                return (IGenericRepository<T>)new DistrictRepository(_context);
            }

            return null;
        }
    }
}

