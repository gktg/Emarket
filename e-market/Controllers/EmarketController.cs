using e_market.Models;
using e_market.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.Data;
using e_market.Tools;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;
using e_market.Repository;
using e_market.Models.Enums;
using System.Net.Http;

namespace e_market.Controllers
{
    public class EmarketController : Controller
    {

        public readonly ConnectionString _cc;
        private readonly ILogger<EmarketController> _logger;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IUrunRepository _urunRepository;
        private readonly IKisiFavoriKategorileriRepository _kisiFavoriKategorileriRepository;
        private readonly IRegisterRepository _registerRepository;
        private readonly IGonderiRepository _gonderiRepository;



        public EmarketController(ConnectionString cc, ILogger<EmarketController> logger, IWebHostEnvironment webHostEnvironment, IUrunRepository urunRepository, IKisiFavoriKategorileriRepository kisiFavoriKategorileriRepository, IRegisterRepository registerRepository, IGonderiRepository gonderiRepository)
        {
            _cc = cc;
            _logger = logger;
            _webHostEnvironment = webHostEnvironment;
            _urunRepository = urunRepository;
            _kisiFavoriKategorileriRepository = kisiFavoriKategorileriRepository;
            _registerRepository = registerRepository;
            _gonderiRepository = gonderiRepository;
        }

        #region View
        public IActionResult Register()
        {

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

        public IActionResult UrunEkleView()
        {
            return View();
        }

        public IActionResult UrunEkleViewList()
        {
            return View();
        }

        public IActionResult Forum()
        {
            return View();
        }

        #endregion

        public bool Logout()
        {
            HttpContext.Session.Remove("KisiID");
            HttpContext.Session.Remove("Ad");
            HttpContext.Session.Remove("Email");
            if (HttpContext.Session.GetObject<List<UrunVM>>("Sepet") != null)
            {
                HttpContext.Session.Remove("Sepet");

            }
            return true;

        }


        [Route("/emarket/Register/")]
        public bool Register(Register model)
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

                _registerRepository.Add(registerModel);
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

                HttpContext.Session.SetInt32("KisiID", kisibilgileri.ID);
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
            kisiBilgileri.ModifiedDate = DateTime.Now;
            kisiBilgileri.Status = DataStatus.Updated;

            kisiBilgileri.KisiHassasBilgiler.DogumTarihi = Register.DogumTarihi.Date;
            kisiBilgileri.KisiHassasBilgiler.TelefonNumarasi = Register.TelefonNumarasi;
            kisiBilgileri.KisiHassasBilgiler.Adres = Register.Adres;
            kisiBilgileri.KisiHassasBilgiler.ModifiedDate = DateTime.Now;
            kisiBilgileri.KisiHassasBilgiler.Status = DataStatus.Updated;

            foreach (var item in kisiBilgileri.KisiFavoriKategorileri)
            {
                _kisiFavoriKategorileriRepository.Remove(item);
            }

            if (Register.KisiFavoriKategorileri != null)
            {
                foreach (var item in Register.KisiFavoriKategorileri)
                {
                    var kisiFavorileri = new KisiFavoriKategorileri()
                    {
                        RegisterID = Register.ID,
                        KategoriID = item,
                        Status = DataStatus.Inserted,
                        CreatedDate = DateTime.Now,

                    };
                    _kisiFavoriKategorileriRepository.Add(kisiFavorileri);

                }
                //_kisiFavoriKategorileriRepository.AddRange(eklenecekler);
            }

            _registerRepository.Update(kisiBilgileri);

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

        [Route("/emarket/UrunleriGetir/")]
        public List<UrunVM> UrunleriGetir()
        {
            List<Urun> urun = _urunRepository.GetAll();

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
                if (item.KisiFavoriUrunleri.Count > 0)
                {
                    if (item.KisiFavoriUrunleri.ToList()[0].RegisterID == HttpContext.Session.GetInt32("KisiID"))
                    {
                        model.FavoriMi = true;
                    }
                    else
                    {
                        model.FavoriMi = false;

                    }
                }

                urunler.Add(model);


            }



            return urunler;
        }

        [HttpPost]
        [Route("/emarket/FiltreliUrunGetir/")]
        public List<UrunVM> FiltreliUrunGetir(List<int> idList)
        {
            List<Urun> urun = _urunRepository.GetAll();

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


        #region FavoriUrun
        [Route("/emarket/FavoriUrunGetir/{ID}")]
        public List<UrunVM> FavoriUrunGetir(int ID)
        {
            List<KisiFavoriKategorileri> favoriKategorileri = _kisiFavoriKategorileriRepository.Where(x => x.RegisterID == ID);

            List<Urun> urun = _urunRepository.GetAll();
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
                        KategoriAdi = item2.Kategori.KategoriAdi,
                        UrunFiyati = item2.UrunFiyati,
                        UrunMedya = item2.UrunMedya,
                        Stok = item2.Stok,
                    };
                    favoriUrunler.Add(model);
                }
            }



