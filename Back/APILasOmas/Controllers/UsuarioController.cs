using lasomas.Models;
using lasomas.Respuestas;
using Microsoft.AspNetCore.Mvc;

namespace lasomas.Controllers;

[ApiController]
public class UsuarioController : ControllerBase
{
  lasomasContext bd = new lasomasContext();
  RespuestaApi respuesta = new RespuestaApi();

  private readonly ILogger<UsuarioController> _logger;

  public UsuarioController(ILogger<UsuarioController> logger)
  {
    _logger = logger;
  }

  [HttpGet]
  [Route("[controller]/roles")]
  public RespuestaApi getRoles()
  {
    respuesta.Ok = true;
    respuesta.Respuesta = bd.Rols.ToList();
    return respuesta;
  }

}
