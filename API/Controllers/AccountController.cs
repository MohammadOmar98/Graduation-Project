using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _maper;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper maper)
        {
            _maper = maper;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {

            var user = await _userManager.FindByEmailFromClaimsPrincipal(HttpContext.User);

            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DispalyName = user.DisplayName
            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExsistsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {

            var user = await _userManager.FindUserByClaimsPrincipalWithAddressAsync(HttpContext.User);

            return _maper.Map<Address,AddressDto>(user.Address);

        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address) 
        {
            var user = await _userManager.FindUserByClaimsPrincipalWithAddressAsync(HttpContext.User);
             
            user.Address = _maper.Map<AddressDto,Address>(address); 

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) return Ok(_maper.Map<Address,AddressDto>(user.Address));

            return BadRequest("Problem Updating The User");
            
        }
      



        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized(new ApiResponse(401));

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DispalyName = user.DisplayName
            };
        }


        [HttpPost("Register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if ( CheckEmailExsistsAsync(registerDto.Email).Result.Value) 
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse{Errors = new[] {"Email Address is already in use"}});
            }


            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email,

            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400));

            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DispalyName = user.DisplayName
            };

        }



    }
}