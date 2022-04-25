using System;
using System.Collections.Generic;

#nullable disable

namespace lasomas.Models
{
  public partial class Clasificacion
  {
    public Clasificacion()
    {
      //     Productos = new HashSet<Producto>(
    }

    public int IdClasificacion { get; set; }
    public string Descripcion { get; set; }

    //  public virtual ICollection<Producto> Productos { get; set; }
  }
}
