using System.Collections.Generic;


namespace e_market.Models
{
    public class Urun
    {
        public int ID { get; set; }
        
        public int KategoriID { get; set; }
        public string UrunAdi { get; set; }
        public int UrunFiyati { get; set; }
        public int Stok { get; set; }
        
        public string UrunMedya { get; set; }
        public virtual Kategori Kategori { get; set; }
        public virtual ICollection<KisiFavoriUrunleri> KisiFavoriUrunleri { get; set; }
        public virtual ICollection<KisiEkledigiUrunler> KisiEkledigiUrunler { get; set; }

    }
}
