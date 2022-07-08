namespace e_market.Models.ViewModels
{
    public class UrunVM
    {
        public int ID { get; set; }
        public int KategoriID { get; set; }
        public string KategoriAdi { get; set; }
        public string UrunAdi { get; set; }
        public int UrunFiyati { get; set; }
        public int Stok { get; set; }
        public string UrunMedya { get; set; }

        public int? Miktar { get; set; }

        public bool? FavoriMi { get; set; }
    }
}
