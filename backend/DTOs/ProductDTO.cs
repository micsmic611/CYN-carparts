namespace Product.DTOs
{
    public class ProductDto
    {
        public int ProductId { get; set; }
        public int SellerId { get; set; }
        public string? Productname { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public int? Stock { get; set; }
        public int? CategoryId { get; set; }
        public DateTime? CreateAt { get; set; }
    }

    public class ProductWithCategoryDto
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public decimal? Price { get; set; }
        public int? Stock { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int CategoryId { get; set; }
        public string? Categoryname { get; set; }
        public string? ProductImgPath { get; set; } // เก็บ path ของรูปภาพ
    }
    public class ProductDtos
    {
        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public decimal Price { get; set; }
        public int? Stock { get; set; }
        public int? CategoryId { get; set; }
        public string? ProductImgPath { get; set; } // เก็บ path ของรูปภาพ
    }
    public class UpdateProductDto
    {
        public int Productid { get; set; }
        public string? Productname { get; set; }
        public string? ProductDescription { get; set; }
        public decimal Price { get; set; }
        public int? Stock { get; set; }
        public int? Categoryid { get; set; }
        public DateTime? Created_at { get; set; }
    }
}

