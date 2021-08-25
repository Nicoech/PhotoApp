using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Web;
using System.IO;
using Microsoft.AspNetCore.Http;
using System.Net.Http;
using AutoMapper.QueryableExtensions;
using System;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _http;
        private readonly DataContext _context;
        public UsersController(DataContext context, IUserRepository userRepository, IMapper mapper, IHttpContextAccessor http)
        {
            _context = context;
            _http = http;

            _mapper = mapper;
            _userRepository = userRepository;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();

            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUserByUsername(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }

        [HttpPost("upload/{username}")]
        public async Task<bool> UploadPhoto(string username)
        {
            return await _userRepository.UploadPhoto(username);
        }

        [HttpGet("getphotos/{id}")]
        public ActionResult<List<byte[]>> getImages(int id){
            
            return _userRepository.GetImages(id);
        }

        [HttpGet("getPhotoProfile/{id}")]
        public ActionResult<byte[]> getImage(int id){
            
            return _userRepository.getImageProfile(id);
        }
     
    }
}