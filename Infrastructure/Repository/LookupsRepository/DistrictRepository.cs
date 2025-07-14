using Domain.Entities.Lookups;
using Infrastructure.Data;
using Infrastructure.Repository.Implementations;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infrastructure.Repository.LookupsRepository
{
    public class DistrictRepository : GenericRepository<District>
    {
        public DistrictRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<Governorate?> GetDistrictGovernorateAsync(int id)
        {
            IQueryable<District> query = _dbSet.AsNoTracking()
                                              .Include(c => c.Governorate);

            query = query.Where(d => d.Id == id);


            var district = await query.FirstOrDefaultAsync();
            return district?.Governorate ?? null;
        }

    }
}
