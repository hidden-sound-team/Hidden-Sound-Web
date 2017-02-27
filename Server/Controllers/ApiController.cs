using HiddenSound.Web.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;
using System.Threading.Tasks;

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

        [HttpGet("[action]")]
        public async Task<IActionResult> ConfirmEmail([FromQuery] ConfirmEmailRequest request)
        {
            using(var client = new HttpClient()){
                var content = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");
                var response = await client.PostAsync($"{AppSettings.ApiUrl}/Application/User/ConfirmEmail", content);
            }

            return RedirectPermanent("/login");
        }
        
    }
}
