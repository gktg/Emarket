using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace e_market.Models
{
    public class KisiEkledigiUrunler : BaseJunctionEntity
    {
        public int RegisterID { get; set; }

        public virtual Register Register { get; set; }

        public int UrunID { get; set; }

        public virtual Urun Urun { get; set; }
    }
}
