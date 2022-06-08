function validar() {
  let exprReg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
  let correo = $("#txtEmail");
  let clave = $("#txtClave");
  if (correo.val() == "" || !exprReg.test(correo.val())) {
    swal("Error", "ingrese un email valido", "warning");
    correo.focus();
    return false;
  }
  if(clave.val() == ""){
    swal("Error", "ingrese una contraseña", "warning");
  }
}
