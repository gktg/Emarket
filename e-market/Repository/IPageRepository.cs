using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using e_market.Models;

namespace e_market.Repository
{
    public interface IPageRepository : IRepository<Page>
    {
        List<Page> GetAdminPages();

        List<Page> GetUserPages();

    }
}
