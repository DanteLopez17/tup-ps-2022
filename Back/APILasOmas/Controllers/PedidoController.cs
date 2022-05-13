using System.Security.Cryptography;
using lasomas.Comandos.DetallePedido;
using lasomas.Comandos.Pedido;
using lasomas.Models;
using lasomas.Respuestas;
using Microsoft.AspNetCore.Mvc;

namespace lasomas.Controllers;

[ApiController]
public class PedidoController : ControllerBase
{
  lasomasContext bd = new lasomasContext();
  RespuestaApi respuesta = new RespuestaApi();
  private readonly ILogger<PedidoController> _logger;

  public PedidoController(ILogger<PedidoController> logger)
  {
    _logger = logger;
  }

  [HttpGet]
  [Route("[controller]/formasPago")]
  public RespuestaApi getFormasPago()
  {
    respuesta.Ok = true;
    respuesta.Respuesta = bd.Formapagos.ToList();
    return respuesta;
  }

  [HttpGet]
  [Route("[controller]/etapas")]
  public RespuestaApi getEtapas()
  {
    respuesta.Ok = true;
    respuesta.Respuesta = bd.Etapas.ToList();
    return respuesta;
  }

  [HttpPost]
  [Route("[controller]/cargarCabecera")]
  public RespuestaApi cargarCabecera([FromBody] ComandoAltaPedido pedi)
  {
    if (pedi.Fecha > DateTime.Today)
    {
      respuesta.Ok = false;
      respuesta.Error = "Fecha incorrecta";
      return respuesta;
    }
    if (pedi.IdCliente == null || pedi.IdCliente < 0)
    {
      respuesta.Ok = false;
      respuesta.Error = "Id Cliente incorrecto";
      return respuesta;
    }
    if (pedi.IdUsuario == null || pedi.IdUsuario < 0)
    {
      respuesta.Ok = false;
      respuesta.Error = "Id Usuario incorrecto";
      return respuesta;
    }
    if (pedi.IdFormaPago == null || pedi.IdFormaPago < 0)
    {
      respuesta.Ok = false;
      respuesta.Error = "Id Forma Pago incorrecto";
      return respuesta;
    }
    if (pedi.IdEtapa == null || pedi.IdEtapa < 0)
    {
      respuesta.Ok = false;
      respuesta.Error = "Id Etapa incorrecto";
      return respuesta;
    }

    Pedido p = new Pedido
    {
      Fecha = pedi.Fecha,
      IdCliente = pedi.IdCliente,
      IdUsuario = pedi.IdUsuario,
      IdFormaPago = pedi.IdFormaPago,
      IdEtapa = pedi.IdEtapa
    };

    bd.Pedidos.Add(p);
    bd.SaveChanges();
    respuesta.Ok = true;
    respuesta.Respuesta = p;

    return respuesta;
  }

  [HttpPost]
  [Route("[controller]/cargarDetalle")]
  public RespuestaApi cargarDetalle([FromBody] List<ComandoAltaDetallePedido> detaPed)
  {
    List<Detallepedido> detalles = new List<Detallepedido>();

    foreach (var detalle in detaPed)
    {
      int nroPedi = detalle.NroPedido;
      int idProdu = detalle.IdProducto;
      int canti = detalle.Cantidad;
      decimal pre = detalle.Precio;

      Detallepedido deta = new Detallepedido
      {
        NroPedido = nroPedi,
        IdProducto = idProdu,
        Cantidad = canti,
        Precio = pre
      };
      detalles.Add(deta);
    }

    respuesta.Ok = false;
    if (detalles != null)
    {
      respuesta.Ok = true;
    }

    bd.Detallepedidos.AddRange(detalles);
    bd.SaveChanges();
    respuesta.Respuesta = detalles;
    return respuesta;
  }

  [HttpGet]
  [Route("[controller]/listadoPedidos")]
  public RespuestaApi listadoPedidos()
  {
    respuesta.Ok = true;
    List<Pedido> pedidos = bd.Pedidos.ToList();
    List<Cliente> clientes = bd.Clientes.ToList();
    List<Etapa> etapas = bd.Etapas.ToList();
    List<Formapago> formaspago = bd.Formapagos.ToList();
    List<Usuario> usuarios = bd.Usuarios.ToList();


    List<Pedido> otraLista = new List<Pedido>();
    foreach (Pedido p in pedidos)
    {
      bd.Entry(p).Reference(x => x.IdClienteNavigation).Load();
      bd.Entry(p).Reference(x => x.IdEtapaNavigation).Load();
      bd.Entry(p).Reference(x => x.IdFormaPagoNavigation).Load();
      bd.Entry(p).Reference(x => x.IdUsuarioNavigation).Load();

      otraLista.Add(p);
    }
    respuesta.Respuesta = otraLista;
    return respuesta;
  }

}