using System.Collections.Generic;

namespace Core.Entities
{
    public class WishList
    {
         public WishList()
        {
        }

        public WishList(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
        public List<BasketItems> Items { get; set; } = new List<BasketItems>(); 

    }
}