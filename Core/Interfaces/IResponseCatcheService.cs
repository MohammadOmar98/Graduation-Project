using System;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IResponseCatcheService
    {
         Task CacheResponseAsync(string catcheKey, object response, TimeSpan timeToLive);
         Task <string> GetCachedResponseAsync(string catcheKey);
    }
}