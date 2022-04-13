using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace lasomas.Models
{
  public partial class Detallepedido
  {
    public int IdDetallePedido { get; set; }
    public int? NroPedido { get; set; }
    public int? IdProducto { get; set; }
    public int? Cantidad { get; set; }
    public decimal? Precio { get; set; }
    [ForeignKey("IdProducto")]
    public virtual Producto IdProductoNavigation { get; set; }
    [ForeignKey("nroPedido")]
    public virtual Pedido NroPedidoNavigation { get; set; }
  }
}
