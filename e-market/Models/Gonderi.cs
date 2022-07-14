using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace e_market.Models
{
    public class Gonderi : BaseEntity
    {

        public string GonderiPaylasim { get; set; }

        public DateTime GonderiTarihi { get; set; }

        public int RegisterID { get; set; }

        public virtual Register Register { get; set; }

    }
}
