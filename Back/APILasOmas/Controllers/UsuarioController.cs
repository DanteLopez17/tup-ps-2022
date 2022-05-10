using lasomas.Models;
using lasomas.Respuestas;
using Microsoft.AspNetCore.Mvc;
using lasomas.Comandos;
using lasomas.Comandos.Usuario;

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

  [HttpGet]
  [Route("[controller]/listadoUsuarios")]
  public RespuestaApi getUsuarios()
  {
    respuesta.Ok = true;
    List<Usuario> usuarios = bd.Usuarios.ToList();
    List<Usuario> otraLista = new List<Usuario>();
    foreach (Usuario u in usuarios)
    {
      bd.Entry(u).Reference(x => x.IdEstadoNavigation).Load();
      bd.Entry(u).Reference(x => x.IdTipoDocNavigation).Load();
      bd.Entry(u).Reference(x => x.IdRolNavigation).Load();
      otraLista.Add(u);
    }
    respuesta.Respuesta = otraLista;
    return respuesta;
  }

  [HttpGet]
  [Route("[controller]/{id}")]
  public RespuestaApi getUsuarioxId(int id)
  {
    RespuestaApi respuesta = new RespuestaApi();
    Usuario u = bd.Usuarios.Where(x => x.IdUsuario == id).FirstOrDefault();

    if (u != null)
    {
      bd.Entry(u).Reference(x => x.IdEstadoNavigation).Load();
      bd.Entry(u).Reference(x => x.IdTipoDocNavigation).Load();
      bd.Entry(u).Reference(x => x.IdRolNavigation).Load();
      respuesta.Ok = true;
      respuesta.Respuesta = u;
    }
    else
    {
      respuesta.Ok = false;
      respuesta.Error = "no existe el usuario con el id: " + id;
    }
    return respuesta;
  }


  [HttpPost]
  [Route("[controller]/actualizarUsuario")]
  public RespuestaApi actualizarUsuario([FromBody] ComandoUsuarioActualizar usu)
  {
    RespuestaApi respuesta = new RespuestaApi();
    if (usu.Nombre.Equals(""))
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese el nombre del usuario";
      return respuesta;
    }
    if (usu.Apellido.Equals(""))
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese el apellido del usuario";
      return respuesta;
    }
    if (usu.FechaNacimiento > DateTime.Today)
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese una fecha valida";
      return respuesta;
    }
    if (usu.IdTipoDoc <= 0)
    {
      respuesta.Ok = false;
      respuesta.Error = "Seleccione un tipo de documento";
      return respuesta;
    }
    if (usu.NumDoc <= 0 || usu.NumDoc == null)
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese el numero de documento del usuario";
      return respuesta;
    }
    if (usu.Email.Equals("") || usu.Email == null)
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese el email del usuario";
      return respuesta;
    }
    if (usu.Clave.Equals("") || usu.Clave == null || usu.Clave.Length < 4)
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese una clave valida del usuario";
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

    Usuario u = bd.Usuarios.Where(x => x.IdUsuario == usu.IdUsuario).FirstOrDefault();

    if (u != null)
    {
      u.Nombre = usu.Nombre;
      u.Apellido = usu.Apellido;
      u.FechaNacimiento = usu.FechaNacimiento;
      u.IdTipoDoc = usu.IdTipoDoc;
      u.NumDoc = usu.NumDoc;
      u.Email = usu.Email;
      u.Clave = usu.Clave;
      u.IdRol = usu.IdRol;
      u.IdEstado = usu.IdEstado;

      bd.Update(u);
      bd.SaveChanges();
    }

    respuesta.Ok = u != null;
    respuesta.infoAdicional = u != null ? string.Empty : "No existe el usuario con ese Id";

    return respuesta;
  }

  [HttpPost]
  [Route("[controller]/Login")]
  public RespuestaApi Login([FromBody] ComandoLogin usu)
  {
    if (usu.Email.Equals(""))
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese un mail";
      return respuesta;
    }
    if (usu.Clave.Equals(""))
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese una clave";
      return respuesta;
    }

    var user = bd.Usuarios.Where(x => x.Email == usu.Email && x.Clave == usu.Clave).FirstOrDefault();

    if (user != null)
    {
      respuesta.Ok = true;
      respuesta.Respuesta = user;
    }
    else
    {
      respuesta.Ok = false;
      respuesta.Error = "Las credenciales son incorrectas";
    }

    return respuesta;
  }


}
