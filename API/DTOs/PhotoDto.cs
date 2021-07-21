namespace API.DTOs
{
    public class PhotoDto
    {
        public int Id { get; set; }

        public string Url { get; set; }
        public byte[] ImageData { get; set; }

        public string ImageString { get ;set;}
            
        public string ImageType {get ; set ;}
        
        public bool IsMain { get; set; }
    }
}