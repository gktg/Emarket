using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace e_market.Models
{
    public class KisiBilgileriModel
    {
        public int ID { get; set; }

        public string Ad { get; set; }

        public string Soyad { get; set; }

        public string Email { get; set; }
    }
}
