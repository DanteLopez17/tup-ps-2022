using System;
using System.Collections.Generic;

#nullable disable

namespace lasomas.Models
{
  public partial class Formapago
  {
    public Formapago()
    {
      //    Pedidos = new HashSet<Pedido>();
    }

    public int IdFormaPago { get; set; }
    public string Descripcion { get; set; }

    // public virtual ICollection<Pedido> Pedidos { get; set; }
  }
}
