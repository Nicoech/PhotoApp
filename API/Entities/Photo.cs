using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Photos")]
    public class Photo 
    {
            public int Id { get; set; }

            public string Url {get; set;}

            public byte[] ImageData { get; set; }

            public string ImageType{ get; set;}

            public string ImageString { get ;set;}
            
            public bool isMain{ get; set;}

            public string PublicId { get; set; }

            public AppUser AppUser { get; set; }

            public int AppUserId { get; set; }
    }   
}