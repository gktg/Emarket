using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using e_market.Models;

namespace e_market.Models
{
    public class KisiHassasBilgiler
    {

        public int ID { get; set; }
        public string Adres { get; set; }
        public int Favori { get; set; }
        
        //relational properties
        public virtual RegisterModel Register { get; set; }
    }

    
}
