using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace e_market.Tools
{
    public static class SessionExtentions
    {
        //Session'ımızı belirleyecek metodu yaratıyoruz
        //Bana key-value lazım. value sınıf ta olabilir başka bir şeyde olabilir o yüzden object yaptık. Gelen value'yi önce convert edicem. 
        public static void SetObject(this ISession session, string key, object value)
        {
            string objectString = JsonConvert.SerializeObject(value);
            session.SetString(key, objectString); // key ve value'sunu verdik böylece
        }
        //Session'ı geri almak lazım. Session object tutar diyorduk, cast etmesi lazım. Generic Metodlar devreye girer :
        public static T GetObject<T>(this ISession session, string key) where T : class //T generic tip olmak zorunda
        {
            string objectString = session.GetString(key); //session da  json olarak duran stringi yakalıyorum
            if (string.IsNullOrEmpty(objectString))
            {
                return null;
            }
            T deserializedObject = JsonConvert.DeserializeObject<T>(objectString);
            return deserializedObject;
        }
        //Araba sınıfını session'a atmak istiyorsak : b.SetObject("araba",a);
        //Çağırmak istiyorsak : GetObject<Araba>("araba"); gibi...
    }
}