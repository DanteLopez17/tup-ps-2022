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
        let fecha = new Date(clientes[i].fechaNacimiento);
        
        const formatDate = (fecha)=>{
        let formatted_date = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()
        return formatted_date;
        }

        html += "<td>" + formatDate(fecha) + "</td>"
        html += "<td>" + clientes[i].idTipoDocNavigation.descripcion + "</td>"
        html += "<td>" + clientes[i].numDoc + "</td>"
        html += "<td>" + clientes[i].cuilCuit + "</td>"
        html += "<td>" + clientes[i].idEstadoNavigation.descripcion + "</td>"
        html += "<td><a href='modificarCliente.html?id=" + clientes[i].idCliente + "'><i class='fa-solid fa-eye'></i></a></td>"
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