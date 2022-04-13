function limpiarCampos(){
  $("#txtNombre").val("");
  $("#txtApellido").val("");
  $("#cboTipoDoc").val(1);
  $("#txtNumDoc").val("");
  const now = new Date();
  const dia = `0${now.getDate()}`.slice(-2);
  const mes = `0${now.getMonth() + 1}`.slice(-2);
  const hoy = `${now.getFullYear()}-${mes}-${dia}`;
  $('#dtpFecNac').val(hoy);
  $("#txtCuilCuit").val("");
  $("#rbtEstadoActivo").prop("checked", true);
}

$("#btnCargarCliente").click(function () {
  let nom = $("#txtNombre").val();
  let ape = $("#txtApellido").val();
  let fecna = $("#dtpFecNac").val();
  let idTipDoc = $("#cboTipoDoc").val();
  let nuDoc = $("#txtNumDoc").val();
  let cucu = $("#txtCuilCuit").val();
  let idEst = $('input[name=gridRadios]:checked', '#miForm').val();

  let client = {
    nombre: nom,
    apellido: ape,
    fechaNacimiento: fecna,
    idTipoDoc: idTipDoc,
    numDoc: nuDoc,
    cuilCuit: cucu,
    idEstado: idEst
  }

  $.ajax({
    url: 'https://localhost:5001/Cliente/cargarCliente',
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(client),
    success: function (result) {
      if (result.ok) {
        swal("Felicitaciones!", "Cliente cargado Correctamente!", "success");
        limpiarCampos();
      }
      else
        swal({
          title: "Error",
          text: result.error,
          icon: "error",
        })
    },
    error: function (result) {
      swal({
        title: "Error",
        text: result.error,
        icon: "error",
      })
    }
  });
})