using System;
using System.Collections.Generic;

#nullable disable

namespace lasomas.Models
{
  public partial class Estado
  {
    public Estado()
    {
      /*    Clientes = new HashSet<Cliente>();
          Productos = new HashSet<Producto>();
          Usuarios = new HashSet<Usuario>();*/
    }

    public int IdEstado { get; set; }
    public string Descripcion { get; set; }

    /*   public virtual ICollection<Cliente> Clientes { get; set; }
       public virtual ICollection<Producto> Productos { get; set; }
       public virtual ICollection<Usuario> Usuarios { get; set; }*/
  }
}
