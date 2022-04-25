$.ajax({
  url: 'https://localhost:5001/Producto/clasificacion',
  type: "GET",
  success: function (result) {
    if (result.ok) {
      let Clasificacions = result.respuesta;
      for (var i = 0; i < Clasificacions.length; i++) {
        let html = "<option value = '";
        html += Clasificacions[i].idClasificacion + "'>";
        html += Clasificacions[i].descripcion;
        html += "</option>";

        $("#cboClasificacion").append(html);
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