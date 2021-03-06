using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using e_market.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System.Text.Json.Serialization;
using Bogus.DataSets;
using e_market.Models.Enums;
using e_market.Repository;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace e_market
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddMvc();

            services.AddSingleton<IConfiguration>(Configuration);

            services.AddDbContext<ConnectionString>(options => options.UseLazyLoadingProxies().UseSqlServer(Configuration.GetConnectionString("Myconnection")));

            services.AddControllersWithViews().AddRazorRuntimeCompilation().AddJsonOptions(opt =>
            {
                opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });


            services.AddSession(opt =>
            {
                opt.IdleTimeout = TimeSpan.FromMinutes(30);
            });



            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddControllers().AddJsonOptions(x =>
            x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);

            services.AddScoped<IUrunRepository, UrunRepository>();
            services.AddScoped<IKisiFavoriKategorileriRepository, KisiFavoriKategorileriRepository>();
            services.AddScoped<IRegisterRepository, RegisterRepository>();
            services.AddScoped<IGonderiRepository, GonderiRepository>();
            services.AddScoped<IPageRepository, PageRepository>();
            services.AddScoped<IKisiHassasBilgilerRepository, KisiHassasBilgilerRepository>();
            services.AddScoped<IKategoriRepository, KategoriRepository>();
            services.AddScoped<IKisiFavoriUrunleriRepository, KisiFavoriUrunleriRepository>();
            services.AddScoped<IKisiEkledigiUrunlerRepository, KisiEkledigiUrunlerRepository>();



            services.Configure<CookiePolicyOptions>(options =>
            {
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.LoginPath = "/";
                    options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
                    options.SlidingExpiration = true;
                    options.Cookie.Name = "MyAppCookie";
                    options.AccessDeniedPath = "/";
                });
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ConnectionString context)
        {
            if (env.IsDevelopment())
            {
                //context.Database.EnsureDeleted();
                context.Database.EnsureCreated();
                context.Database.Migrate();
                //CreateData(context);
            }
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseSession();

            app.UseRouting();

            app.UseCookiePolicy();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Emarket}/{action=Register}/{id?}");
            });
        }


        public void CreateData(ConnectionString context)
        {
            var a = new Commerce("tr").Categories(10);
            for (int i = 5; i < 10; i++)
            {
                Kategori kategorim = new Kategori();
                kategorim.KategoriAdi = a[i];
                kategorim.KategoriAciklama = new Lorem("tr").Sentence(10);
                kategorim.Status = DataStatus.Inserted;
                kategorim.CreatedDate = DateTime.Now;


                for (int j = 5; j < 20; j++)
                {
                    string price = new Commerce("tr").Price(1, 5000, 0, "TL");
                    int b = Convert.ToInt32(price.Substring(2, price.Length - 2));
                    Urun u = new Urun();
                    u.UrunAdi = new Commerce("tr").ProductName();
                    u.Stok = j * i;
                    u.UrunFiyati = b;
                    u.UrunMedya = new Images("tr").PicsumUrl();
                    kategorim.Urun.Add(u);
                    kategorim.Status = DataStatus.Inserted;
                    kategorim.CreatedDate = DateTime.Now;
                }
                context.Kategori.Add(kategorim);
                context.SaveChanges();
            }

            List<int> kategoriler = new List<int>() { 1, 2, 3 };
            foreach (var item in kategoriler)
            {
                var model = new KisiFavoriKategorileri()
                {
                    RegisterID = 1,
                    KategoriID = item,
                    CreatedDate = DateTime.Now,
                    Status = DataStatus.Inserted,
                };

                context.KisiFavoriKategorileri.Add(model);
                context.SaveChanges();
            }
        }
    }
}




