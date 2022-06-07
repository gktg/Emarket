using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace e_market.Models
{
    public class KisiHassasBilgiler
    {

        public int ID { get; set; }
        public DateTime DogumTarihi { get; set; }       
        public string TelefonNumarası { get; set; }
        public string Adres { get; set; }
        
        //relational properties
        public virtual Register Register { get; set; }
    }

    
}
