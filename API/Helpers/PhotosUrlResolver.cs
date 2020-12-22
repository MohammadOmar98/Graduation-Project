using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class PhotosUrlResolver : IValueResolver<Photo, PhotosForDetailedDto, string>
    {
        private readonly IConfiguration _config;
        public PhotosUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Photo source, PhotosForDetailedDto destination, string destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.Url))
            {
                return _config["ApiUrl"] + source.Url;
            }
            return null;
        }
    
    
        
    }
}