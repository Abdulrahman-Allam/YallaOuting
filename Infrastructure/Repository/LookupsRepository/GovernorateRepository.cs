using Domain.Entities.Lookups;
using Infrastructure.Data;
using Infrastructure.Repository.Implementations;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using System.Linq.Expressions;

namespace Infrastructure.Repository.LookupsRepository
{
    public class GovernorateRepository : GenericRepository<Governorate>
    {
        public GovernorateRepository(ApplicationDbContext context) : base(context)
        {
        }

        public virtual async Task<IEnumerable<District>> GetGovernorateDistrictsAsync(int id)
        {
            IQueryable<Governorate> query = _dbSet.AsNoTracking()
                                              .Include(c => c.Districts);

            query = query.Where(g => g.Id == id);


            var governorate = await query.FirstOrDefaultAsync();
            if (governorate == null)
            {
                return null;


            }
            return governorate?.Districts ?? Enumerable.Empty<District>(); 
        }

        public async Task<Country?> GetGovernorateCountryAsync(int id)
        {
            IQueryable<Governorate> query = _dbSet.AsNoTracking()
                                              .Include(c => c.Country);

            query = query.Where(g => g.Id == id);


            var governorate = await query.FirstOrDefaultAsync();
            return governorate?.Country ?? null;
        }

    }
}
