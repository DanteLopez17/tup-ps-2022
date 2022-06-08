using lasomas.Comandos.DetallePedido;

namespace lasomas.Comandos.Transaccion;

public class ComandoTransaccionPedido
{
  //Cabecera
  public DateTime? Fecha { get; set; }
  public int? IdCliente { get; set; }
  public int? IdUsuario { get; set; }
  public int? IdFormaPago { get; set; }
  public int? IdEtapa { get; set; }
  //Detalle
  public List<ComandoAltaDetallePedido> listaDetalles { get; set; }

}
