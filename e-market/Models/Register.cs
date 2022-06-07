using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace e_market.Models
{
    public class Register
    {
        public int ID { get; set; }
        public string Ad { get; set; }

        public string Soyad { get; set; }

        public string Email { get; set; }

        public string Sifre { get; set; }

        public virtual KisiHassasBilgiler KisiHassasBilgiler { get; set; }
    }
}
