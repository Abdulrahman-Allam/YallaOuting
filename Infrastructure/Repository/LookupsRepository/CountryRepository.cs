using Domain.Entities.Lookups;
using Infrastructure.Data;
using Infrastructure.Repository.Implementations;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infrastructure.Repository.LookupsRepository
{
    public class CountryRepository : GenericRepository<Country>
    {
        public CountryRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Governorate>> GetCountryGovernoratesAsync(int id)
        {
            IQueryable<Country> query = _dbSet.AsNoTracking()
                                              .Include(c => c.Governorates); // Include related governorates

            query = query.Where(c => c.Id == id);


            var country = await query.FirstOrDefaultAsync();

            if (country == null)
            {
                return null;

            }
            return country?.Governorates ?? Enumerable.Empty<Governorate>(); // Return governorates or empty list
        }

    }
}
