using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using e_market.Models;

namespace e_market.Repository
{
    public class KisiFavoriKategorileriRepository : BaseRepository<KisiFavoriKategorileri>, IKisiFavoriKategorileriRepository
    {
        public KisiFavoriKategorileriRepository(ConnectionString cc) : base(cc)
        {
        }
    }
}
