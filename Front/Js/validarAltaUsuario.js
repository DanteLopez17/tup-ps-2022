function limpiarCampos(){
  $("#txtNombre").val("");
  $("#txtApellido").val("");
  $("#cboTipoDoc").val("Seleccione");
  $("#txtNumDoc").val("");
  const now = new Date();
  const dia = `0${now.getDate()}`.slice(-2);
  const mes = `0${now.getMonth() + 1}`.slice(-2);
  const hoy = `${now.getFullYear()}-${mes}-${dia}`;
  $('#dtpFecNac').val(hoy);
  $("#txtCuilCuit").val("");
  $("#rbtEstadoActivo").prop("checked", true);
}

function valAltaUsuario(){
  let nombre = $("#txtNombre").val();
  let apellido = $("#txtApellido").val();
  let tipoDoc = $("#cboTipoDoc").val();
  let numDoc = $("#txtNumDoc").val();
  let fecNac = $("#dtpFecNac").val();
  let cuilCuit = $("#txtCuilCuit").val();
  let mail = $("#txtEmail").val();
  let clave = $("#txtClave").val();
  let rol = $("#cboRol").val();
  let activo = $("#rbtEstadoActivo").prop("checked");

  if(nombre == "")
  {
    swal("Error", "ingrese un nombre", "error");
    return false;
  }
  if(apellido == "")
  {
    swal("Error", "ingrese un apellido", "error");
    return false;
  }
  if(tipoDoc == null || tipoDoc <= 0)
  {
    swal("Error", "seleccione un tipo de documento", "error");
    return false;
  }
  if(numDoc == "" || numDoc.lenght < 7 || numDoc < 6999999)
  {
    swal("Error", "ingrese un numero de documento valido", "error");
    return false;
  }
 /* if(fecNac >= Date.Today())
  {
    swal("Error", "ingrese una fecha valida", "error");
    return false;
  }*/
  if(cuilCuit == "" || cuilCuit.lenght < 10 || cuilCuit <= 10000000000)
  {
    swal("Error", "ingrese un cuit o cuil valido ", "error");
    return false;
  }
  if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(mail))
  {
    swal("Error", "ingrese un email valido ", "error");
    return false;
  }
  if(clave == null || clave == "" || clave.length < 4)
  {
    swal("Error", "la contraseña debe contener al menos 4 caracteres ", "error");
    return false;
  }
  if(rol == null || rol <= 0)
  {
    swal("Error", "seleccione un rol", "error");
    return false;
  }

  swal("Felicitaciones!", "Cliente cargado Correctamente!", "success");

  /*
  // si hay algún error no efectuamos la acción submit del form
    if(hasError) event.preventDefault();
  */

}