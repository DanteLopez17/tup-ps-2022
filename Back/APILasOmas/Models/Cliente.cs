using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace lasomas.Models
{
  public partial class Cliente
  {
    public Cliente()
    {
      //   Pedidos = new HashSet<Pedido>();
    }

    public int IdCliente { get; set; }
    public string Nombre { get; set; }
    public string Apellido { get; set; }
    public DateTime? FechaNacimiento { get; set; }
    public int? IdTipoDoc { get; set; }
    public int? NumDoc { get; set; }
    public string CuilCuit { get; set; }
    public int? IdEstado { get; set; }
    [ForeignKey("IdEstado")]
    public virtual Estado IdEstadoNavigation { get; set; }
    [ForeignKey("IdTipoDoc")]
    public virtual Tipodocumento IdTipoDocNavigation { get; set; }
    // public virtual ICollection<Pedido> Pedidos { get; set; }
  }
}
