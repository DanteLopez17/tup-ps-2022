const valores = window.location.search;

//Mostramos los valores en consola:
//console.log(valores);

//Resultado:
//?id=valorId

//Creamos la instancia
const urlParams = new URLSearchParams(valores);

//Accedemos a los valores
let data = urlParams.get('id');

$.ajax({
  url: 'https://localhost:5001/Usuario/' + data,
  type: "GET",
  success: function (result) {
    if (result.ok) {
      let Usuario = result.respuesta;
      $("#txtId").val(Usuario.idUsuario);
      $("#txtNombre").val(Usuario.nombre);
      $("#txtApellido").val(Usuario.apellido);

      let fechaCorta = new Date(Usuario.fechaNacimiento).toISOString().split('T')[0] ;
      $("#dtpFecNac").val(fechaCorta);
      $("#cboTipoDoc").val(Usuario.idTipoDoc);
      $("#txtNumDoc").val(Usuario.numDoc);
      $("#txtEmail").val(Usuario.email);
      $("#txtClave").val(Usuario.clave);
      $("#cboRol").val(Usuario.idRol);
      if(Usuario.idEstado == 1)
      {
        document.querySelector('#rbtEstadoActivo').checked = true;
      }
      else
      document.querySelector('#rbtEstadoInactivo').checked = true;

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