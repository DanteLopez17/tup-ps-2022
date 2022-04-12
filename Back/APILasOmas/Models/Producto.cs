using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace lasomas.Models
{
  public partial class Producto
  {
    public Producto()
    {
      // Detallepedidos = new HashSet<Detallepedido>();
    }

    public int IdProducto { get; set; }
    public string Nombre { get; set; }
    public string Descripcion { get; set; }
    public decimal? Precio { get; set; }
    public int? Cantidad { get; set; }
    public int? IdClasificacion { get; set; }
    public int? IdEstado { get; set; }
    [ForeignKey("IdClasificacion")]
    public virtual Clasificacion IdClasificacionNavigation { get; set; }
    [ForeignKey("IdEstado")]
    public virtual Estado IdEstadoNavigation { get; set; }
    //  public virtual ICollection<Detallepedido> Detallepedidos { get; set; }
  }
}
