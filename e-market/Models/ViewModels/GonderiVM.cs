using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace e_market.Models.ViewModels
{
    public class GonderiVM
    {
        public int ID { get; set; }

        public string GonderiPaylasim { get; set; }

        public DateTime GonderiTarihi { get; set; }

        public int RegisterID { get; set; }

        public string Ad { get; set; }

        public string Soyad { get; set; }
    }
}
