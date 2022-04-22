namespace lasomas.Comandos.Usuario;

public class ComandoUsuarioActualizar
{
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
}
