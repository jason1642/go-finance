using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using net_finance_api.Models;
using NetFinanceApi.Services;




namespace net_finance_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DailyHistoricDataController : ControllerBase
    {


        public IConfiguration _configuration;
        private readonly DailyHistoricDataService _DailyHistoricDataService;


        public DailyHistoricDataController(IConfiguration config, DailyHistoricDataService DailyHistoricDataService)
        {
            _configuration = config;
            _DailyHistoricDataService = DailyHistoricDataService;


        }



        // GET: api/DailyHistoricData
        [HttpGet]
        public async Task<List<DailyHistoricData>> Get() =>
            await _DailyHistoricDataService.GetAsync();


        // GET: api/DailyHistoricData/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/DailyHistoricData
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/DailyHistoricData/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/DailyHistoricData/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
