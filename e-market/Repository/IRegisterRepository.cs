using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using e_market.Models;

namespace e_market.Repository
{
    public interface IRegisterRepository:IRepository<Register>
    {
        List<Register> GetRegisters();
       
    }
}
