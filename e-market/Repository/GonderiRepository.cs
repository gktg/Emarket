using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using e_market.Models;

namespace e_market.Repository
{
    public class GonderiRepository : BaseRepository<Gonderi>, IGonderiRepository
    {
        public GonderiRepository(ConnectionString cc) : base(cc)
        {
        }
    }
}
