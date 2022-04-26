$("#btnModificarUsuario").click(function () {
  function valAltaUsuario(){
    let nom = $("#txtNombre").val();
    let ape = $("#txtApellido").val();
    let fecna = $("#dtpFecNac").val();
    let idTipDoc = $("#cboTipoDoc").val();
    let nuDoc = $("#txtNumDoc").val();
    let mail = $("#txtEmail").val();
    let cla = $("#txtClave").val();
    let cbrol = $("#cboRol").val();
  
    if(nom == "")
    {
      swal("Error", "ingrese un nombre", "warning");
      return false;
    }
    if(ape == "")
    {
      swal("Error", "ingrese un apellido", "warning");
      return false;
    }
    if(idTipDoc == null || idTipDoc <= 0)
    {
      swal("Error", "seleccione un tipo de documento", "warning");
      return false;
    }
    if(nuDoc == "" || nuDoc.lenght < 7 || nuDoc < 6999999)
    {
      swal("Error", "ingrese un numero de documento valido", "warning");
      return false;
    }
   /* if(fecna >= Date.Today())
    {
      swal("Error", "ingrese una fecha valida", "error");
      return false;
    }

    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(mail))
    {
      swal("Error", "ingrese un email valido ", "error");
      return false;
    }*/
    if(cla == null || cla == "" || cla.length < 4)
    {
      swal("Error", "la contraseña debe contener al menos 4 caracteres ", "error");
      return false;
    }

    if(cbrol == null || cbrol <= 0)
    {
      swal("Error", "seleccione un rol", "error");
      return false;
    }
  
  }
  if(valAltaUsuario())
  {
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
  }
  
})