using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using e_market.Models;
using Bogus.DataSets;
using e_market.Models.Enums;

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
        public DbSet<KisiFavoriUrunleri> KisiFavoriUrunleri { get; set; }
        public DbSet<KisiEkledigiUrunler> KisiEkledigiUrunler { get; set; }
        public DbSet<Gonderi> Gonderi { get; set; }
        public DbSet<Page> Page { get; set; }
        public DbSet<Comment> Comment { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Register>()
                .HasOne(p => p.KisiHassasBilgiler)
                .WithOne(s => s.Register)
                .HasForeignKey<KisiHassasBilgiler>(x => x.ID).OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Kategori>()
                .HasMany(c => c.Urun)
                .WithOne(e => e.Kategori)
                .HasForeignKey(p => p.KategoriID).OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<KisiFavoriKategorileri>()
                .Ignore(x => x.ID)
                .HasKey(bc => new { bc.RegisterID, bc.KategoriID });

            modelBuilder.Entity<KisiFavoriKategorileri>()
                .HasOne(bc => bc.Register)
                .WithMany(b => b.KisiFavoriKategorileri)
                .HasForeignKey(bc => bc.RegisterID).OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<KisiFavoriKategorileri>()
                .HasOne(bc => bc.Kategori)
                .WithMany(c => c.KisiFavoriKategorileri)
                .HasForeignKey(bc => bc.KategoriID).OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<KisiFavoriUrunleri>()
                .Ignore(x => x.ID)
                .HasKey(bc => new { bc.RegisterID, bc.UrunID });

            modelBuilder.Entity<KisiFavoriUrunleri>()
                .HasOne(bc => bc.Register)
                .WithMany(b => b.KisiFavoriUrunleri)
                .HasForeignKey(bc => bc.RegisterID).OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<KisiFavoriUrunleri>()
                .HasOne(bc => bc.Urun)
                .WithMany(c => c.KisiFavoriUrunleri)
                .HasForeignKey(bc => bc.UrunID).OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<KisiEkledigiUrunler>()
                .Ignore(x => x.ID)
                .HasKey(bc => new { bc.RegisterID, bc.UrunID });

            modelBuilder.Entity<KisiEkledigiUrunler>()
                .HasOne(bc => bc.Register)
                .WithMany(b => b.KisiEkledigiUrunler)
                .HasForeignKey(bc => bc.RegisterID).OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<KisiEkledigiUrunler>()
                .HasOne(bc => bc.Urun)
                .WithMany(c => c.KisiEkledigiUrunler)
                .HasForeignKey(bc => bc.UrunID).OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<Register>()
                .HasMany(c => c.Gonderi)
                .WithOne(e => e.Register)
                .HasForeignKey(p => p.RegisterID).OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Gonderi>()
                .HasMany(c => c.Yorum)
                .WithOne(e => e.Gonderi)
                .HasForeignKey(p => p.GonderiID).OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Register>(x => x.HasData(new Register
            {
                Ad = "Servet Göktuğ",
                Soyad = "Türkan",
                Email = "g@mail.com",
                Sifre = "+hBCBANDrxIZaywz3zTgEzSrJWuH0QEXdL6Kvku6Wic=",
                Role = Role.Admin,
                ID = 1,
                CreatedDate = DateTime.Now,
                Status = DataStatus.Inserted,
            }));



            modelBuilder.Entity<KisiHassasBilgiler>(x => x.HasData(new KisiHassasBilgiler
            {
                Adres = new Address("tr").FullAddress(),
                DogumTarihi = DateTime.Now.AddYears(-20),
                TelefonNumarasi = "05388828249",
                ID = 1,
                CreatedDate = DateTime.Now,
                Status = Enums.DataStatus.Inserted,

            }));



        }

    }
}
