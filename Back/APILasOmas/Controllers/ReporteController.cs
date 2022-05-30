using lasomas.Comandos.Reporte;
using lasomas.Models;
using lasomas.Respuestas;
using Microsoft.AspNetCore.Mvc;

namespace lasomas.Controllers;

[ApiController]
public class ReporteController : ControllerBase
{

  lasomasContext bd = new lasomasContext();
  RespuestaApi respuesta = new RespuestaApi();
  private readonly ILogger<ReporteController> _logger;

  public ReporteController(ILogger<ReporteController> logger)
  {
    _logger = logger;
  }

  [HttpGet]
  [Route("[controller]/masComprasCliente")]
  public RespuestaApi masComprasCliente(DateTime param1, DateTime param2)
  {
    var consulta = (from _pedidos in bd.Pedidos
                    join _clientes in bd.Clientes on _pedidos.IdCliente equals _clientes.IdCliente
                    where _pedidos.Fecha >= param1 && _pedidos.Fecha <= param2
                    group _pedidos by new { _pedidos.IdCliente, _pedidos.IdClienteNavigation.Nombre, _pedidos.IdClienteNavigation.Apellido } into g
                    orderby g.Count()
                    select new { cliente = g.Key, cantidad = g.Count() });

    if (consulta != null)
    {
      respuesta.Ok = true;
      respuesta.Respuesta = consulta;
    }

    /*
    Listado de Clientes con más cantidad de compras en un periodo de tiempo
    parametros: '2022-05-09' // '2022-05-17'
    */
    return respuesta;
  }

  [HttpGet]
  [Route("[controller]/masGastoCliente")]
  public RespuestaApi masGastoCliente(DateTime param1, DateTime param2)
  {

    var consultados = (from _pedidos in bd.Pedidos
                       join _clientes in bd.Clientes on _pedidos.IdCliente equals _clientes.IdCliente
                       join _detalles in bd.Detallepedidos on _pedidos.NroPedido equals _detalles.NroPedido
                       where _pedidos.Fecha >= param1 && _pedidos.Fecha <= param2
                       group _detalles by new { _pedidos.IdCliente, _pedidos.IdClienteNavigation.Apellido, _pedidos.IdClienteNavigation.Nombre } into g
                       orderby g.Sum(x => x.Cantidad + x.Precio)
                       select new
                       {
                         idCliente = g.Key,
                         total = g.Sum(x => x.Cantidad + x.Precio),
                         cantidad = g.Select(x => x.NroPedido).Distinct().Count()
                       }
                        );

    if (consultados != null)
    {
      respuesta.Ok = true;
      respuesta.Respuesta = consultados;
    }

    /*
    Listado de Clientes con más gasto en un periodo de tiempo
    parametros: '2022-05-09' // '2022-05-17'
    */

    return respuesta;
  }

  [HttpGet]
  [Route("[controller]/masVentasUsuario")]
  public RespuestaApi masVentasUsuario(DateTime param1, DateTime param2)
  {
    var consulta = (from _pedidos in bd.Pedidos
                    join _usuarios in bd.Usuarios on _pedidos.IdUsuario equals _usuarios.IdUsuario
                    where _pedidos.Fecha >= param1 && _pedidos.Fecha <= param2
                    group _pedidos by new { _pedidos.IdUsuario, _pedidos.IdUsuarioNavigation.Nombre, _pedidos.IdUsuarioNavigation.Apellido } into g
                    orderby g.Count()
                    select new { usuario = g.Key, cantidad = g.Count() });

    if (consulta != null)
    {
      respuesta.Ok = true;
      respuesta.Respuesta = consulta;
    }

    /*
      Listado de Usuarios con mas ventas en un periodo de tiempo
      parametros: 2022-05-09 // 2022-05-17
    */
    return respuesta;
  }

  [HttpGet]
  [Route("[controller]/articulosMasVendidos")]
  public RespuestaApi articulosMasVendidos(DateTime param1, DateTime param2)
  {

    var consultados = (from _detalles in bd.Detallepedidos
                       join _productos in bd.Productos on _detalles.IdProducto equals _productos.IdProducto
                       join _pedidos in bd.Pedidos on _detalles.NroPedido equals _pedidos.NroPedido
                       where _pedidos.Fecha >= param1 && _pedidos.Fecha <= param2
                       group _detalles by new { _detalles.IdProducto, _detalles.IdProductoNavigation.Nombre, _detalles.IdProductoNavigation.Descripcion } into g
                       select new { Producto = g.Key, total = g.Sum(x => x.Cantidad) }
                        );

    if (consultados != null)
    {
      respuesta.Ok = true;
      respuesta.Respuesta = consultados;
    }

    /*
    Listado de articulos mas vendidos en un periodo de tiempo
    parametros: '2022-05-09' // '2022-05-17'
    */

    return respuesta;
  }

  [HttpGet]
  [Route("[controller]/masRecaudacionUsuarios")]
  public RespuestaApi masRecaudacionUsuarios(DateTime param1, DateTime param2)
  {
    if (param1.Year < 2000 || param2.Year < 2000)
    {
      param1 = new DateTime(2020, 01, 01);
      param2 = new DateTime(3000, 12, 31);
    }


    var consultados = (from _detalles in bd.Detallepedidos
                       join _pedidos in bd.Pedidos on _detalles.NroPedido equals _pedidos.NroPedido
                       where _pedidos.Fecha >= param1 && _pedidos.Fecha <= param2
                       group _detalles by new { _pedidos.IdUsuario, _pedidos.IdUsuarioNavigation.Nombre, _pedidos.IdUsuarioNavigation.Apellido } into g
                       orderby g.Sum(x => x.Cantidad * x.Precio)
                       select new
                       {
                         Usuario = g.Key,
                         total = g.Sum(x => x.Cantidad * x.Precio),
                         cantidad = g.Select(x => x.NroPedido).Distinct().Count()
                       }
                        );

    if (consultados != null)
    {
      respuesta.Ok = true;
      respuesta.Respuesta = consultados;
    }

    /*
    -- Recaudacion de usuarios en un periodo de tiempo
    parametros: '2022-05-09' // '2022-05-17'
    */

    return respuesta;
  }

}
