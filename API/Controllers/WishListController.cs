using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class WishListController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IMapper _mapper;
        public WishListController(IBasketRepository basketRepository, IMapper mapper)
        {
            _mapper = mapper;
            _basketRepository = basketRepository;
        }

        [HttpGet]
        public async Task<ActionResult<WishList>> GetWishListById(string id)
        {
            var wishlist = await _basketRepository.GetBasketAsync(id);

            return Ok(wishlist ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<WishList>> UpdateWishList(WishListDto wishList)
        {
            var customerWishlist = _mapper.Map<WishListDto,CustomerBasket>(wishList);


            var updatedWishlist  = await _basketRepository.UpdateBasketAsync(customerWishlist);

            return Ok(updatedWishlist);
        }

        [HttpDelete]
        public async Task DeleteWishlistAsync(string id)
        {
            await _basketRepository.DeleteBasketAsync(id);
        }
    }
}