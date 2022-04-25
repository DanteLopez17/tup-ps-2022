using lasomas.Comandos.Producto;
using lasomas.Models;
using lasomas.Respuestas;
using Microsoft.AspNetCore.Mvc;

namespace lasomas.Controllers;

[ApiController]
public class ProductoController : ControllerBase
{
  lasomasContext bd = new lasomasContext();
  RespuestaApi respuesta = new RespuestaApi();

  private readonly ILogger<ProductoController> _logger;

  public ProductoController(ILogger<ProductoController> logger)
  {
    _logger = logger;
  }

  [HttpGet]
  [Route("[controller]/clasificacion")]
  public RespuestaApi getClasificaciones()
  {
    respuesta.Ok = true;
    respuesta.Respuesta = bd.Clasificacions.ToList();
    return respuesta;
  }

  [HttpPost]
  [Route("[controller]/cargarProducto")]
  public RespuestaApi cargarProducto([FromBody] ComandoAltaProducto produ)
  {
    if (string.IsNullOrEmpty(produ.Nombre))
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese un nombre de producto";
      return respuesta;
    }
    if (string.IsNullOrEmpty(produ.Descripcion))
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese una descripcion de producto";
      return respuesta;
    }
    if (produ.Precio <= 0 || produ.Precio == null)
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese un precio valido";
      return respuesta;
    }
    if (produ.Cantidad <= 0 || produ.Cantidad == null)
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese una cantidad valida";
      return respuesta;
    }
    if (produ.IdClasificacion <= 0 || produ.IdClasificacion == null)
    {
      respuesta.Ok = false;
      respuesta.Error = "Seleccione clasificacion";
      return respuesta;
    }
    if (produ.IdEstado <= 0 || produ.IdEstado == null)
    {
      respuesta.Ok = false;
      respuesta.Error = "Seleccione estado";
      return respuesta;
    }


    Producto p = new Producto
    {
      Nombre = produ.Nombre,
      Descripcion = produ.Descripcion,
      Precio = produ.Precio,
      Cantidad = produ.Cantidad,
      IdClasificacion = produ.IdClasificacion,
      IdEstado = produ.IdEstado
    };

    bd.Productos.Add(p);
    bd.SaveChanges();
    respuesta.Ok = true;
    respuesta.Respuesta = p;

    return respuesta;
  }

  [HttpGet]
  [Route("[controller]/{id}")]
  public RespuestaApi getProductoxId(int id)
  {
    RespuestaApi respuesta = new RespuestaApi();
    Producto p = bd.Productos.Where(x => x.IdProducto == id).FirstOrDefault();

    if (p != null)
    {
      bd.Entry(p).Reference(x => x.IdEstadoNavigation).Load();
      bd.Entry(p).Reference(x => x.IdClasificacionNavigation).Load();
      respuesta.Ok = true;
      respuesta.Respuesta = p;
    }
    else
    {
      respuesta.Ok = false;
      respuesta.Error = "no existe el producto con el id: " + id;
    }
    return respuesta;
  }

  [HttpPost]
  [Route("[controller]/actualizarProducto")]
  public RespuestaApi actualizarProducto([FromBody] ComandoProductoActualizar pro)
  {
    RespuestaApi respuesta = new RespuestaApi();
    if (pro.Nombre.Equals(""))
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese el nombre del producto";
      return respuesta;
    }
    if (pro.Descripcion.Equals(""))
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese descripcion del producto";
      return respuesta;
    }
    if (pro.Precio < 0 || pro.Precio == null)
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese un precio valido";
      return respuesta;
    }
    if (pro.Cantidad < 0 || pro.Cantidad == null)
    {
      respuesta.Ok = false;
      respuesta.Error = "Ingrese una cantidad valida";
      return respuesta;
    }
    if (pro.IdClasificacion < 0 || pro.IdClasificacion == null)
    {
      respuesta.Ok = false;
      respuesta.Error = "Seleccione una clasificacion";
      return respuesta;
    }
    if (pro.IdEstado < 0 || pro.IdEstado == null)
    {
      respuesta.Ok = false;
      respuesta.Error = "Seleccione un estado";
      return respuesta;
    }

    Producto p = bd.Productos.Where(x => x.IdProducto == pro.IdProducto).FirstOrDefault();

    if (p != null)
    {
      p.Nombre = pro.Nombre;
      p.Descripcion = pro.Descripcion;
      p.Precio = pro.Precio;
      p.Cantidad = pro.Cantidad;
      p.IdClasificacion = pro.IdClasificacion;
      p.IdEstado = pro.IdEstado;

      bd.Update(p);
      bd.SaveChanges();
    }

    respuesta.Ok = p != null;
    respuesta.infoAdicional = p != null ? string.Empty : "No existe el producto con ese Id";

    return respuesta;
  }

}
