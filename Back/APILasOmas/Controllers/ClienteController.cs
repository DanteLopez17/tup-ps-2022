using System.Data.Common;
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


  [HttpGet]
  [Route("[controller]/listadoClientes")]
  public RespuestaApi getClientes()
  {
    respuesta.Ok = true;
    List<Cliente> clientes = bd.Clientes.ToList();
    List<Cliente> otraLista = new List<Cliente>();
    foreach (Cliente c in clientes)
    {
      bd.Entry(c).Reference(x => x.IdEstadoNavigation).Load();
      bd.Entry(c).Reference(x => x.IdTipoDocNavigation).Load();
      otraLista.Add(c);
    }
    respuesta.Respuesta = otraLista.OrderBy(x => x.IdEstado).ThenBy(x => x.Apellido);
    return respuesta;
  }

  [HttpGet]
  [Route("[controller]/{id}")]
  public RespuestaApi getClientexId(int id)
  {
    RespuestaApi respuesta = new RespuestaApi();
    Cliente c = bd.Clientes.Where(x => x.IdCliente == id).FirstOrDefault();

    if (c != null)
    {
      bd.Entry(c).Reference(x => x.IdEstadoNavigation).Load();
      bd.Entry(c).Reference(x => x.IdTipoDocNavigation).Load();
      respuesta.Ok = true;
      respuesta.Respuesta = c;
    }
    else
    {
      respuesta.Ok = false;
      respuesta.Error = "no existe el cliente con el id: " + id;
    }
    return respuesta;
  }

  [HttpPost]
  [Route("[controller]/actualizarCliente")]
  public RespuestaApi actualizarCliente([FromBody] ComandoClienteActualizar client)
  {
    RespuestaApi respuesta = new RespuestaApi();
    if (client.nombre.Equals(""))
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese el nombre de la persona";
      return respuesta;
    }

    if (string.IsNullOrEmpty(client.apellido))
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese el apellido de la persona";
      return respuesta;
    }
    if (client.tipoDni < 0)
    {
      respuesta.Ok = false;
      respuesta.Error = "Seleccione un tipo de documento";
      return respuesta;
    }
    if (client.numDoc < 0)
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese un numero de documento";
      return respuesta;
    }
    if (string.IsNullOrEmpty(client.cuitCuil))
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese un numero de cuil / cuit";
      return respuesta;
    }

    Cliente c = bd.Clientes.Where(x => x.IdCliente == client.id).FirstOrDefault();

    if (c != null)
    {
      c.Nombre = client.nombre;
      c.Apellido = client.apellido;
      c.IdTipoDoc = client.tipoDni;
      c.NumDoc = client.numDoc;
      c.FechaNacimiento = client.fechaNac;
      c.CuilCuit = client.cuitCuil;
      c.IdEstado = client.estado;

      bd.Update(c);
      bd.SaveChanges();
    }

    respuesta.Ok = c != null;
    respuesta.infoAdicional = c != null ? string.Empty : "No existe el cliente con ese Id";

    return respuesta;
  }


}
