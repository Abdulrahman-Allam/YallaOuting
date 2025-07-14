namespace Application.Dtos.Authentication.Request
{
    public class CreatePatientRequest : BaseCreateUserRequest
    {
        public string? EmergencyContactName { get; set; }
        public string? EmergencyContactPhone { get; set; }
        public string? BloodType { get; set; }
        public int? UserInsuranceProviderId { get; set; }
        public int? CountryId { get; set; }
        public int? GovernorateId { get; set; }
        public int? DistrictId { get; set; }
    }
}
