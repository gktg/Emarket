using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using e_market.Models.Enums;
namespace e_market.Models
{
    public abstract class BaseEntity
    {
        public int ID { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public DataStatus Status { get; set; }

        public BaseEntity()
        {
            Status = DataStatus.Inserted;
            CreatedDate = DateTime.Now;
        }
    }
}
