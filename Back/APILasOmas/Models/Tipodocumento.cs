using System;
using System.Collections.Generic;

#nullable disable

namespace lasomas.Models
{
  public partial class Tipodocumento
  {
    public Tipodocumento()
    {
      /* Clientes = new HashSet<Cliente>();
       Usuarios = new HashSet<Usuario>();*/
    }

    public int IdTipoDoc { get; set; }
    public string Descripcion { get; set; }

    /* public virtual ICollection<Cliente> Clientes { get; set; }
     public virtual ICollection<Usuario> Usuarios { get; set; }*/
  }
}
