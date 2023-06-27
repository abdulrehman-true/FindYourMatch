using System.Runtime.CompilerServices;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernmaeAsync(string username);
        Task<MemberDTO> GetMemberAsync(string username);

        Task<IEnumerable<MemberDTO>> GetMembersAsync();



    }
}