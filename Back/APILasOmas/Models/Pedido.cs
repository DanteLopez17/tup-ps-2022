using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace lasomas.Models
{
  public partial class Pedido
  {
    public Pedido()
    {
      // Detallepedidos = new HashSet<Detallepedido>();
    }

    public int NroPedido { get; set; }
    public DateTime? Fecha { get; set; }
    public int? IdCliente { get; set; }
    public int? IdUsuario { get; set; }
    public int? IdFormaPago { get; set; }
    public int? IdEtapa { get; set; }
    [ForeignKey("IdCliente")]
    public virtual Cliente IdClienteNavigation { get; set; }
    [ForeignKey("IdEtapa")]
    public virtual Etapa IdEtapaNavigation { get; set; }
    [ForeignKey("IdFormaPago")]
    public virtual Formapago IdFormaPagoNavigation { get; set; }
    [ForeignKey("IdUsuario")]
    public virtual Usuario IdUsuarioNavigation { get; set; }
    //  public virtual ICollection<Detallepedido> Detallepedidos { get; set; }
  }
}
