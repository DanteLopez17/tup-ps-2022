$.ajax({
  url: 'https://localhost:5001/Producto/listadoProductos',
  type: "GET",
  success: function (result) {
    if (result.ok) {
      let productos = result.respuesta;
      for (var i = 0; i < productos.length; i++) {
        let html = "<tr>";
        html += "<td class='cpoCentro'>" + productos[i].descripcion + "</td>"
        html += "<td class='cpoIzquierda'>$" + productos[i].precio + "</td>"
        html += "<td class='cpoIzquierda'>" + productos[i].cantidad + "</td>"
        html += "<td class='cpoCentro'>" + productos[i].idClasificacionNavigation.descripcion + "</td>"
        html += "<td class='cpoCentro'>" + productos[i].idEstadoNavigation.descripcion + "</td>"
        html += "<td class='cpoCentro'><a href='modificarProducto.html?id=" + productos[i].idProducto + "'><i class='fa-solid fa-eye'></i></a></td>"
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