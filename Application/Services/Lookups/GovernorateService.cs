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
    public class GovernorateService : LookupService<Governorate, GovernorateLookupRequest, GovernorateLookupResponse>, IGovernorateService
    {
        public GovernorateService(IUnitOfWork unitOfWork, IOperationResultFactory operationResultFactory, IMapper mapper) : base(unitOfWork, operationResultFactory, mapper)
        {
        }

        protected override IGenericRepository<Governorate> GetRepository()
        {
            return _unitOfWork.GetRepository<Governorate>();
        }

        public async Task<OperationResultSingle<CountryLookupResponse>> GetGovernorateCountry(int governorateId)
        {
            var repository = (GovernorateRepository)GetRepository();
            var result = await repository.GetGovernorateCountryAsync(governorateId);
            if (result == null)
            {
                return _operationResultFactory.NotFound<CountryLookupResponse>("Invalid ID")!;
            }
            var mappedResult = _mapper.Map<CountryLookupResponse>(result);
            return _operationResultFactory.Success(mappedResult)!;
        }

        public async Task<OperationResultSingle<IEnumerable<DistrictLookupResponse>>> GetGovernorateDistricts(int governorateId)
        {
            var repository = (GovernorateRepository)GetRepository();
            var result = await repository.GetGovernorateDistrictsAsync(governorateId);
            if (result == null)
            {
                return _operationResultFactory.NotFound<IEnumerable<DistrictLookupResponse>>("Invalid ID")!;
            }
            var mappedResult = _mapper.Map<IEnumerable<DistrictLookupResponse>>(result);
            return _operationResultFactory.Success(mappedResult)!;
        }

    }
}