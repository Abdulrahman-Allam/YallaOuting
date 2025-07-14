namespace Domain.Interfaces.UtilityInterfaces.MimeTypesInterfaces
{
    public interface IMimeTypesService
    {
        string GetMimeType(string extension);
        IReadOnlyDictionary<string, string> AllMimeTypes { get; }
    }
}
