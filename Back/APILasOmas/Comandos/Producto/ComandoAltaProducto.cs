namespace lasomas.Comandos.Producto;

public class ComandoAltaProducto
{
  public string Descripcion { get; set; }
  public decimal? Precio { get; set; }
  public int? Cantidad { get; set; }
  public int? IdClasificacion { get; set; }
  public int? IdEstado { get; set; }

  public DateTime Fecha { get; set; }
  public string Observaciones { get; set; }
}
