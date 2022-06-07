using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace e_market.Models
{
    public class RegisterModel
    {
        public int ID { get; set; }

        //[Required(ErrorMessage = "Name is required.")]
        //[MaxLength(10, ErrorMessage ="{0} en cok {1} karakter olabilir.")]
        //[Display(Name ="Nick Name")]
        //[Required(ErrorMessage = "Name required")]
        //[StringLength(2, ErrorMessage = "Name MAX BE...")]
        //[MaxLength(2, ErrorMessage = "Name MAX BE...")]
        public string Ad { get; set; }

        public string Soyad { get; set; }

        public string Email { get; set; }

        public string Sifre { get; set; }
    }
}
