using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using e_market.Models;
using e_market.Models.Enums;

namespace e_market.Repository
{
    public class PageRepository : BaseRepository<Page>, IPageRepository
    {
        public PageRepository(ConnectionString cc) : base(cc)
        {
        }

        public List<Page> GetAdminPages()
        {
            return Where(x => x.Role == Role.Admin && x.Status == DataStatus.Inserted);
        }

        public List<Page> GetUserPages()
        {
            return Where(x => x.Role == Role.User && x.Status == DataStatus.Inserted);
        }
    }
}
