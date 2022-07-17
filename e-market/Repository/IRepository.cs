using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using e_market.Models;

namespace e_market.Repository
{
    public interface IRepository<T> where T : BaseEntity
    {
        //List Commands
        List<T> GetAll();
        List<T> GetDeleted();
        List<T> GetModifieds();
        List<T> GetActives();

        //Modification Commands

        void Add(T item);
        void AddRange(List<T> item);
        void Remove(T item);
        void DeleteRange(List<T> item);
        void Destroy(T item);
        void DestroyRange(List<T> item);
        void Update(T item);
        void UpdateRange(List<T> item);

        //Expression Commands
        List<T> Where(Expression<Func<T, bool>> exp);
        bool Any(Expression<Func<T, bool>> exp);
        T FirstOrDefault(Expression<Func<T, bool>> exp);
        object Select(Expression<Func<T, object>> exp);

        //Find Command
        T Find(int id);
    }
}
