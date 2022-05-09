$.ajax({
  url: 'https://localhost:5001/Producto/listadoProductos',
  type: "GET",
  success: function (result) {
    if (result.ok) {
      let Productos = result.respuesta;
      for (var i = 0; i < Productos.length; i++) {
        let html = "<option value = '";
        html += Productos[i].idProducto + "'>";
        html += Productos[i].nombre;
        html += "</option>";

        $("#cboProducto").append(html);
      }
    }

    else
      swal({
        title: "Error",
        text: result.error,
        icon: "error",
      })
  },
  error: function (result) {

  }
});