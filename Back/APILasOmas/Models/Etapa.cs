using System;
using System.Collections.Generic;

#nullable disable

namespace lasomas.Models
{
  public partial class Etapa
  {
    public Etapa()
    {
      //    Pedidos = new HashSet<Pedido>();
    }

    public int IdEtapa { get; set; }
    public string Descripcion { get; set; }

    // public virtual ICollection<Pedido> Pedidos { get; set; }
  }
}
