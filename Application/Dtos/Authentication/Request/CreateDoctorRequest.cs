namespace Application.Dtos.Authentication.Request
{
    public class CreateDoctorRequest : BaseCreateUserRequest
    {
        public string Brief { get; set; }
        public int CheckPrice { get; set; }
        public int? ClinicId { get; set; }
        public int SpecializationId { get; set; }
    }
}
