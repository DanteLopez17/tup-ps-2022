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

}
