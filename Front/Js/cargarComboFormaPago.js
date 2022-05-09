$.ajax({
  url: 'https://localhost:5001/Pedido/formasPago',
  type: "GET",
  success: function (result) {
    if (result.ok) {
      let FormasPago = result.respuesta;
      for (var i = 0; i < FormasPago.length; i++) {
        let html = "<option value = '";
        html += FormasPago[i].idFormaPago + "'>";
        html += FormasPago[i].descripcion;
        html += "</option>";

        $("#cboFormaPago").append(html);
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