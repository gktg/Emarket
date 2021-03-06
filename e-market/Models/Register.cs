using e_market.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace e_market.Models
{
    public class Register:BaseEntity
    {
        public string Ad { get; set; }

        public string Soyad { get; set; }

        public string Email { get; set; }

        public string Sifre { get; set; }

        public Role Role { get; set; }

        public virtual KisiHassasBilgiler KisiHassasBilgiler { get; set; }
        public virtual ICollection<KisiFavoriKategorileri> KisiFavoriKategorileri { get; set; }
        public virtual ICollection<KisiFavoriUrunleri> KisiFavoriUrunleri { get; set; }
        public virtual ICollection<KisiEkledigiUrunler> KisiEkledigiUrunler { get; set; }
        public virtual ICollection<Gonderi> Gonderi { get; set; }


    }
}
