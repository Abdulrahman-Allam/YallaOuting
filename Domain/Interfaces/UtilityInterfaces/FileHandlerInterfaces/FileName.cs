using Microsoft.AspNetCore.Http;

namespace Domain.Interfaces.UtilityInterfaces.FileHandlerInterfaces
{
    public interface IFileHandler
    {
        Task<string> UploadAsync(IFormFile file, string uploadDir);
        void Delete(string filePath);
        bool Move(string fileName, string fromDir, string toDir);
        bool Exists(string filePath);
        string GetFile(string fileName);
        string GetFileExtension(string fileName);
        bool Rename(string oldFileName, string newFileName, string directory);
    }
}
