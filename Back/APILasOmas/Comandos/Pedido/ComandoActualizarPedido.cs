namespace lasomas.Comandos.Pedido;

public class ComandoActualizarPedido
{
  public int NroPedido { get; set; }
  public DateTime? Fecha { get; set; }
  public int? IdCliente { get; set; }
  public int? IdUsuario { get; set; }
  public int? IdFormaPago { get; set; }
  public int? IdEtapa { get; set; }
}
