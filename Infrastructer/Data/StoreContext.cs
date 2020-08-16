using System.Reflection;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructer.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext( DbContextOptions <StoreContext> options) : base(options)
        {

        }

    public DbSet<Product> Products { get; set; } 
    public DbSet<ProductBrand> ProductsBrand { get; set; } 
    public DbSet<ProductType> ProductsType { get; set; } 

    protected override void OnModelCreating(ModelBuilder modelBuilder){
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    } 



    }
}