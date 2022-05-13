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
        sessionStorage.setItem('rolActivo', rol);
        sessionStorage.setItem('UsuarioActivo', nomUsu + ' ' + apeUsu);

        if(rol == 1)
        {
          window.location.href = "../Html/quienesSomos.html";
        }
        else
        if(rol == 2)
        {
          window.location.href = "../Html/listadoProductos.html";
        }
        else
        {
          window.location.href = "../Html/inicio.html";
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
