using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace e_market.Models
{
    public class Comment : BaseEntity
    {
        public string Yorum { get; set; }

        public int GonderiID { get; set; }

        public virtual Gonderi Gonderi{ get; set; }

    }
}
