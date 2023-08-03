using API.Entities;
using CloudinaryDotNet.Actions;

namespace API.Interfaces
{
    public interface IPhotoInterfaces
    {
        Task<ImageUploadResult> AddPhotoAsync(IFormFile file);

        Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}