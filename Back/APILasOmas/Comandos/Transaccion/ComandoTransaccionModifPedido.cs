using lasomas.Comandos.DetallePedido;

namespace lasomas.Comandos.Transaccion;

public class ComandoTransaccionModifPedido
{
  //Cabecera
  public DateTime? Fecha { get; set; }
  public int? IdEtapa { get; set; }
  public int? NroPedido { get; set; }

  //Detalle
  public List<ComandoAltaDetallePedido> listaDetalles { get; set; }

}
