namespace Domain.Results
{
    public class OperationResultSingle<T>: OperationResultBase<T>
    {
        public T? Data { get; set; }

    }
}