            return favoriUrunler;
        }

        [Route("/emarket/FavoriUrunEkle/{urunID}")]
        [HttpPost]
        public KisiFavoriUrunleri FavoriUrunEkle(int urunID)
        {
            var urun = _cc.Urun.Find(urunID);

            var model = new KisiFavoriUrunleri()
            {
                RegisterID = (int)HttpContext.Session.GetInt32("KisiID"),
                UrunID = urun.ID
            };

            _cc.KisiFavoriUrunleri.Add(model);
            _cc.SaveChanges();

            return model;
        }

        [Route("/emarket/FavoriUrunSil/{urunID}")]
        [HttpPost]
        public KisiFavoriUrunleri FavoriUrunSil(int urunID)
        {
            var urun = _cc.KisiFavoriUrunleri.Where(x => x.UrunID == urunID).FirstOrDefault();

            _cc.KisiFavoriUrunleri.Remove(urun);
            _cc.SaveChanges();

            return urun;
        }

        #endregion

        #region Sepet
        [Route("/emarket/SepeteUrunEkle/{urunID}")]
        public List<UrunVM> SepeteUrunEkle(int urunID)
        {
            Urun eklenecekUrun = _cc.Urun.Find(urunID);

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
                Miktar = 1,
            };

            eklenmisUrunler.Add(eklenecekUrunModel);

            if (eskiSepet != null)
            {
                foreach (var item in eskiSepet)
                {
                    if (item.ID == urunID)
                    {
                        item.Miktar++;
                        var fiyat = eklenecekUrun.UrunFiyati;
                        var fiyat2 = fiyat;
                        var sonUcret = item.Miktar * fiyat2;
                        item.UrunFiyati = (int)sonUcret;
                        var x = eklenmisUrunler.FirstOrDefault(x => x.ID == urunID);
                        eklenmisUrunler.Remove(x);
                    }

                    eklenmisUrunler.Add(item);


                }
            }


            HttpContext.Session.SetObject("Sepet", eklenmisUrunler);

            return SepetiGetir();

        }

        [Route("/emarket/SepetiGetir/")]
        public List<UrunVM> SepetiGetir()
        {
            List<UrunVM> sepet = HttpContext.Session.GetObject<List<UrunVM>>("Sepet");
            return sepet;

        }

        [Route("/emarket/SepettenUrunSil/{urunID}")]
        public List<UrunVM> SepettenUrunSil(int urunID)
        {
            List<UrunVM> sepet = HttpContext.Session.GetObject<List<UrunVM>>("Sepet");

            UrunVM silinecek = sepet.FirstOrDefault(x => x.ID == urunID);

            if (silinecek.Miktar > 1)
            {
                silinecek.Miktar--;
                HttpContext.Session.SetObject("Sepet", sepet);

            }
            else
            {
                sepet.Remove(silinecek);
                HttpContext.Session.SetObject("Sepet", sepet);
            }



            return SepetiGetir();
        }
        #endregion

        #region Kişi Ürün Kontrol

        [Route("/emarket/UrunEkle/")]
        [HttpPost]
        public UrunVM UrunEkle(UrunVM urunVM)
        {
            if (urunVM == null)
            {
                return null;

            }
            else
            {
                var yeniUrun = new Urun
                {
                    KategoriID = urunVM.KategoriID,
                    UrunAdi = urunVM.UrunAdi,
                    UrunFiyati = urunVM.UrunFiyati,
                    Stok = urunVM.Stok,
                    UrunMedya = urunVM.UrunMedya,
                };
                _urunRepository.Add(yeniUrun);

                var kisiEkledigiUrunModel = new KisiEkledigiUrunler
                {
                    RegisterID = (int)HttpContext.Session.GetInt32("KisiID"),
                    UrunID = yeniUrun.ID
                };

                _cc.KisiEkledigiUrunler.Add(kisiEkledigiUrunModel);
                _cc.SaveChanges();


                return urunVM;
            }
        }


        [Route("/emarket/KisiEkledigiUrunGetir/")]
        [HttpGet]
        public List<UrunVM> KisiEkledigiUrunGetir()
        {
            var urunIdList = _cc.KisiEkledigiUrunler.Where(x => x.RegisterID == HttpContext.Session.GetInt32("KisiID")).ToList();
            var urunler = _cc.Urun.ToList();
            List<UrunVM> kisiEkledigiUrunler = new List<UrunVM>();

            List<int> myIds = urunler.Select(x => x.ID).ToList();
            IEnumerable<int> ortakIdList = myIds.Intersect(urunIdList.Select(x => x.UrunID).ToList());


            kisiEkledigiUrunler.AddRange(ortakIdList.Select(x => new UrunVM
            {
                ID = x,
                UrunAdi = urunler.FirstOrDefault(y => y.ID == x).UrunAdi,
                UrunFiyati = urunler.FirstOrDefault(y => y.ID == x).UrunFiyati,
                UrunMedya = urunler.FirstOrDefault(y => y.ID == x).UrunMedya,
                Stok = urunler.FirstOrDefault(y => y.ID == x).Stok,
                KategoriID = urunler.FirstOrDefault(y => y.ID == x).KategoriID,

            }).ToList());

            return kisiEkledigiUrunler;

        }


        [Route("/emarket/UrunGetirIDIle/{urunID}")]
        [HttpGet]
        public UrunVM UrunGetirIDIle(int urunID)
        {
            var urunler = _cc.Urun.FirstOrDefault(x => x.ID == urunID);

            var urunModel = new UrunVM
            {
                ID = urunID,
                UrunAdi = urunler.UrunAdi,
                UrunFiyati = urunler.UrunFiyati,
                Stok = urunler.Stok,
                KategoriID = urunler.KategoriID,
                UrunMedya = urunler.UrunMedya,

            };

            return urunModel;
        }

        [Route("/emarket/UrunGuncelle/")]
        [HttpPost]
        public bool UrunGuncelle(UrunVM urun)
        {
            try
            {
                var GuncellenecekUrun = _cc.Urun.FirstOrDefault(x => x.ID == urun.ID);

                GuncellenecekUrun.UrunAdi = urun.UrunAdi;
                GuncellenecekUrun.UrunFiyati = urun.UrunFiyati;
                GuncellenecekUrun.KategoriID = urun.KategoriID;
                GuncellenecekUrun.Stok = urun.Stok;
                GuncellenecekUrun.UrunMedya = urun.UrunMedya;

                _urunRepository.Update(GuncellenecekUrun);

                return true;
            }
            catch (Exception e)
            {

                throw e;
            }

        }

        [Route("/emarket/UrunSil/{urunID}")]
        [HttpPost]
        public bool UrunSil(int urunID)
        {
            try
            {
                var urunIliski = _cc.KisiEkledigiUrunler.FirstOrDefault(x => x.UrunID == urunID && x.RegisterID == HttpContext.Session.GetInt32("KisiID"));

                _cc.Remove(urunIliski);
                _cc.SaveChanges();

                var urun = _urunRepository.FirstOrDefault(x => x.ID == urunID);
                _urunRepository.Remove(urun);

                return true;
            }
            catch (Exception e)
            {

                throw e;
            }

        }

        #endregion

        #region Forum

        [Route("/emarket/GonderiKaydet/")]
        [HttpPost]
        public Gonderi GonderiKaydet(GonderiVM model)
        {
            if (ModelState.IsValid)
            {
                var gonderi = new Gonderi()
                {
                    GonderiPaylasim = model.GonderiPaylasim,
                    RegisterID = (int)HttpContext.Session.GetInt32("KisiID"),
                    GonderiTarihi = DateTime.Now,
                };
                _gonderiRepository.Add(gonderi);

                return gonderi;
            }
            else
            {
                return null;
            }
        }

        [Route("/emarket/GonderileriGetir")]
        [HttpGet]
        public List<GonderiVM> GonderileriGetir()
        {
            var gonderiler = _gonderiRepository.GetAll();

            var gonderilerList = new List<GonderiVM>();

            foreach (var item in gonderiler)
            {
                var gonderilerModel = new GonderiVM
                {
                    ID = item.ID,
                    GonderiPaylasim = item.GonderiPaylasim,
                    GonderiTarihi = item.GonderiTarihi,
                    RegisterID = item.RegisterID,
                    Register = item.Register,
                };
                gonderilerList.Add(gonderilerModel);
            };

            return gonderilerList;
        }

        #endregion


        [HttpGet]
        public async Task GetMembers()
        {
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync("https://localhost:44324/api/GetAllMembers"))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                }
            }

        }

        public async Task<MedyaKutuphanesi> WriteFile(IFormFile file)
        {

            var medya = new MedyaKutuphanesi();
            string fileName;
            var guid = Guid.NewGuid().ToString("N");

            if (file != null)
            {
                var wwwRootPath = _webHostEnvironment.WebRootPath;
                fileName = guid + (file.FileName).Replace(" ", "_");
                var pathBuilt = Path.Combine(Environment.CurrentDirectory, wwwRootPath + "/Medya");

                medya.MedyaAdi = fileName;
                medya.MedyaUrl = "/Medya/" + fileName;

                if (!Directory.Exists(pathBuilt))
                {
                    Directory.CreateDirectory(pathBuilt);
                }

                var path = Path.Combine(Directory.GetCurrentDirectory(), wwwRootPath + "/Medya/", fileName);


                await using var stream = new FileStream(path, FileMode.Create);
                await file.CopyToAsync(stream);

            }
            return medya;
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

    }
}
