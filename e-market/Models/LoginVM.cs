using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace e_market.Models
{
    public class LoginVM
    {
        public int TabloID { get; set; }

        public string Email { get; set; }

        public string Sifre { get; set; }
    }
}
