namespace Core.Entities
{
    public class Photo : BaseEntity
    {
       public string Url { get; set; }
       public bool isMain { get; set; }
       public Product Product { get; set; }
       public int ProductId { get; set; }
    }
}