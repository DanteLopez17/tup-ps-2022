$("#btnModificarUsuario").click(function () {
  let idCli = $("#txtId").val();
  let nom = $("#txtNombre").val();
  let ape = $("#txtApellido").val();
  let fecna = $("#dtpFecNac").val();
  let idTipDoc = $("#cboTipoDoc").val();
  let nuDoc = $("#txtNumDoc").val();
  let mail = $("#txtEmail").val();
  let cla = $("#txtClave").val();
  let cbrol = $("#cboRol").val();

  let idEst = $('input[name=gridRadios]:checked', '#miForm').val();

  let usua = {
    idUsuario : idCli,
    nombre: nom,
    apellido: ape,
    fechaNacimiento :fecna,
    idTipoDoc : idTipDoc,
    numDoc: nuDoc,
    email: mail,
    clave: cla,
    idRol: cbrol,
    idEstado: idEst
  }

  $.ajax({
    url: 'https://localhost:5001/Usuario/actualizarUsuario',
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(usua),
    success: function (result) {
      if (result.ok) {
        swal("Felicitaciones!", "Usuario actualizado Correctamente!", "success");
        setTimeout(function(){
          window.location.replace("../Html/listadoUsuarios.html");
      }, 4000);
        
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