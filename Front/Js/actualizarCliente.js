$("#btnModificarCliente").click(function () {
  let idCli = $("#txtId").val();
  let nom = $("#txtNombre").val();
  let ape = $("#txtApellido").val();
  let fecna = $("#dtpFecNac").val();
  let idTipDoc = $("#cboTipoDoc").val();
  let nuDoc = $("#txtNumDoc").val();
  let cucu = $("#txtCuilCuit").val();
  let idEst = $('input[name=gridRadios]:checked', '#miForm').val();

  let client = {
    id : idCli,
    nombre: nom,
    apellido: ape,
    tipoDni: idTipDoc,
    numDoc: nuDoc,
    fechaNac: fecna,
    cuitCuil: cucu,
    estado: idEst
  }

  $.ajax({
    url: 'https://localhost:5001/Cliente/actualizarCliente',
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(client),
    success: function (result) {
      if (result.ok) {
      swal("Felicitaciones!", "Cliente actualizado Correctamente!", "success").then((confirmar) => {
        if (confirmar) {
          window.location.replace("../Html/listadoClientes.html");
        }
      });
        
      }
      else
        swal({
          title: "Errors",
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
$("#btnCancelarCargaCliente").click(function () {
  swal({
    title: "Desea cancelar la modificación?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      window.location.replace("../Html/listadoClientes.html");
    } else {
    }
  });
})