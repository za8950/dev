using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Availity.Homework.Presentation.Models;

namespace Availity.Homework.Presentation.Controllers
{
    [Route("api/[controller]")]
    public class RegistrationController : Controller
    {
        [HttpPost("provider/create")]
        public bool Create([FromBody] Provider provider)
        {
            //process thru business logic, then save to repo
            return true;
        }

    }
}
