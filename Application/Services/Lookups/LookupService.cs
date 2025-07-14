using Application.Contracts.Lookups;
using AutoMapper;
using Domain.Interfaces.CommonInterfaces.OperationResultFactoryInterfaces;
using Domain.Interfaces.GenericrRepositoryInterfaces;
using Domain.Interfaces.UnitOfWorkInterfaces;
using Domain.Results;

namespace Application.Services.Lookups
{
    public class LookupService<T, T_Req, T_Res> : ILookupService<T, T_Req, T_Res>
        where T : class
        where T_Req : class
        where T_Res : class
    {
        protected readonly IUnitOfWork _unitOfWork;
        protected readonly IOperationResultFactory _operationResultFactory;
        protected readonly IMapper _mapper;

        public LookupService(IUnitOfWork unitOfWork, IOperationResultFactory operationResultFactory, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _operationResultFactory = operationResultFactory;
            _mapper = mapper;
        }

        protected virtual IGenericRepository<T> GetRepository()
        {
            return _unitOfWork.GetRepository<T>();
        }

        public virtual async Task<OperationResultSingle<IEnumerable<T_Res>>> GetAllAsync()
        {
            var repository = GetRepository();
            var result = await repository.GetAllAsync();

            var mappedResult = _mapper.Map<IEnumerable<T_Res>>(result);
            return _operationResultFactory.Success(mappedResult)!;
        }

        public virtual async Task<OperationResultSingle<T_Res>> GetByIdAsync(int id)
        {
            var repository = GetRepository();
            var result = await repository.GetByIdAsync(id);
            if (result == null)
            {
                return _operationResultFactory.NotFound<T_Res>("The provided ID doesn't match any record!");
            }
            var mappedResult = _mapper.Map<T_Res>(result);
            return _operationResultFactory.Success(mappedResult)!;
        }

        public async Task<OperationResultSingle<string>> AddAsync(T_Req entity)
        {
            var repository = GetRepository();
            await repository.AddAsync(_mapper.Map<T>(entity));
            await _unitOfWork.SaveAsync();
            return _operationResultFactory.Success("Created!")!;
        }

        public async Task<OperationResultSingle<T_Res>> UpdateAsync(int id, T_Req newEntity)
        {
            var repository = GetRepository();
            var oldEntity = await repository.GetByIdAsync(id);
            if (oldEntity != null)
            {
                await repository.UpdateAsync(id, _mapper.Map(newEntity, oldEntity)); // Maps properties from newEntity to oldEntity
                await _unitOfWork.SaveAsync();
                var mappedResult = _mapper.Map<T_Res>(_mapper.Map(newEntity, oldEntity));
                return _operationResultFactory.Success(mappedResult)!;
            }
            else
            {
                return _operationResultFactory.NotFound<T_Res>("The provided ID doesn't match any record!");
            }

        }

        public async Task<OperationResultSingle<T_Res>> DeleteAsync(int id)
        {
            var repository = GetRepository();
            var entity = await repository.GetByIdAsync(id);
            if (entity != null)
            {
                await repository.DeleteAsync(entity);
                await _unitOfWork.SaveAsync();
                var mappedResult = _mapper.Map<T_Res>(entity);
                return _operationResultFactory.Success(mappedResult)!;
            }
            else
            {
                return _operationResultFactory.NotFound<T_Res>("The provided ID doesn't match any record!");
            }
        }
    }
}