$.ajax({
  url: 'https://localhost:5001/Producto/listadoProductos',
  type: "GET",
  success: function (result) {
    if (result.ok) {
      let productos = result.respuesta;
      for (var i = 0; i < productos.length; i++) {
        let html = "<tr>";
        html += "<td>" + productos[i].nombre + "</td>"
        html += "<td>" + productos[i].descripcion + "</td>"
        html += "<td>$" + productos[i].precio + "</td>"
        html += "<td>" + productos[i].cantidad + "</td>"
        html += "<td>" + productos[i].idClasificacionNavigation.descripcion + "</td>"
        html += "<td>" + productos[i].idEstadoNavigation.descripcion + "</td>"
        html += "<td><a href='modificarProducto.html?id=" + productos[i].idProducto + "'>Modificar</a></td>"
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