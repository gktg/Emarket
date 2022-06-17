using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace e_market.Models.ViewModels
{
    public class KisiBilgileriVM
    {
        public int ID { get; set; }
        public string Ad { get; set; }

        public string Soyad { get; set; }

        public string Email { get; set; }

        public string Sifre { get; set; }

        public  KisiHassasBilgiler KisiHassasBilgiler { get; set; }
        public  List<KisiFavoriKategorileri> KisiFavoriKategorileri { get; set; }
    }
}
