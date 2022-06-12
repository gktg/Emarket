using System;

namespace e_market.Models.ViewModels
{
    public class ProfilVm
    {
        public Register RegisterProfil { get; set; }
        public KisiHassasBilgiler KisiHassasBilgilerProfil { get; set; }

        
        public class Register
        {
            public int ID { get; set; }
            public string Ad { get; set; }

            public string Soyad { get; set; }

            public string Email { get; set; }
        }
        
        public class KisiHassasBilgiler
        {
            public int ID { get; set; }
            public DateTime DogumTarihi { get; set; }
            public string TelefonNumarasi { get; set; }
            public string Adres { get; set; }

        }
    }

}
