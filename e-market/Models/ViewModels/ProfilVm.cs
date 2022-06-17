using System;
using System.Collections.Generic;

namespace e_market.Models.ViewModels
{
    public class ProfilVm
    {

        public int ID { get; set; }
        public string Ad { get; set; }

        public string Soyad { get; set; }

        public string Email { get; set; }

        public DateTime DogumTarihi { get; set; }
        public string TelefonNumarasi { get; set; }
        public string Adres { get; set; }

        public List<int> KisiFavoriKategorileri { get; set; }
                         


    }

}
