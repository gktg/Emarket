using e_market.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace e_market.Models
{
    public class Page :BaseEntity
    {
        public string PageName { get; set; }

        public string PageUrl { get; set; }

        public Role Role { get; set; }
    }
}
