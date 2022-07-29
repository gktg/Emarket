namespace e_market.Models
{
    public class KisiFavoriUrunleri : BaseJunctionEntity
    {
        public int RegisterID { get; set; }

        public virtual Register Register { get; set; }

        public int UrunID { get; set; }

        public virtual Urun Urun { get; set; }
    }
}
