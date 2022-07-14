using e_market.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace e_market.Repository
{
    public class UrunRepository : BaseRepository<Urun>, IUrunRepository
    {
        public UrunRepository(ConnectionString cc) : base(cc)
        {
        }
    }
}
