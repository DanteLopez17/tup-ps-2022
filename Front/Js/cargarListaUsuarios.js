$.ajax({
  url: 'https://localhost:5001/Usuario/listadoUsuarios',
  type: "GET",
  success: function (result) {
    if (result.ok) {
      let usuarios = result.respuesta;
      for (var i = 0; i < usuarios.length; i++) {
        let html = "<tr>";
        html += "<td>" + usuarios[i].nombre + "</td>"
        html += "<td>" + usuarios[i].apellido + "</td>"
        html += "<td>" + usuarios[i].fechaNacimiento + "</td>"
        html += "<td>" + usuarios[i].idTipoDocNavigation.descripcion + "</td>"
        html += "<td>" + usuarios[i].numDoc + "</td>"
        html += "<td>" + usuarios[i].email + "</td>"
        html += "<td>" + usuarios[i].idRolNavigation.descripcion + "</td>"
        html += "<td>" + usuarios[i].idEstadoNavigation.descripcion + "</td>"
        html += "<td><a href='modificarUsuario.html?id=" + usuarios[i].idUsuario + "'>Modificar</a></td>"
        html += "</tr>";

        $("#listUsuarios").append(html);
      }
    }

    else
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: result.error
      })
  },
  error: function (result) {

  }
});