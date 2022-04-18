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
  url: 'https://localhost:5001/Cliente/' + data,
  type: "GET",
  success: function (result) {
    if (result.ok) {
      let Cliente = result.respuesta;
      $("#txtId").val(Cliente.idCliente);
      $("#txtNombre").val(Cliente.nombre);
      $("#txtApellido").val(Cliente.apellido);
      $("#cboTipoDoc").val(Cliente.idTipoDoc);
      $("#txtNumDoc").val(Cliente.numDoc);

      let fechaCorta = new Date(Cliente.fechaNacimiento).toISOString().split('T')[0] ;
      if(Cliente.idEstado == 1)
      {
        document.querySelector('#rbtEstadoActivo').checked = true;
      }
      else
      document.querySelector('#rbtEstadoInactivo').checked = true;

      $("#dtpFecNac").val(fechaCorta);
      $("#txtCuilCuit").val(Cliente.cuilCuit);

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