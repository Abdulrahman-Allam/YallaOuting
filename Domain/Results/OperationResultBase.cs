using System.Net;

namespace Domain.Results
{
    public abstract class OperationResultBase<T>
    {
        public HttpStatusCode StatusCode { get; set; } = HttpStatusCode.OK; // Default to OK
        public bool Succeeded { get; set; } = true; // Default to success
        public string Message { get; set; } = string.Empty;
        public List<string> Errors { get; set; } = new();
    }
}
