using e_market.Models;
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
using e_market.Controllers;

namespace e_market.Controllers
{
    public class HomeController : Controller
    {
        public readonly ConnectionString _cc;
        private readonly ILogger<HomeController> _logger;

        public HomeController(ConnectionString cc,ILogger<HomeController> logger)
        {
            _cc = cc;
            _logger = logger;
        }






    }
}
