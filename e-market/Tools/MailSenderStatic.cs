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

namespace e_market.Tools
{
    public static class MailSenderStatic
    {

        public static void MailGonderStatic(Register uye)
        {

            MailMessage eposta = new MailMessage();

            eposta.From = new MailAddress("antigs1998@hotmail.com");
            eposta.To.Add(uye.Email);
            eposta.Subject = "Şifre Sıfırlama";
            eposta.Body = $"<p>Sayın, {uye.Ad} {uye.Soyad}</p>" +
                $"<a href='https://localhost:44393/ResetPass/{uye.ID}'>Şifre Sıfırla</a>";

            eposta.IsBodyHtml = true;
            using (SmtpClient smtp = new SmtpClient())
            {
                smtp.Credentials = new System.Net.NetworkCredential("antigs1998@hotmail.com", "1998gktg1998");
                smtp.Host = "smtp-mail.outlook.com";
                smtp.EnableSsl = true;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Port = 587;

                smtp.Send(eposta);

            }

        }
    }
}
