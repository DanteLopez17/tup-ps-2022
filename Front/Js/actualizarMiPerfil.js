$("#btnCancPerfil").click(function(){
  swal({
    title: "Descartar cambios?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
     // window.location.replace("../Html/inicio.html");
      window.location.href = "javascript:history.go(-1);";
    } else {
    }
  });
})
$("#btnGuardarPerfil").click(function(){
  let id = $("#txtIdUsuario").val();
  let nom = $("#txtNombre").val();
  let ape = $("#txtApellido").val();
  let fecAl = $("#dtpFecNac").val();
  let tipDo = $("#cboTipoDoc").val();
  let nuDo = $("#txtNumDoc").val();

  let mail = $("#txtEmail").val();
  let clave = $("#txtClave").val();
  let ro = $("#cboRol").val();

  let usuario = {
    idUsuario: id,
    nombre: nom,
    apellido: ape,
    fechaNacimiento: fecAl,
    idTipoDoc: tipDo,
    numDoc: nuDo,
    email: mail,
    clave: clave,
    idRol: ro,
    idEstado: 1

  }
  swal({
    title: "Guardar cambios?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      $.ajax({
        url: 'https://localhost:5001/Usuario/actualizarUsuario',
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(usuario),
        success: function (result) {
          if (result.ok) {
            swal("Cambios guardados!", "", "success");
            
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
    } 
    else 
    {

    }
  });



})