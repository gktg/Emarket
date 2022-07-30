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
using e_market.Tools;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using e_market.Repository;
using e_market.Models.Enums;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

namespace e_market.Controllers
{

    public class EmarketController : Controller
    {
        private readonly ConnectionString _cc;
        private readonly ILogger<EmarketController> _logger;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IUrunRepository _urunRepository;
        private readonly IKisiFavoriKategorileriRepository _kisiFavoriKategorileriRepository;
        private readonly IRegisterRepository _registerRepository;
        private readonly IGonderiRepository _gonderiRepository;
        private readonly IPageRepository _pageRepository;
        private readonly IKisiHassasBilgilerRepository _kisiHassasBilgilerRepository;
        private readonly IKategoriRepository _kategoriRepository;
        private readonly IKisiFavoriUrunleriRepository _kisiFavoriUrunleriRepository;



        public EmarketController(ConnectionString cc, ILogger<EmarketController> logger, IWebHostEnvironment webHostEnvironment, IUrunRepository urunRepository, IKisiFavoriKategorileriRepository kisiFavoriKategorileriRepository, IRegisterRepository registerRepository, IGonderiRepository gonderiRepository, IPageRepository pageRepository, IKisiHassasBilgilerRepository kisiHassasBilgilerRepository, IKategoriRepository kategoriRepository, IKisiFavoriUrunleriRepository kisiFavoriUrunleriRepository)
        {
            _cc = cc;
            _logger = logger;
            _webHostEnvironment = webHostEnvironment;
            _urunRepository = urunRepository;
            _kisiFavoriKategorileriRepository = kisiFavoriKategorileriRepository;
            _registerRepository = registerRepository;
            _gonderiRepository = gonderiRepository;
            _pageRepository = pageRepository;
            _kisiHassasBilgilerRepository = kisiHassasBilgilerRepository;
            _kategoriRepository = kategoriRepository;
            _kisiFavoriUrunleriRepository = kisiFavoriUrunleriRepository;
        }

        #region View
        public IActionResult Register()
        {
            return View();
        }

        [Route("Login")]
        public IActionResult Login()
        {
            return View();
        }

        [Route("Urunler")]
        public IActionResult Urunler()
        {
            return View();
        }

        [Route("Favoriler")]
        public IActionResult Favoriler()
        {
            return View();
        }

        [Route("FavoriUrunler")]
        public IActionResult FavoriUrunler()
        {
            return View();
        }

        [Route("ForgotPass")]
        public IActionResult ForgotPass()
        {
            return View();
        }

        [Route("ResetPass/{id}")]
        public IActionResult ResetPass()
        {
            return View();
        }

        [Route("Profil")]
        public IActionResult Profil()
        {
            return View();
        }

        [Route("UrunEkleView")]
        public IActionResult UrunEkleView()
        {
            return View();
        }

        [Route("UrunEkleViewList")]
        public IActionResult UrunEkleViewList()
        {
            return View();
        }

        [Route("Forum")]
        public IActionResult Forum()
        {
            return View();
        }

        [Authorize(Roles = "Admin")]
        [Route("UyeListesi")]
        public IActionResult UyeListesi()
        {
            return View();
        }

        [Authorize(Roles = "Admin")]
        [Route("SayfaEkle")]
        public IActionResult SayfaEkle()
        {
            return View();
        }

        #endregion

        #region Emarket
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
                    Role = Role.User,
                };

                registerModel.Sifre = HashPass.hashPass(model.Sifre);


