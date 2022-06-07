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

            modelBuilder.Entity<KisiHassasBilgiler>().HasOne(p => p.Register).WithOne(s => s.KisiHassasBilgiler).HasForeignKey<KisiHassasBilgiler>(x => x.ID);

            modelBuilder.Entity<RegisterModel>(x => x.HasData(new RegisterModel
            {
                Ad = "almila",
                Soyad = "aksu",
                Email = "almila@mail.com",
                Sifre = "1",
                ID = 1


            }, new RegisterModel
            {
                Ad = "almila",
                Soyad = "aksu",
                Email = "almila@mail.com",
                Sifre = "1",
                ID = 2


            }));

            modelBuilder.Entity<KisiHassasBilgiler>(x => x.HasData(new KisiHassasBilgiler
            {
                Adres = "adres1",
                Favori = 1,
                ID = 1


            }, new KisiHassasBilgiler
            {
                Adres = "adres1",
                Favori = 1,
                ID = 2


            }));

        }
    }
}
