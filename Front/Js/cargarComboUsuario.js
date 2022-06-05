$.ajax({
  url: 'https://localhost:5001/Usuario/listadoUsuarios',
  type: "GET",
  success: function (result) {
    if (result.ok) {
      let Usuarios = result.respuesta;
      for (var i = 0; i < Usuarios.length; i++) {
        if(Usuarios[i].idEstado == 2){
          continue;
        }
        let html = "<option value = '";
        html += Usuarios[i].idUsuario + "'>";
        html += Usuarios[i].apellido + " " +  Usuarios[i].nombre;
        html += "</option>";

        $("#cboUsuario").append(html);
      }
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
