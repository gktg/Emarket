using e_market.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace e_market.Repository
{
    public class KisiFavoriUrunleriRepository : BaseRepository<KisiFavoriUrunleri>, IKisiFavoriUrunleriRepository
    {
        public KisiFavoriUrunleriRepository(ConnectionString cc) : base(cc)
        {
        }
    }
}
