﻿using System;
using System.Collections.Generic;

#nullable disable

namespace lasomas.Models
{
  public partial class Rol
  {
    public Rol()
    {
      //  Usuarios = new HashSet<Usuario>();
    }

    public int IdRol { get; set; }
    public string Descripcion { get; set; }

    // public virtual ICollection<Usuario> Usuarios { get; set; }
  }
}
