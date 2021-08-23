using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.IO;
using static MediaTypeNames.MediaTypes;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {   
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _host;
        private readonly IHttpContextAccessor _httpContextAccessor;

        bool flag;
        public UserRepository(DataContext context, IMapper mapper, IWebHostEnvironment host, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _host = host;
            _mapper = mapper;
            _context = context;
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
            .Where(x => x.UserName == username)
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            return await _context.Users
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        public async Task<MemberDto> GetUserByIdAsync(int id)
        {
            return await _context.Users.Where(user => user.Id == id).ProjectTo<MemberDto>(_mapper.ConfigurationProvider).FirstAsync();
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
            .Include(p => p.Photos)
            .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
            .Include(p => p.Photos)
            .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
        
        
        public async Task<MemberDto> UploadPhoto(string member)
        {
            
            AppUser user = new AppUser();

            user = _context.Users.SingleOrDefault(x => x.UserName == member);

            if (user == null)
            {
                return null;
                
            } else{

                await UploadImage(user);
                return await _context.Users.Where(x => x.UserName == member).ProjectTo<MemberDto>(_mapper.ConfigurationProvider).FirstAsync();
            }
            
        }

        public async Task<bool> UploadImage(AppUser user)
        {   
           
                foreach (var file in _httpContextAccessor.HttpContext.Request.Form.Files)
                {
               
                        Image img = new Image();
                        img.ImageTitle = file.FileName;

                        MemoryStream ms = new MemoryStream();
                        await file.CopyToAsync(ms);
                        img.ImageData = ms.ToArray();

                        string base64String = Convert.ToBase64String(img.ImageData);

                        ms.Close();
                        ms.Dispose();

                   
                         Photo photo = new Photo
                        {
                            AppUserId = user.Id,
                            ImageData = img.ImageData,
                            Url = file.FileName,
                            ImageType = file.ContentType,
                            isMain = false,
                        };

                         if (photo.ImageData.Length > 0)
                        {
                            await _context.AddAsync(photo);
                            await _context.SaveChangesAsync();
                        
                            return flag = true;
                        
                        } else {
                            return flag = false;
                        }               
            }
            return flag;
        }

       
            public ActionResult<List<byte[]>> GetImages(int id)
            {
                    
                    List<byte[]> imageBytes = new List<byte[]>();
        
                    var pp =_context.Phote
                                .Where(p => p.AppUserId == id)
                                .ProjectTo<PhotoDto>(_mapper.ConfigurationProvider).ToListAsync();
                        

                    foreach (var file in pp.Result){
                        
                            if(file.IsMain == false){
                                imageBytes.Add(file.ImageData);
                            }
                    }

                    return imageBytes;
            }   
         public ActionResult<byte[]> getImageProfile(int id)
         {
                
                byte[] imageBytes = new byte[10];
       
                 var pp =_context.Phote
                              .Where(p => p.AppUserId == id && p.isMain == true).ProjectTo<PhotoDto>(_mapper.ConfigurationProvider);

                 foreach (var file in pp){
                     
                    if(file.IsMain == false){
                        imageBytes = file.ImageData;
                    }
                 }


                return imageBytes;
         } 
    }
    
}
