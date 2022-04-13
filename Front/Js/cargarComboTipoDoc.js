$.ajax({
  url: 'https://localhost:5001/Cliente/tiposDocumento',
  type: "GET",
  success: function (result) {
    if (result.ok) {
      let Tipodocumentos = result.respuesta;
      for (var i = 0; i < Tipodocumentos.length; i++) {
        let html = "<option value = '";
        html += Tipodocumentos[i].idTipoDoc + "'>";
        html += Tipodocumentos[i].descripcion;
        html += "</option>";

        $("#cboTipoDoc").append(html);
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