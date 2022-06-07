using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using e_market.Models;


namespace e_market.Models
{
    public class ConnectionString : DbContext
    {
        public ConnectionString(DbContextOptions<ConnectionString> options) : base(options)
        {


        }


        public DbSet<RegisterModel> Register { get; set; }
        public DbSet<KisiHassasBilgiler> KisiHassasBilgiler { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }


    }
}
