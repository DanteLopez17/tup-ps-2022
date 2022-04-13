using lasomas.Comandos;
using lasomas.Models;
using lasomas.Respuestas;
using Microsoft.AspNetCore.Mvc;

namespace lasomas.Controllers;

[ApiController]
public class ClienteController : ControllerBase
{
  lasomasContext bd = new lasomasContext();
  RespuestaApi respuesta = new RespuestaApi();
  private readonly ILogger<ClienteController> _logger;

  public ClienteController(ILogger<ClienteController> logger)
  {
    _logger = logger;
  }
  [HttpGet]
  [Route("[controller]/tiposDocumento")]
  public RespuestaApi getTiposDoc()
  {
    respuesta.Ok = true;
    respuesta.Respuesta = bd.Tipodocumentos.ToList();
    return respuesta;
  }

  [HttpPost]
  [Route("[controller]/cargarCliente")]
  public RespuestaApi cargarCliente([FromBody] ComandoAltaCliente cli)
  {
    if (string.IsNullOrEmpty(cli.Nombre))
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese un nombre";
      return respuesta;
    }
    if (string.IsNullOrEmpty(cli.Apellido))
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese un apellido";
      return respuesta;
    }
    if (cli.FechaNacimiento > DateTime.Today)
    {
      respuesta.Ok = false;
      respuesta.Error = "Fecha incorrecta";
      return respuesta;
    }
    if (cli.IdTipoDoc == null || cli.IdTipoDoc < 0)
    {
      respuesta.Ok = false;
      respuesta.Error = "Id tipo Documento incorrecto";
      return respuesta;
    }
    if (cli.NumDoc == null || cli.NumDoc < 0)
    {
      respuesta.Ok = false;
      respuesta.Error = "Numero Documento incorrecto";
      return respuesta;
    }
    if (cli.CuilCuit == null || cli.CuilCuit == "")
    {
      respuesta.Ok = false;
      respuesta.Error = "Cuil Cuit incorrecto";
      return respuesta;
    }
    if (cli.IdEstado == null || cli.IdEstado < 0)
    {
      respuesta.Ok = false;
      respuesta.Error = "Id Estado incorrecto";
      return respuesta;
    }

    Cliente c = new Cliente
    {
      Nombre = cli.Nombre,
      Apellido = cli.Apellido,
      FechaNacimiento = cli.FechaNacimiento,
      IdTipoDoc = cli.IdTipoDoc,
      NumDoc = cli.NumDoc,
      CuilCuit = cli.CuilCuit,
      IdEstado = cli.IdEstado
    };

    bd.Clientes.Add(c);
    bd.SaveChanges();
    respuesta.Ok = true;
    respuesta.Respuesta = c;

    return respuesta;
  }




}
