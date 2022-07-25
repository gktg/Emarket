using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace e_market.Tools
{
    public static class HashPass
    {
        public static string hashPass(string password)
        {
            var sha = SHA256.Create();

            var asByteArray = Encoding.Default.GetBytes(password);

            var hashedPass = sha.ComputeHash(asByteArray);

            return Convert.ToBase64String(hashedPass);
        }
    }
}
