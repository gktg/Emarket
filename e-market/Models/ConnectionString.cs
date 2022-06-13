using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using e_market.Models;
using Bogus.DataSets;


namespace e_market.Models
{
    public class ConnectionString : DbContext
    {

        public ConnectionString(DbContextOptions<ConnectionString> options) : base(options)
        {


        }


        public DbSet<Register> Register { get; set; }
        public DbSet<KisiHassasBilgiler> KisiHassasBilgiler { get; set; }
        public DbSet<Urun> Urun { get; set; }
        public DbSet<Kategori> Kategori { get; set; }
        public DbSet<KisiFavoriKategorileri> KisiFavoriKategorileri { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<KisiHassasBilgiler>().HasOne(p => p.Register).WithOne(s => s.KisiHassasBilgiler).HasForeignKey<Register>(x => x.ID);

            modelBuilder.Entity<Kategori>()
                .HasMany(c => c.Urun)
                .WithOne(e => e.Kategori).HasForeignKey(p => p.KategoriID).OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<KisiFavoriKategorileri>().HasKey(bc => new { bc.RegisterID, bc.KategoriID });

            modelBuilder.Entity<KisiFavoriKategorileri>()
                .HasOne(bc => bc.Register)
                .WithMany(b => b.KisiFavoriKategorileri)
                .HasForeignKey(bc => bc.RegisterID).OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<KisiFavoriKategorileri>()
                .HasOne(bc => bc.Kategori)
                .WithMany(c => c.KisiFavoriKategorileri)
                .HasForeignKey(bc => bc.KategoriID).OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Register>(x => x.HasData(new Register
            {
                Ad = "Servet Göktuğ",
                Soyad = "Türkan",
                Email = "g@mail.com",
                Sifre = "awd.123456",
                ID = 1,

            }));



            modelBuilder.Entity<KisiHassasBilgiler>(x => x.HasData(new KisiHassasBilgiler
            {

                ID = 1,
                Adres = new Address("tr").FullAddress(),
                DogumTarihi = DateTime.Now.AddYears(-20),
                TelefonNumarasi = "05388828249"


            }));


        }

    }
}
