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
  function valAltaCliente(){
    let nombre = $("#txtNombre").val();
    let apellido = $("#txtApellido").val();
    let tipoDoc = $("#cboTipoDoc").val();
    let numDoc = $("#txtNumDoc").val();
    let fecNac = $("#dtpFecNac").val();
    let cuilCuit = $("#txtCuilCuit").val();
    let activo = $("#rbtEstadoActivo").prop("checked");
    let inactivo = $("#rbtEstadoInactivo").val();
  
    if(nombre == "")
    {
      swal("Error", "ingrese un nombre", "warning");
      return false;
    }
    if(apellido == "")
    {
      swal("Error", "ingrese un apellido", "warning");
      return false;
    }
    if(tipoDoc == null || tipoDoc <= 0)
    {
      swal("Error", "seleccione un tipo de documento", "warning");
      return false;
    }
    if(numDoc == "" || numDoc.lenght < 7 || numDoc < 6999999)
    {
      swal("Error", "ingrese un numero de documento valido", "warning");
      return false;
    }
    if(cuilCuit == "" || cuilCuit.lenght < 10 || cuilCuit <= 10000000000)
    {
      swal("Error", "ingrese un cuit o cuil valido ", "warning");
      return false;
    }
  
    swal("Felicitaciones!", "Cliente cargado Correctamente!", "success");
  
    /*
    // si hay algún error no efectuamos la acción submit del form
      if(hasError) event.preventDefault();
    */
  
  }

  if(valAltaCliente())
  { 
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
  }
  
})