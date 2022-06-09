$.ajax({
  url: 'https://localhost:5001/Producto/stockHistorico',
  type: "GET",
  success: function (result) {
    if (result.ok) {
      let productos = result.respuesta;
      for (var i = 0; i < productos.length; i++) {
        let html = "<tr>";
        let fecha = new Date(productos[i].fecha);
        
        const formatDate = (fecha)=>{
        let formatted_date = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()
        return formatted_date;
        }

        html += "<td class='cpoCentro'>" + formatDate(fecha) + "</td>"
        html += "<td class='cpoCentro'>" + productos[i].descripcion + "</td>"
        html += "<td class='cpoIzquierda'>$" + productos[i].precio + "</td>"
        html += "<td class='cpoIzquierda'>" + productos[i].cantidad + "</td>"
        html += "<td class='cpoCentro'>" + productos[i].observaciones+ "</td>"
        html += "</tr>";

        $("#listProdu").append(html);
      }
    }

    else
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: result.error
      })
  },
  error: function (result) {

  }
});