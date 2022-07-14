using System.Collections.Generic;

namespace e_market.Models
{
    public class Kategori : BaseEntity
    {
        public Kategori()
        {
            Urun = new List<Urun>();
        }
        public string KategoriAdi { get; set; }
        public string KategoriAciklama { get; set; }
        public virtual List<Urun> Urun { get; set; }
        public virtual ICollection<KisiFavoriKategorileri> KisiFavoriKategorileri { get; set; }

    }
}
