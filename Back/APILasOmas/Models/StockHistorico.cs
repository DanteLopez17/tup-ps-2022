namespace lasomas.Models;

public partial class StockHistorico
{
  public StockHistorico()
  {

  }
  public int Id { get; set; }
  public DateTime? Fecha { get; set; }
  public int IdProducto { get; set; }
  public decimal? Precio { get; set; }
  public int? Cantidad { get; set; }
  public string Observaciones { get; set; }

}
