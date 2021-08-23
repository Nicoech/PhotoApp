using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser User);
        Task<bool> SaveAllAsync();

        Task<IEnumerable<AppUser>> GetUsersAsync();

        Task<MemberDto> GetUserByIdAsync(int id);

        Task<AppUser> GetUserByUsernameAsync(string username);

        Task<IEnumerable<MemberDto>> GetMembersAsync();

        Task<MemberDto> GetMemberAsync(string username);

        Task<MemberDto> UploadPhoto(string member);

        ActionResult<List<byte[]>> GetImages(int id);
        
        ActionResult<byte[]> getImageProfile(int id);

    }
}