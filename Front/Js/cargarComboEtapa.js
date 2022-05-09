$.ajax({
  url: 'https://localhost:5001/Pedido/etapas',
  type: "GET",
  success: function (result) {
    if (result.ok) {
      let Etapas = result.respuesta;
      for (var i = 0; i < Etapas.length; i++) {
        let html = "<option value = '";
        html += Etapas[i].idEtapa + "'>";
        html += Etapas[i].descripcion;
        html += "</option>";

        $("#cboEtapa").append(html);
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