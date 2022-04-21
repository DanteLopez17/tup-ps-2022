$.ajax({
  url: 'https://localhost:5001/Usuario/roles',
  type: "GET",
  success: function (result) {
    if (result.ok) {
      let Rols = result.respuesta;
      for (var i = 0; i < Rols.length; i++) {
        let html = "<option value = '";
        html += Rols[i].idRol + "'>";
        html += Rols[i].descripcion;
        html += "</option>";

        $("#cboRol").append(html);
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