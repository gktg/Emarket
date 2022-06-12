using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace e_market.Models.ViewModels
{
    public class LoginVM
    {
        public int ID { get; set; }

        public string Email { get; set; }

        public string Sifre { get; set; }
    }
}
