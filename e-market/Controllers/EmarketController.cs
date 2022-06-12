using e_market.Models;
using e_market.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Data;
using System.Net.Mail;
using Microsoft.AspNetCore.Identity;
using Bogus.DataSets;
using Bogus;

namespace e_market.Controllers
{
    public class EmarketController : Controller
    {

        public readonly ConnectionString _cc;
        private readonly ILogger<EmarketController> _logger;

        public EmarketController(ConnectionString cc, ILogger<EmarketController> logger)
        {
            _cc = cc;
            _logger = logger;
        }

        public IActionResult Register()
        {
            //var kisi = new Register();
            //kisi.Ad = "gktg";
            //kisi.Soyad = "trkn";
            //kisi.Email = "gktg@mail.com";
            //kisi.Sifre = "awd.12345";

            //_cc.Register.Add(kisi);
            //_cc.SaveChanges();

            //var hassas = new KisiHassasBilgiler();

            //hassas.Adres = "adres";
            //hassas.ID = kisi.ID;
            //hassas.TelefonNumarası = "05324864832";
            //_cc.KisiHassasBilgiler.Add(hassas);
            //_cc.SaveChanges();


            //kisi.KisiHassasBilgiler.Adres = "yeni adres";
            //_cc.Update(kisi);
            //_cc.SaveChanges();

            var a = new Commerce("tr").Categories(10);
            for (int i = 5; i < 10; i++)
            {
                Kategori kategorim = new Kategori();
                kategorim.KategoriAdi = a[i];
                kategorim.KategoriAciklama = new Lorem("tr").Sentence(10);


                for (int j = 5; j < 20; j++)
                {
                    Urun u = new Urun();
                    u.UrunAdi = new Commerce("tr").ProductName();
                    u.Stok = j * i;
                    u.UrunFiyati = new Commerce("tr").Price(1, 11000, 2, "TL");
                    u.UrunMedya = new Images("tr").PicsumUrl();
                    kategorim.Urun.Add(u);
                }
                _cc.Kategori.Add(kategorim);
                _cc.SaveChanges();
            }

            List<int> kategoriler = new List<int>() { 1, 2, 3, 4, 5 };
            var favoriKategori = new FavoriKategoriVM()
            {
                ProfilID = 1,
                KategoriID = kategoriler
            };
            foreach (var item in favoriKategori.KategoriID)
            {
                var model = new KisiFavoriKategorileri()
                {
                    RegisterID = favoriKategori.ProfilID,
                    KategoriID = item
                };

                _cc.KisiFavoriKategorileri.Add(model);
                _cc.SaveChanges();
            }

            return View();
        }
        public IActionResult Login()
        {
            return View();
        }
        public IActionResult DashBoard()
        {
            return View();
        }
        public IActionResult ForgotPass()
        {
            return View();
        }
        public IActionResult ResetPass()
        {
            return View();
        }
        public IActionResult Profil()
        {
            return View();
        }


        [Route("/emarket/RegisterVm/")]
        public bool RegisterVm(Register model)
        {
            try
            {
                var registerModel = new Register
                {
                    Ad = model.Ad,
                    Soyad = model.Soyad,
                    Email = model.Email,
                    Sifre = model.Sifre
                };

                _cc.Register.Add(registerModel);
                _cc.SaveChanges();

                return true;
            }
            catch (Exception e)
            {
                return false;
            }

        }

        [Route("/emarket/LoginKontrol/")]
        public bool LoginKontrol(LoginVM model)
        {
            var kisiKontrol = _cc.Register.Where(x => x.Email == model.Email && x.Sifre == model.Sifre).FirstOrDefault();

            if (kisiKontrol != null)
            {

                var kisibilgileri = KisiBilgileriGetir(kisiKontrol.ID);

                HttpContext.Session.SetString("KisiID", kisibilgileri.RegisterProfil.ID.ToString());
                HttpContext.Session.SetString("Ad", kisibilgileri.RegisterProfil.Ad + " " + kisibilgileri.RegisterProfil.Soyad);
                HttpContext.Session.SetString("Email", kisibilgileri.RegisterProfil.Email);
                return true;
            }
            else
            {
                return false;
            }
        }

