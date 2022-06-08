$.ajax({
  url: 'https://localhost:5001/Cliente/listadoClientes',
  type: "GET",
  success: function (result) {
    if (result.ok) {
      let Clientes = result.respuesta;
      for (var i = 0; i < Clientes.length; i++) {
        if(Clientes[i].idEstado == 2){
          continue;
        }
        let html = "<option value = '";
        html += Clientes[i].idCliente + "'>";
        html += Clientes[i].apellido + " " +  Clientes[i].nombre;
        html += "</option>";

        $("#cboCliente").append(html);
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