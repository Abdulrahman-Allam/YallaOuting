using Application.Contracts;
using Application.Contracts.Lookups;
using Application.Dtos.Lookup.Request;
using Application.Dtos.Lookup.Response;
using AutoMapper;
using Domain.Entities.Lookups;
using Domain.Interfaces.CommonInterfaces.OperationResultFactoryInterfaces;
using Domain.Interfaces.GenericrRepositoryInterfaces;
using Domain.Interfaces.UnitOfWorkInterfaces;
using Domain.Results;
using Infrastructure.Repository.LookupsRepository;

namespace Application.Services.Lookups
{
    public class CountryService : LookupService<Country, CountryLookupRequest, CountryLookupResponse>, ICountryService
    {
        public CountryService(IUnitOfWork unitOfWork, IOperationResultFactory operationResultFactory, IMapper mapper) : base(unitOfWork, operationResultFactory, mapper)
        {
        }

        protected override IGenericRepository<Country> GetRepository()
        {
            return _unitOfWork.GetRepository<Country>();
        }

        public async Task<OperationResultSingle<IEnumerable<GovernorateLookupResponse>>> GetCountryGovernorates(int countryId)
        {
            var repository = (CountryRepository)GetRepository();
            var result = await repository.GetCountryGovernoratesAsync(countryId);
            if(result == null)
            {
                return _operationResultFactory.NotFound<IEnumerable<GovernorateLookupResponse>>("Invalid ID")!;
            }

            var mappedResult = _mapper.Map<IEnumerable<GovernorateLookupResponse>>(result);
            return _operationResultFactory.Success(mappedResult)!;
        }
    }
}