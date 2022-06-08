$("#btnLogin").click(function(){

  let mail = $("#txtEmail").val();
  let pass = $("#txtClave").val();
  
  let usuario = {
    email: mail,
    clave: pass
  }

  $.ajax({
    url: 'https://localhost:5001/Usuario/Login',
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(usuario),
    success: function (result) {
      if (result.ok) {
        let usu = result.respuesta;
        let rol = usu.idRol;
        let nomUsu = usu.nombre;
        let apeUsu = usu.apellido;
        let idUsu = usu.idUsuario;
        sessionStorage.setItem('rolActivo', rol);
        sessionStorage.setItem('UsuarioActivo', nomUsu + ' ' + apeUsu);
        sessionStorage.setItem('IdUsuarioActivo', idUsu);

        if(rol == 1 || rol == 2)
        {
          window.location.href = "../Html/inicio.html";
        }
        else
        {
          window.location.href = "../Html/login.html";
        }
      }
      else
        swal({
          title: "Error",
          text: result.error,
          icon: "warning",
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
