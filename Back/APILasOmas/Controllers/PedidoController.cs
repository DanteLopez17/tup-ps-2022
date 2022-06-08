using System.Data.Common;
using System.Threading;
using System.Security.Cryptography;
using lasomas.Comandos.DetallePedido;
using lasomas.Comandos.Pedido;
using lasomas.Models;
using lasomas.Respuestas;
using Microsoft.AspNetCore.Mvc;
using lasomas.Comandos.Transaccion;

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
      // int nroPedi = detalle.NroPedido;
      int idProdu = detalle.IdProducto;
      int canti = detalle.Cantidad;
      decimal pre = detalle.Precio;

      Detallepedido deta = new Detallepedido
      {
        //    NroPedido = nroPedi,
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
    respuesta.Respuesta = otraLista.OrderBy(x => x.NroPedido).Reverse();
    return respuesta;
  }

  [HttpGet]
  [Route("[controller]/{id}")]
  public RespuestaApi getDetallesxId(int id)
  {
    RespuestaApi respuesta = new RespuestaApi();
    List<Detallepedido> detallesp = bd.Detallepedidos.Where(x => x.NroPedido == id).ToList();

    List<Detallepedido> otraLista = new List<Detallepedido>();
    foreach (Detallepedido dp in detallesp)
    {
      bd.Entry(dp).Reference(x => x.IdProductoNavigation).Load();
      bd.Entry(dp).Reference(x => x.NroPedidoNavigation).Load();

      otraLista.Add(dp);
    }
    if (otraLista != null)
    {
      respuesta.Ok = true;
      respuesta.Respuesta = otraLista;
    }


    return respuesta;
  }
  [HttpGet]
  [Route("[controller]Xid/{id}")]
  public RespuestaApi getPedidoxId(int id)
  {
    RespuestaApi respuesta = new RespuestaApi();
    List<Pedido> pedidos = bd.Pedidos.Where(x => x.NroPedido == id).ToList();

    List<Pedido> otraLista = new List<Pedido>();
    foreach (Pedido p in pedidos)
    {
      bd.Entry(p).Reference(x => x.IdClienteNavigation).Load();
      bd.Entry(p).Reference(x => x.IdEtapaNavigation).Load();
      bd.Entry(p).Reference(x => x.IdFormaPagoNavigation).Load();
      bd.Entry(p).Reference(x => x.IdUsuarioNavigation).Load();

      otraLista.Add(p);
    }
    if (otraLista != null)
    {
      respuesta.Ok = true;
      respuesta.Respuesta = otraLista;
    }


    return respuesta;
  }

  [HttpPost]
  [Route("[controller]/modificarPedido")]
  public RespuestaApi modificarPedido([FromBody] ComandoActualizarPedido Ped)
  {
    RespuestaApi respuesta = new RespuestaApi();

    Pedido p = bd.Pedidos.Where(x => x.NroPedido == Ped.NroPedido).FirstOrDefault();

    if (p != null)
    {
      p.IdEtapa = Ped.IdEtapa;
      bd.Update(p);
      bd.SaveChanges();
    }

    respuesta.Ok = p != null;
    respuesta.infoAdicional = p != null ? string.Empty : "No existe el pedido con ese Id";

    return respuesta;
  }

  [HttpPost]
  [Route("[controller]/transaccionAltaPedido")]
  public RespuestaApi transaccionAltaPedido([FromBody] ComandoTransaccionPedido transac)
  {
    using var transaction = bd.Database.BeginTransaction();

    try
    {
      //Obtener datos de Cabecera
      //Validaciones
      if (transac.IdCliente == null || transac.IdCliente < 0)
      {
        respuesta.Ok = false;
        respuesta.Error = "Id Cliente incorrecto";
      }
      if (transac.IdUsuario == null || transac.IdUsuario < 0)
      {
        respuesta.Ok = false;
        respuesta.Error = "Id Usuario incorrecto";
      }
      if (transac.IdFormaPago == null || transac.IdFormaPago < 0)
      {
        respuesta.Ok = false;
        respuesta.Error = "Id Forma Pago incorrecto";
      }
      if (transac.IdEtapa == null || transac.IdEtapa < 0)
      {
        respuesta.Ok = false;
        respuesta.Error = "Id Etapa incorrecto";
      }

      Pedido p = new Pedido
      {
        Fecha = transac.Fecha,
        IdCliente = transac.IdCliente,
        IdUsuario = transac.IdUsuario,
        IdFormaPago = transac.IdFormaPago,
        IdEtapa = transac.IdEtapa
      };
      bd.Pedidos.Add(p);
      bd.SaveChanges();
      int valNroPedido = p.NroPedido.Value;
      //Obtener datos del listado de detalles
      List<Detallepedido> detalles = new List<Detallepedido>();
      if (transac.listaDetalles != null)
      {
        foreach (var detalle in transac.listaDetalles)
        {
          int nroPedi = valNroPedido;
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
        if (detalles != null)
        {
          respuesta.Ok = true;
          bd.Detallepedidos.AddRange(detalles);
          bd.SaveChanges();
          //Probablemente debar ir despues del else el addRange y el savechanges
        }
        else
        {
          respuesta.Ok = false;
          respuesta.infoAdicional = "La nva Lista de detalles esta vacia o es nula";
        }
      }
      else
      {
        respuesta.Ok = false;
        respuesta.infoAdicional = "La lista de detalles esta vacio o es nula";
      }

      //Modificar El Stock de la tabla productos y asentar en la tabla StockHistorico
      //Campos Necesarios
      //Producto: Cantidad e ID
      foreach (var detalle in transac.listaDetalles)
      {
        int idProdu = detalle.IdProducto;
        int canti = detalle.Cantidad;

        Producto pro = bd.Productos.Where(x => x.IdProducto == idProdu).FirstOrDefault();
        pro.Cantidad -= canti;

        if (pro.Cantidad < 0)
        {
          respuesta.Ok = false;
          respuesta.infoAdicional = "Cantidad Ingresada mayor al stock actual del id: " + idProdu;
          break;
        }
        else
        {
          respuesta.Ok = true;
          bd.Update(pro);
          bd.SaveChanges();
        }
      }

      //StockHistorico
      //Campos necesarios: fecha, idProducto, precio, cantidad, observaciones
      //Recorrer Listado
      foreach (var detalle in transac.listaDetalles)
      {
        StockHistorico sh = new StockHistorico
        {
          Fecha = transac.Fecha,
          IdProducto = detalle.IdProducto,
          Precio = detalle.Precio,
          Cantidad = detalle.Cantidad,
          Observaciones = "Se asigno al Pedido N°: " + valNroPedido
        };
        bd.StockHistoricos.Add(sh);
        bd.SaveChanges();
      }
      if (!respuesta.Ok)
      {
        transaction.Rollback();
        respuesta.Error = "Algo ha fallado se hace el RollBack";

      }
      else
      {
        transaction.Commit();
        respuesta.Error = "Transaccion finalizada con Exito";
        respuesta.Respuesta = transac;

      }
    }
    catch (Exception)
    {
      respuesta.Ok = false;
      respuesta.Error = "Excepción";
    }


    return respuesta;
  }

  [HttpPost]
  [Route("[controller]/transaccionModificarPedido")]
  public RespuestaApi transaccionModificarPedido([FromBody] ComandoTransaccionModifPedido transacCancel)
  {
    using var transaction = bd.Database.BeginTransaction();

    try
    {
      //Productos
      List<Producto> productos = new List<Producto>();
      if (transacCancel.listaDetalles != null)
      {
        foreach (var producto in transacCancel.listaDetalles)
        {
          int idProdu = producto.IdProducto;
          int canti = producto.Cantidad;

          Producto pro = bd.Productos.Where(x => x.IdProducto == idProdu).FirstOrDefault();
          pro.Cantidad += canti;

          productos.Add(pro);
        }
        if (productos != null)
        {
          respuesta.Ok = true;
          bd.Productos.UpdateRange(productos);
          bd.SaveChanges();
        }
        else
        {
          respuesta.Ok = false;
          respuesta.infoAdicional = "La nva Lista de detalles esta vacia o es nula";
        }

        //Stock Historico
        foreach (var detalle in transacCancel.listaDetalles)
        {
          StockHistorico sh = new StockHistorico
          {
            Fecha = transacCancel.Fecha,
            IdProducto = detalle.IdProducto,
            Precio = detalle.Precio,
            Cantidad = detalle.Cantidad,
            Observaciones = "Se cancelo el pedido N°: " + transacCancel.NroPedido
          };
          bd.StockHistoricos.Add(sh);
          bd.SaveChanges();
        }
      }
      else
      {
        respuesta.Ok = false;
        respuesta.infoAdicional = "La lista de detalles esta vacio o es nula";
      }
      //Pedido
      //Validaciones
      if (transacCancel.IdEtapa == null || transacCancel.IdEtapa < 0)
      {
        respuesta.Ok = false;
        respuesta.Error = "Id Etapa incorrecto";
      }

      Pedido p = bd.Pedidos.Where(x => x.NroPedido == transacCancel.NroPedido).FirstOrDefault();
      p.IdEtapa = transacCancel.IdEtapa;

      if (p != null)
      {
        respuesta.Ok = true;
        bd.Pedidos.Update(p);
        bd.SaveChanges();
      }
      else
      {
        respuesta.Ok = false;
        respuesta.infoAdicional = "No existe el Pedido N°: " + transacCancel.NroPedido;
      }


      if (!respuesta.Ok)
      {
        transaction.Rollback();
        respuesta.Error = "Algo ha fallado se hace el RollBack";

      }
      else
      {
        transaction.Commit();
        respuesta.Error = "Transaccion finalizada con Exito";
        respuesta.Respuesta = transacCancel;
      }
    }
    catch (System.Exception)
    {
      respuesta.Ok = false;
      respuesta.Error = "Excepción";
      throw;
    }
    return respuesta;
  }

}