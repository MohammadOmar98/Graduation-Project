using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructer.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager) 
        {
          if (!userManager.Users.Any()) 
          {
              var user = new AppUser 
              {
                  DisplayName = "Mohammad Omar",
                  Email = "mohammadnazzal98@yahoo.com",
                  UserName = "mohammadnazzal98@yahoo.com",
                  Address = new Address 
                  {
                      FirstName = "Mohammad",
                      LastName = "Omar",
                      Street = "10 the street",
                      City = "New York",
                      State = "NY",
                      ZipCode= "90210"
                      

                  }

              };

              await userManager.CreateAsync(user, "Pa$$wOrd1");
          }
        }
    }
}