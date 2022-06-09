namespace lasomas.Models;

public class HistoricoProducto
{
  public int Id { get; set; }
  public DateTime? Fecha { get; set; }
  public int IdProducto { get; set; }
  public string Descripcion { get; set; }

  public decimal? Precio { get; set; }
  public int? Cantidad { get; set; }
  public string Observaciones { get; set; }
}
