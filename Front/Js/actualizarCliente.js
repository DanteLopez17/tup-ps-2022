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

  /*
{
  "id": 2,
  "nombre": "Pedro",
  "apellido": "Lopez",
  "tipoDni": 1,
  "numDoc": 12345678,
  "fechaNac": "2000-04-18T14:58:10.144Z",
  "cuitCuil": "20123456782",
  "estado": 1
}
  */

  $.ajax({
    url: 'https://localhost:5001/Cliente/actualizarCliente',
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(client),
    success: function (result) {
      if (result.ok) {
        swal("Felicitaciones!", "Cliente actualizado Correctamente!", "success");
        setTimeout(function(){
          window.location.replace("../Html/listadoClientes.html");
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