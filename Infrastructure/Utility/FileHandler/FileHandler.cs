using Domain.Constants;
using Domain.Interfaces.UtilityInterfaces.FileHandlerInterfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Utility.FileHandler
{
    public class FileHandler : IFileHandler
    {
        public async Task<string> UploadAsync(IFormFile file, string uploadDir)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("File cannot be null or empty", nameof(file));

            var fileExtension = Path.GetExtension(file.FileName);
            var uniqueFileName = $"{DateTime.Now:yyyyMMddHHmmss}{fileExtension}";
            var path = Path.Combine(uploadDir, uniqueFileName);
            EnsureDirectoryExists(uploadDir);
            try
            {
                using (var stream = new FileStream(path, FileMode.Create, FileAccess.Write))
                {
                    await file.CopyToAsync(stream);
                }
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Error while uploading the file.", ex);
            }

            return path.Replace(AppConstants.wwwroot + '\\', "");
        }

        public void Delete(string filePath)
        {
            if (Exists(filePath))
            {
                try
                {
                    File.Delete(filePath);
                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException($"Error while deleting the file: {filePath}", ex);
                }
            }
        }

        public bool Move(string fileName, string fromDir, string toDir)
        {
            var sourcePath = Path.Combine(fromDir, fileName);
            var destPath = Path.Combine(toDir, fileName);

            if (!Exists(sourcePath) || Exists(destPath)) return false;

            EnsureDirectoryExists(toDir);

            try
            {
                File.Move(sourcePath, destPath);
                return true;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error while moving the file: {fileName}", ex);
            }
        }

        public bool Exists(string filePath)
        {
            return File.Exists(filePath);
        }

        public string GetFile(string fileName)
        {
            var files = Directory.GetFiles(AppConstants.wwwroot, fileName, SearchOption.AllDirectories);

            return files.FirstOrDefault();
        }

        public string GetFileExtension(string fileName)
        {
            return Path.GetExtension(fileName);
        }

        public bool Rename(string oldFileName, string newFileName, string directory)
        {
            var oldPath = Path.Combine(directory, oldFileName);
            var newPath = Path.Combine(directory, newFileName);

            if (!Exists(oldPath) || Exists(newPath)) return false;

            try
            {
                File.Move(oldPath, newPath);
                return true;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error while renaming the file: {oldFileName}", ex);
            }
        }

        private static void EnsureDirectoryExists(string directoryPath)
        {
            if (!Directory.Exists(directoryPath))
            {
                try
                {
                    Directory.CreateDirectory(directoryPath);
                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException($"Error while creating directory: {directoryPath}", ex);
                }
            }
        }
    }
}
