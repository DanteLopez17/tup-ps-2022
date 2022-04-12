using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace lasomas.Models
{
  public partial class Usuario
  {
    public Usuario()
    {
      // Pedidos = new HashSet<Pedido>();
    }

    public int IdUsuario { get; set; }
    public string Nombre { get; set; }
    public string Apellido { get; set; }
    public DateTime? FechaNacimiento { get; set; }
    public int? IdTipoDoc { get; set; }
    public int? NumDoc { get; set; }
    public string Email { get; set; }
    public string Clave { get; set; }
    public int? IdRol { get; set; }
    public int? IdEstado { get; set; }
    [ForeignKey("IdEstado")]
    public virtual Estado IdEstadoNavigation { get; set; }
    [ForeignKey("IdRol")]
    public virtual Rol IdRolNavigation { get; set; }
    [ForeignKey("IdTipoDoc")]
    public virtual Tipodocumento IdTipoDocNavigation { get; set; }
    // public virtual ICollection<Pedido> Pedidos { get; set; }
  }
}
