
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace e_market.Models
{
    public class MedyaKutuphanesi
    {

        public string MedyaAdi
        {
            get;
            set;
        }


        public string MedyaUrl
        {
            get;
            set;
        }

        public int? MedyaTipiId
        {
            get;
            set;
        }
    }
}
