using Domain.Interfaces.UtilityInterfaces.MimeTypesInterfaces;

namespace Infrastructure.Utility.MimeTypes
{
    public class MimeTypes : IMimeTypesService
    {
        private readonly IReadOnlyDictionary<string, string> mimeTypes;

        public MimeTypes(IMimeTypesLoader mimeTypesLoader)
        {
            try
            {
                mimeTypes = mimeTypesLoader.LoadMimeTypes();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading mime types: {ex.Message}");
                mimeTypes = new Dictionary<string, string>();
            }
        }

        public string GetMimeType(string extension)
        {
            if (string.IsNullOrWhiteSpace(extension)) return null!;

            extension = extension.TrimStart('.').ToLower();

            mimeTypes.TryGetValue(extension, out var mimeType);
            return mimeType;
        }

        public IReadOnlyDictionary<string, string> AllMimeTypes => mimeTypes;
    }
}
