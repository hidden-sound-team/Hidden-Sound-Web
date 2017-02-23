﻿using HiddenSound.Web.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace HiddenSound.Web.Server.Controllers
{
    [Route("[controller]")]
    public class ApiController : Controller
    {
        public ApiController(IOptions<AppSettingsConfig> appSettings)
        {
            AppSettings = appSettings.Value;
        }

        public AppSettingsConfig AppSettings { get; }

        [HttpGet("[action]")]
        public IActionResult Config()
        {
            return Json(AppSettings);
        }
    }
}
