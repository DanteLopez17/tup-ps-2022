let idUs = sessionStorage.getItem("IdUsuarioActivo");
$.ajax({
  url: 'https://localhost:5001/Usuario/' + idUs,
  type: "GET",
  success: function (result) {
    if (result.ok) {
      let Usuario = result.respuesta;
      $("#txtIdUsuario").val(Usuario.idUsuario);
      $("#txtNombre").val(Usuario.nombre);
      $("#txtApellido").val(Usuario.apellido);
      $("#cboTipoDoc").val(Usuario.idTipoDoc);
      $("#txtNumDoc").val(Usuario.numDoc);
      let fechaCorta = new Date(Usuario.fechaNacimiento).toISOString().split('T')[0] ;
      $("#dtpFecNac").val(fechaCorta);
      $("#cboRol").val(Usuario.idRol);
      $("#txtEmail").val(Usuario.email);
      $("#txtClave").val(Usuario.clave);

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