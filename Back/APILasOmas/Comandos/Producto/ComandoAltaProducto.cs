namespace lasomas.Comandos.Producto;

public class ComandoAltaProducto
{
  public string Nombre { get; set; }
  public string Descripcion { get; set; }
  public decimal? Precio { get; set; }
  public int? Cantidad { get; set; }
  public int? IdClasificacion { get; set; }
  public int? IdEstado { get; set; }
}
