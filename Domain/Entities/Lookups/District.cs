namespace Domain.Entities.Lookups
{
    public class District : Lookup
    {
        public int GovernorateID { get; set; }
        public Governorate Governorate { get; set; }
    }
}
