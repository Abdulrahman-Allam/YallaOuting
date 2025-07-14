namespace Application.Dtos.Authentication.Request
{
    public class CreateSecretaryRequest : BaseCreateUserRequest
    {
        public int DoctorId { get; set; }
        public DateOnly HireDate { get; set; }
    }
}