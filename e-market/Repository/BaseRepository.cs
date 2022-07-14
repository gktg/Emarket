using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using e_market.Models;
using e_market.Models.Enums;


namespace e_market.Repository
{
    public abstract class BaseRepository<T> : IRepository<T> where T : BaseEntity
    {

        public readonly ConnectionString _cc;

        public BaseRepository(ConnectionString cc)
        {
            _cc = cc;
        }


        void Save()
        {
            _cc.SaveChanges();
        }
        public void Add(T item)
        {
            //var a = typeof(T);
            _cc.Set<T>().Add(item);
            _cc.SaveChanges();
            //Save();
        }
        public void AddRange(List<T> item)
        {
            _cc.Set<T>().AddRange(item);
            Save();
        }

        public void Remove(T item)
        {
            item.DeletedDate = DateTime.Now;
            item.Status = DataStatus.Deleted;
            Save();
        }

        public void Update(T item)
        {
            T toBeUpdated = Find(item.ID);
            item.Status = DataStatus.Updated;
            item.ModifiedDate = DateTime.Now;

            _cc.Entry(toBeUpdated).CurrentValues.SetValues(item);
            Save();

        }


        public T Find(int id)
        {
            return _cc.Set<T>().Find(id);
        }
    }
}
