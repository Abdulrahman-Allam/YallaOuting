namespace Domain.Entities.Lookups
{
    public class Country : Lookup
    {
        public ICollection<Governorate>? Governorates { get; set; }
    }
}
