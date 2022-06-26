using e_market.Models;
using e_market.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.Data;
using System.Net.Mail;
using Bogus.DataSets;
using e_market.Tools;

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

            var a = new Commerce("tr").Categories(10);
            for (int i = 5; i < 10; i++)
            {
                Kategori kategorim = new Kategori();
                kategorim.KategoriAdi = a[i];
                kategorim.KategoriAciklama = new Lorem("tr").Sentence(10);


                for (int j = 5; j < 20; j++)
                {
                    string price = new Commerce("tr").Price(1, 5000, 2, "TL");
                    string b = price.Substring(2, price.Length - 2) + " " + "TL";
                    Urun u = new Urun();
                    u.UrunAdi = new Commerce("tr").ProductName();
                    u.Stok = j * i;
                    u.UrunFiyati = b;
                    u.UrunMedya = new Images("tr").PicsumUrl();
                    kategorim.Urun.Add(u);
                }
                _cc.Kategori.Add(kategorim);
                _cc.SaveChanges();
            }

            List<int> kategoriler = new List<int>() { 1, 2, 3 };
            foreach (var item in kategoriler)
            {
                var model = new KisiFavoriKategorileri()
                {
                    RegisterID = 1,
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
        public IActionResult Urunler()
        {

            return View();
        }
        public IActionResult Favoriler()
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


                HttpContext.Session.SetString("KisiID", kisibilgileri.ID.ToString());
                HttpContext.Session.SetString("Ad", kisibilgileri.Ad + " " + kisibilgileri.Soyad);
                HttpContext.Session.SetString("Email", kisibilgileri.Email);

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
            Register uye = new Register();


            MailSender x = new MailSender();

            x.MailGonder(uye);


            //*****************

            MailSenderStatic.MailGonderStatic(uye);

            return false;

        }

        [Route("/emarket/KisiBilgileriGetir/{ID}")]
        public Register KisiBilgileriGetir(int ID)
        {
            Register register = _cc.Register.Where(x => x.ID == ID).FirstOrDefault();

            return register;

        }

        [Route("/emarket/KisiBilgileriGuncelle/")]
        [HttpPost]
        public Register KisiBilgileriGuncelle(ProfilVm Register)
        {
            var kisiBilgileri = _cc.Register.Find(Register.ID);


            kisiBilgileri.Ad = Register.Ad;
            kisiBilgileri.Soyad = Register.Soyad;
            kisiBilgileri.Email = Register.Email;
            kisiBilgileri.KisiHassasBilgiler.DogumTarihi = Register.DogumTarihi;
            kisiBilgileri.KisiHassasBilgiler.TelefonNumarasi = Register.TelefonNumarasi;
            kisiBilgileri.KisiHassasBilgiler.Adres = Register.Adres;

            foreach (var item in kisiBilgileri.KisiFavoriKategorileri)
            {

                _cc.KisiFavoriKategorileri.Remove(item);
                _cc.SaveChanges();

            }


            foreach (var item in Register.KisiFavoriKategorileri)
            {
                var kisiFavorileri = new KisiFavoriKategorileri()
                {
                    RegisterID = Register.ID,
                    KategoriID = item
                };
                _cc.KisiFavoriKategorileri.Add(kisiFavorileri);
                _cc.SaveChanges();
            }


            _cc.Register.Update(kisiBilgileri);
            _cc.SaveChanges();


            return kisiBilgileri;
        }

        [Route("/emarket/KategoriGetir/")]
        public List<KategoriVM> KategoriGetir()
        {
            List<Kategori> kategori = _cc.Kategori.ToList();


            List<KategoriVM> kategoriVM = new List<KategoriVM>();

            foreach (var item in kategori)
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

        [Route("/emarket/UrunGetir/")]
        public List<UrunVM> UrunGetir()
        {
            List<Urun> urun = _cc.Urun.ToList();

            List<UrunVM> urunler = new List<UrunVM>();

            foreach (var item in urun)
            {
                var model = new UrunVM()
                {
                    ID = item.ID,
                    KategoriID = item.KategoriID,
                    KategoriAdi = item.Kategori.KategoriAdi,
                    UrunAdi = item.UrunAdi,
                    UrunFiyati = item.UrunFiyati,
                    UrunMedya = item.UrunMedya,
                    Stok = item.Stok,
                };
                urunler.Add(model);

            }

            return urunler;
        }

        [HttpPost]
        [Route("/emarket/FiltreliUrunGetir/")]
        public List<UrunVM> FiltreliUrunGetir(List<int> idList)
        {
            List<Urun> urun = _cc.Urun.ToList();

            List<Urun> filtreliUrunler = new List<Urun>();

            if (idList.Count != 0)
            {
                foreach (var item in idList)
                {
                    for (var i = 0; i < urun.Count; i++)
                    {
                        if (urun[i].KategoriID == item)
                        {
                            filtreliUrunler.Add(urun[i]);
                        }
                    }
                }
                List<UrunVM> urunler = new List<UrunVM>();

                foreach (var item in filtreliUrunler)
                {
                    var model = new UrunVM()
                    {
                        ID = item.ID,
                        KategoriID = item.KategoriID,
                        KategoriAdi = item.Kategori.KategoriAdi,
                        UrunAdi = item.UrunAdi,
                        UrunFiyati = item.UrunFiyati,
                        UrunMedya = item.UrunMedya,
                        Stok = item.Stok,
                    };
                    urunler.Add(model);

                }
                return urunler;

            }
            else
            {
                List<UrunVM> urunler = new List<UrunVM>();

                foreach (var item in urun)
                {
                    var model = new UrunVM()
                    {
                        ID = item.ID,
                        KategoriID = item.KategoriID,
                        KategoriAdi = item.Kategori.KategoriAdi,
                        UrunAdi = item.UrunAdi,
                        UrunFiyati = item.UrunFiyati,
                        UrunMedya = item.UrunMedya,
                        Stok = item.Stok,
                    };
                    urunler.Add(model);

                }
                return urunler;

            }


        }

        [Route("/emarket/FavoriUrunGetir/{ID}")]
        public List<UrunVM> FavoriUrunGetir(int ID)
        {
            List<KisiFavoriKategorileri> favoriKategorileri = _cc.KisiFavoriKategorileri.Where(x => x.RegisterID == ID).ToList();

            List<Urun> urun = _cc.Urun.ToList();
            List<UrunVM> favoriUrunler = new List<UrunVM>();

            foreach (var item in favoriKategorileri)
            {
                List<Urun> x = urun.Where(x => x.KategoriID == item.KategoriID).ToList();
                foreach (var item2 in x)
                {
                    var model = new UrunVM()
                    {
                        ID = item2.ID,
                        KategoriID = item2.KategoriID,
                        UrunAdi = item2.UrunAdi,
                        UrunFiyati = item2.UrunFiyati,
                        UrunMedya = item2.UrunMedya,
                        Stok = item2.Stok,
                    };
                    favoriUrunler.Add(model);
                }
            }



            return favoriUrunler;
        }

        [Route("/emarket/SepeteUrunEkle/{urunID}")]
        public List<UrunVM> SepeteUrunEkle(int urunID)
        {
            var eklenecekUrun = _cc.Urun.Find(urunID);

            List<UrunVM> eskiSepet = HttpContext.Session.GetObject<List<UrunVM>>("Sepet");

            List<UrunVM> eklenmisUrunler = new List<UrunVM>();

            var eklenecekUrunModel = new UrunVM()
            {
                ID = eklenecekUrun.ID,
                KategoriID = eklenecekUrun.KategoriID,
                KategoriAdi = eklenecekUrun.Kategori.KategoriAdi,
                UrunAdi = eklenecekUrun.UrunAdi,
                UrunFiyati = eklenecekUrun.UrunFiyati,
                UrunMedya = eklenecekUrun.UrunMedya,
                Stok = eklenecekUrun.Stok,
            };

            eklenmisUrunler.Add(eklenecekUrunModel);
            if (eskiSepet != null)
            {
                foreach (var item in eskiSepet)
                {
                    eklenmisUrunler.Add(item);
                }
            }

            HttpContext.Session.SetObject("Sepet", eklenmisUrunler);

            return HttpContext.Session.GetObject<List<UrunVM>>("Sepet");

        }

        [Route("/emarket/SepetiGetir/")]
        public List<UrunVM> SepetiGetir()
        {
            var x = HttpContext.Session.GetObject<List<UrunVM>>("Sepet");
            return x;

        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


    }
}
