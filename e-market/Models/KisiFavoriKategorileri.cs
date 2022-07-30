using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace e_market.Models
{
    public class KisiFavoriKategorileri : BaseEntity
    {

        public int RegisterID { get; set; }

        public virtual Register Register { get; set; }

        public int KategoriID { get; set; }

        public virtual Kategori Kategori { get; set; }


    }
}
