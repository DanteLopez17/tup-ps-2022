$.ajax({
  url: 'https://localhost:5001/Cliente/listadoClientes',
  type: "GET",
  success: function (result) {
    if (result.ok) {
      let clientes = result.respuesta;
      for (var i = 0; i < clientes.length; i++) {
        let html = "<tr>";
        html += "<td>" + clientes[i].nombre + "</td>"
        html += "<td>" + clientes[i].apellido + "</td>"
        html += "<td>" + clientes[i].fechaNacimiento + "</td>"
        html += "<td>" + clientes[i].idTipoDocNavigation.descripcion + "</td>"
        html += "<td>" + clientes[i].numDoc + "</td>"
        html += "<td>" + clientes[i].cuilCuit + "</td>"
        html += "<td>" + clientes[i].idEstadoNavigation.descripcion + "</td>"
        html += "<td><a href='https://localhost:5001/Cliente/" + clientes[i].idCliente + "'>Modificar</a></td>"
        html += "</tr>";

        $("#listClient").append(html);
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