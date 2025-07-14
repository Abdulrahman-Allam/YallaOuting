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
    public class DistrictService : LookupService<District, DistrictLookupRequest, DistrictLookupResponse>, IDistrictService
    {
        public DistrictService(IUnitOfWork unitOfWork, IOperationResultFactory operationResultFactory, IMapper mapper) : base(unitOfWork, operationResultFactory, mapper)
        {
        }

        protected override IGenericRepository<District> GetRepository()
        {
            return _unitOfWork.GetRepository<District>();
        }

        public async Task<OperationResultSingle<GovernorateLookupResponse>> GetDistrictGovernorate(int districtId)
        {
            var repository = (DistrictRepository)GetRepository();
            var result = await repository.GetDistrictGovernorateAsync(districtId);
            if (result == null)
            {
                return _operationResultFactory.NotFound<GovernorateLookupResponse> ("Invalid ID")!;
            }
            var mappedResult = _mapper.Map<GovernorateLookupResponse>(result);
            return _operationResultFactory.Success(mappedResult)!;
        }

    }
}