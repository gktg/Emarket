using System.Collections.Generic;

namespace e_market.Models
{
    public class Kategori
    {
        public Kategori()
        {
            Urun = new List<Urun>();
        }
        public int ID { get; set; }
        public string KategoriAdi { get; set; }
        public string KategoriAciklama { get; set; }
        public virtual List<Urun> Urun { get; set; }
        public virtual ICollection<KisiFavoriKategorileri> KisiFavoriKategorileri { get; set; }

    }
}
