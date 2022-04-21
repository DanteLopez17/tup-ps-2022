namespace lasomas.Comandos;

public class ComandoAltaCliente
{
  public string Nombre { get; set; }
  public string Apellido { get; set; }
  public DateTime? FechaNacimiento { get; set; }
  public int? IdTipoDoc { get; set; }
  public int? NumDoc { get; set; }
  public string CuilCuit { get; set; }
  public int? IdEstado { get; set; }
}