                _registerRepository.Add(registerModel);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }

        }

        [Route("/emarket/LoginKontrol/")]
        public bool LoginKontrolAsync(LoginVM model)
        {

            var kisiKontrol = _registerRepository.Where(x => x.Email == model.Email && x.Sifre == HashPass.hashPass(model.Sifre)).FirstOrDefault();
            ClaimsIdentity identity = null;
            bool isAuthenticate = false;

            if (kisiKontrol != null)
            {
                HttpContext.Session.SetInt32("KisiID", kisiKontrol.ID);
                HttpContext.Session.SetString("Rol", (kisiKontrol.Role.ToString()));
                HttpContext.Session.SetString("Ad", kisiKontrol.Ad + " " + kisiKontrol.Soyad);
                HttpContext.Session.SetString("Email", kisiKontrol.Email);

            }
            var kisiRol = kisiKontrol.Role;
            switch (kisiRol)
            {
                case Role.Admin:
                    identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
                    identity.AddClaim(new Claim(ClaimTypes.Role, Enum.GetName(typeof(Role), Role.Admin)));
                    identity.AddClaim(new Claim(ClaimTypes.Name, kisiKontrol.Ad));
                    isAuthenticate = true;
                    break;
                case Role.User:
                    identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
                    identity.AddClaim(new Claim(ClaimTypes.Role, Enum.GetName(typeof(Role), Role.User)));
                    identity.AddClaim(new Claim(ClaimTypes.Name, kisiKontrol.Ad));
                    isAuthenticate = true; break;
            };

            if (isAuthenticate)
            {
                ClaimsPrincipal principal = new ClaimsPrincipal(identity);
                HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, new AuthenticationProperties
                {
                    ExpiresUtc = DateTime.UtcNow.AddMinutes(30),
                    IsPersistent = false,
                    AllowRefresh = false
                });
                return true;
            }

            else
            {
                return false;
            }
        }

        [Route("/emarket/ResetPassVM/")]
        public bool ResetPass(ResetPassVM model)
        {
            var uye = _registerRepository.Find(model.ID);
            var yeniHashpass = HashPass.hashPass(model.Sifre);

            if (uye.Sifre != yeniHashpass)
            {
                uye.Sifre = yeniHashpass;

                _registerRepository.Update(uye);
                return true;

            }
            else
            {
                return false;
            }




        }

        [Route("/emarket/MailGonder/")]
        [HttpPost]
        public bool MailGonder(string mail)
        {
            var uye = _registerRepository.GetAll().FirstOrDefault(x => x.Email == mail);


            MailSenderStatic.MailGonderStatic(uye);

            return true;

        }

        [Route("/emarket/KisiBilgileriGetir/{ID}")]
        public Register KisiBilgileriGetir(int ID)
        {
            Register register = _registerRepository.Where(x => x.ID == ID).FirstOrDefault();

            return register;

        }

        [Route("/emarket/KisiBilgileriGuncelle/")]
        [HttpPost]
        public Register KisiBilgileriGuncelle(ProfilVm Register)
        {
            var kisiBilgileri = _registerRepository.Find(Register.ID);


            kisiBilgileri.Ad = Register.Ad;
            kisiBilgileri.Soyad = Register.Soyad;
            kisiBilgileri.Email = Register.Email;
            kisiBilgileri.ModifiedDate = DateTime.Now;
            kisiBilgileri.Status = DataStatus.Updated;

            if (kisiBilgileri.KisiHassasBilgiler != null)
            {
                kisiBilgileri.KisiHassasBilgiler.DogumTarihi = Register.DogumTarihi.Date;
                kisiBilgileri.KisiHassasBilgiler.TelefonNumarasi = Register.TelefonNumarasi;
                kisiBilgileri.KisiHassasBilgiler.Adres = Register.Adres;
                kisiBilgileri.KisiHassasBilgiler.ModifiedDate = DateTime.Now;
                kisiBilgileri.KisiHassasBilgiler.Status = DataStatus.Updated;
            }
            else
            {
                var KisiHassasBilgilerModel = new KisiHassasBilgiler()
                {
                    ID = Register.ID,
                    DogumTarihi = Register.DogumTarihi,
                    TelefonNumarasi = Register.TelefonNumarasi,
                    Adres = Register.Adres,
                };
                _kisiHassasBilgilerRepository.Add(KisiHassasBilgilerModel);
            }


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
            }

            _registerRepository.Update(kisiBilgileri);

            return kisiBilgileri;
        }

        [Route("/emarket/KategoriGetir/")]
        public List<KategoriVM> KategoriGetir()
        {
            List<Kategori> kategori = _kategoriRepository.GetActives();


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


        #endregion

        #region Urun
        [Route("/emarket/UrunleriGetir/")]
        public List<UrunVM> UrunleriGetir()
        {
            List<Urun> urun = _urunRepository.GetActives();

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

        [Route("/emarket/FavoriKategoriUrunleriGetir/{ID}")]
        public List<UrunVM> FavoriKategoriUrunleriGetir(int ID)
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
            var urun = _urunRepository.Find(urunID);

            var model = new KisiFavoriUrunleri()
            {
                RegisterID = (int)HttpContext.Session.GetInt32("KisiID"),
                UrunID = urun.ID
            };

            _kisiFavoriUrunleriRepository.Add(model);

            return model;
        }

        [Route("/emarket/FavoriUrunSil/{urunID}")]
        [HttpPost]
        public KisiFavoriUrunleri FavoriUrunSil(int urunID)
        {
            var urun = _kisiFavoriUrunleriRepository.Where(x => x.UrunID == urunID).FirstOrDefault();

            _kisiFavoriUrunleriRepository.Remove(urun);

            return urun;
        }
        [Route("/emarket/FavoriUrunGetir/{id}")]
        [HttpGet]
        public List<UrunVM> FavoriUrunGetir(int id)
        {
            List<UrunVM> urunList = new List<UrunVM>();
            List<Urun> urunlerim = _urunRepository.GetActives();

            List<int> urunIDList = _kisiFavoriUrunleriRepository.Where(x => x.RegisterID == id).Select(x => x.UrunID).ToList();

            urunList.AddRange(urunIDList.Select(x => new UrunVM {
                ID = x,
                UrunAdi = urunlerim.FirstOrDefault(y => y.ID == x).UrunAdi,
                UrunFiyati = urunlerim.FirstOrDefault(y => y.ID == x).UrunFiyati,
                UrunMedya = urunlerim.FirstOrDefault(y => y.ID == x).UrunMedya,
                Stok = urunlerim.FirstOrDefault(y => y.ID == x).Stok,
                KategoriID = urunlerim.FirstOrDefault(y => y.ID == x).KategoriID,
                KategoriAdi = urunlerim.FirstOrDefault(y => y.ID == x).Kategori.KategoriAdi,
                FavoriMi = true,

            }).ToList());


            return urunList;
        }


        #endregion

        #region Sepet
        [Route("/emarket/SepeteUrunEkle/{urunID}")]
        public List<UrunVM> SepeteUrunEkle(int urunID)
        {
            Urun eklenecekUrun = _urunRepository.Find(urunID);

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
                        var sonUcret = item.Miktar * fiyat;
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
                var urunTekFiyat = silinecek.UrunFiyati / silinecek.Miktar;
                silinecek.Miktar--;
                silinecek.UrunFiyati = (int)(urunTekFiyat * silinecek.Miktar);
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
            var urunler = _urunRepository.FirstOrDefault(x => x.ID == urunID);

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
                var GuncellenecekUrun = _urunRepository.FirstOrDefault(x => x.ID == urun.ID);

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

        #region Sayfa Yönetimi

        [HttpGet]
        [Route("/emarket/SayfaYonetimi/")]
        public List<Page> SayfaYonetimi()
        {
            string rol = HttpContext.Session.GetString("Rol");

            List<Page> pages = new List<Page>();

            if (rol == "Admin")
            {
                pages = _pageRepository.GetAdminPages();
                return pages;

            }
            else if (rol == "User")
            {
                pages = _pageRepository.GetUserPages();
                return pages;
            }

            return pages;

        }

        [HttpPost]
        [Route("/emarket/SayfaEkle/")]
        public Page SayfaEkle(Page page)
        {
            if (page.PageName != null)
            {
                page.PageName = page.PageName.ToUpper();
                _pageRepository.Add(page);

            }
            return page;
        }

        [HttpGet]
        [Route("/emarket/SayfaGetir/")]
        public List<Page> SayfaGetir()
        {
            return _pageRepository.GetActives();

        }

        [HttpGet]
        [Route("/emarket/UyeleriGetir/")]
        public List<Register> UyeleriGetir()
        {
            var uyeler = _registerRepository.GetRegisters();

            return uyeler;
        }

        [Route("/emarket/SayfaSil/{id}")]
        [HttpPost]
        public bool SayfaSil(int id)
        {
            try
            {
                var sayfa = _pageRepository.Find(id);
                _pageRepository.Remove(sayfa);

                return true;
            }
            catch (Exception e)
            {

                throw e;
            }

        }
        #endregion


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