        [Route("/emarket/ResetPassVM/")]
        public ResetPassVM ResetPass(ResetPassVM model)
        {
            var uye = _cc.Register.Find(model.ID);

            uye.Sifre = model.Sifre;

            _cc.Register.Update(uye);
            _cc.SaveChanges();


            return model;
        }

        [Route("/emarket/MailGonder/")]
        public bool MailGonder(string Mail)
        {
            try
            {
                var uye = _cc.Register.SingleOrDefault(x => x.Email == Mail);

                MailMessage eposta = new MailMessage();

                eposta.From = new MailAddress("antigs1998@hotmail.com");
                eposta.To.Add(Mail);
                eposta.Subject = "Şifre Sıfırlama";
                eposta.Body = $"<p>Sayın, {uye.Ad} {uye.Soyad}</p>" +
                    $"<a href='https://localhost:44393/emarket/ResetPass/{uye.ID}'>Şifre Sıfırla</a>";

                eposta.IsBodyHtml = true;
                using (SmtpClient smtp = new SmtpClient())
                {
                    smtp.Credentials = new System.Net.NetworkCredential("antigs1998@hotmail.com", "1998gktg1998");
                    smtp.Host = "smtp-mail.outlook.com";
                    smtp.EnableSsl = true;
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.Port = 587;

                    smtp.Send(eposta);
                    return true;
                }


            }
            catch (Exception e)
            {
                return false;
            }
        }

        [Route("/emarket/KisiBilgileriGetir/{ID}")]
        public KisiProfilVM KisiBilgileriGetir(int ID)
        {
            Register register = _cc.Register.Where(x => x.ID == ID).FirstOrDefault();


            var model = new KisiProfilVM
            {
                RegisterProfil = register,
            };

            return model;

        }

        //[Route("/emarket/KisiBilgileriGuncelle/")]
        //public Register KisiBilgileriGuncelle(KisiProfilVM model)
        //{
        //    var kisiBilgileri = _cc.Register.Where(x => x.ID == model.RegisterProfil.ID).FirstOrDefault();

        //    kisiBilgileri.Ad = model.RegisterProfil.Ad;
        //    kisiBilgileri.Soyad = model.RegisterProfil.Soyad;
        //    kisiBilgileri.Email = model.RegisterProfil.Email;

        //    _cc.Register.Update(kisiBilgileri);
        //    _cc.SaveChanges();


        //    return kisiBilgileri;
        //}

        [Route("/emarket/KisiBilgileriGuncelle/")]
        public Register KisiBilgileriGuncelle(ProfilVm model)
        {
            var kisiBilgileri = _cc.Register.Find(model.RegisterProfil.ID);

            kisiBilgileri.Ad = model.RegisterProfil.Ad;
            kisiBilgileri.Soyad = model.RegisterProfil.Soyad;
            kisiBilgileri.Email = model.RegisterProfil.Email;

            _cc.Register.Update(kisiBilgileri);
            _cc.SaveChanges();


            return kisiBilgileri;
        }

        [Route("/emarket/KategoriGetir/")]
        public List<KategoriVM> KategoriGetir()
        {
            List<Kategori> kategori = _cc.Kategori.ToList();

            List<KategoriVM> kategoriVM = new List<KategoriVM>();

            foreach(var item in kategori)
            {
                var model = new KategoriVM()
                {
                    KategoriID = item.ID,
                    KategoriAdi = item.KategoriAdi,
                };
                kategoriVM.Add(model);

            };


            return kategoriVM;
        }

        [Route("/emarket/FavoriKategorileriKaydet/")]
        public bool FavoriKategorileriKaydet(FavoriKategoriVM favoriKategori)
        {
            foreach (var item in favoriKategori.KategoriID)
            {
                var model = new KisiFavoriKategorileri()
                {
                    RegisterID = favoriKategori.ProfilID,
                    KategoriID = item
                };

                _cc.KisiFavoriKategorileri.Add(model);
                _cc.SaveChanges();
            }

            return true;

        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }



    }
}
