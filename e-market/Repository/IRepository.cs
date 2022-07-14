using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using e_market.Models;

namespace e_market.Repository
{
    public interface IRepository<T> where T : BaseEntity
    {

        void Add(T item);
        void AddRange(List<T> item);
        void Remove(T item);
        void Update(T item);
    }
}
