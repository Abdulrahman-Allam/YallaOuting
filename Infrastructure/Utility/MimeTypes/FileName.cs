using Domain.Interfaces.UtilityInterfaces.MimeTypesInterfaces;
using Newtonsoft.Json;

namespace Infrastructure.Utility.MimeTypes
{
    public class FileMimeTypesLoader : IMimeTypesLoader
    {
        private readonly string filePath;

        public FileMimeTypesLoader(string filePath)
        {
            this.filePath = filePath;
        }

        public IReadOnlyDictionary<string, string> LoadMimeTypes()
        {
            try
            {
                string json = File.ReadAllText(filePath);
                return JsonConvert.DeserializeObject<IReadOnlyDictionary<string, string>>(json) ?? new Dictionary<string, string>();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading mime types from file: {ex.Message}");
                return new Dictionary<string, string>();
            }
        }
    }
}
