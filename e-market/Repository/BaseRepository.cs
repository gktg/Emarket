using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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


        public void Add(T item)
        {
            _cc.Set<T>().Add(item);
            _cc.SaveChanges();
        }

        public void AddRange(List<T> item)
        {
            _cc.Set<T>().AddRange(item);
            _cc.SaveChanges();
        }

        public bool Any(Expression<Func<T, bool>> exp)
        {
            return _cc.Set<T>().Any(exp);
        }

        public void Remove(T item)
        {
            item.DeletedDate = DateTime.Now;
            item.Status = DataStatus.Deleted;
            _cc.SaveChanges();
        }

        public void DeleteRange(List<T> item)
        {

            foreach (T element in item)
            {
                Remove(element);
            }
        }

        public void Destroy(T item)
        {
            _cc.Set<T>().Remove(item);
            _cc.SaveChanges();
        }

        public void DestroyRange(List<T> item)
        {
            foreach (T element in item)
            {
                Destroy(element);

            }
        }

        public List<T> GetActives()
        {
            return Where(x => x.Status != DataStatus.Deleted);
        }     

        public List<T> GetAll()
        {
            return _cc.Set<T>().ToList();
        }

        public List<T> GetModifieds()
        {
            return Where(x => x.Status == DataStatus.Updated);
        }

        public List<T> GetDeleted()
        {
            return Where(x => x.Status == DataStatus.Deleted);
        }

        public void Update(T item)
        {
            T toBeUpdated = Find(item.ID);
            item.Status = DataStatus.Updated;
            item.ModifiedDate = DateTime.Now;

            _cc.Entry(toBeUpdated).CurrentValues.SetValues(item);
            _cc.SaveChanges();

        }

        public void UpdateRange(List<T> item)
        {
            foreach (T element in item)
            {
                Update(element);

            }
        }

        public T Find(int id)
        {
            return _cc.Set<T>().Find(id);
        }

        public T FirstOrDefault(Expression<Func<T, bool>> exp)
        {
            return _cc.Set<T>().FirstOrDefault(exp);
        }

        public object Select(Expression<Func<T, object>> exp)
        {
            return _cc.Set<T>().Select(exp).ToList();
        }

        public List<T> Where(Expression<Func<T, bool>> exp)
        {
            return _cc.Set<T>().Where(exp).ToList();
        }
    }
}
