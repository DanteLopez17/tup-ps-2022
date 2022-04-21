using lasomas.Models;
using lasomas.Respuestas;
using Microsoft.AspNetCore.Mvc;
using lasomas.Comandos;

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

  [HttpPost]
  [Route("[controller]/cargarUsuario")]
  public RespuestaApi cargarUsuario([FromBody] ComandoAltaUsuario usu)
  {
    if (string.IsNullOrEmpty(usu.Nombre))
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese un nombre";
      return respuesta;
    }
    if (string.IsNullOrEmpty(usu.Apellido))
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese Apellido";
      return respuesta;
    }
    if (usu.FechaNacimiento > DateTime.Today)
    {
      respuesta.Ok = false;
      respuesta.Error = "Verifique la fecha ingresada";
      return respuesta;
    }
    if (usu.IdTipoDoc <= 0)
    {
      respuesta.Ok = false;
      respuesta.Error = "Seleccione un Tipo de documento";
      return respuesta;
    }
    if (usu.NumDoc <= 0)
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese un numero de documento";
      return respuesta;
    }
    if (string.IsNullOrEmpty(usu.Email))
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese un email";
      return respuesta;
    }
    if (string.IsNullOrEmpty(usu.Clave))
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese una clave";
      return respuesta;
    }

    if (usu.IdRol <= 0)
    {
      respuesta.Ok = false;
      respuesta.Error = "Seleccione un rol";
      return respuesta;
    }

    if (usu.IdEstado <= 0)
    {
      respuesta.Ok = false;
      respuesta.Error = "Seleccione un estado";
      return respuesta;
    }


    Usuario u = new Usuario
    {
      Nombre = usu.Nombre,
      Apellido = usu.Apellido,
      FechaNacimiento = usu.FechaNacimiento,
      IdTipoDoc = usu.IdTipoDoc,
      NumDoc = usu.NumDoc,
      Email = usu.Email,
      Clave = usu.Clave,
      IdRol = usu.IdRol,
      IdEstado = usu.IdEstado
    };

    bd.Usuarios.Add(u);
    bd.SaveChanges();
    respuesta.Ok = true;
    respuesta.Respuesta = u;

    return respuesta;
  }

}
