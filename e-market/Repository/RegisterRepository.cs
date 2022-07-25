using e_market.Models;
using e_market.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace e_market.Repository
{
    public class RegisterRepository : BaseRepository<Register>, IRegisterRepository
    {
        public RegisterRepository(ConnectionString cc) : base(cc)
        {
        }

        public List<Register> GetRegisters()
        {
            return Where(x => x.Role == Role.User && x.Status == DataStatus.Inserted);
        }
    }
}
