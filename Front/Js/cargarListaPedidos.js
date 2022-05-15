$.ajax({
  url: 'https://localhost:5001/Pedido/listadoPedidos',
  type: "GET",
  success: function (result) {
    if (result.ok) {
      let pedidos = result.respuesta;
      for (var i = 0; i < pedidos.length; i++) {
        let html = "<tr>";
        html += "<td>" + pedidos[i].nroPedido + "</td>"

        let fecha = new Date(pedidos[i].fecha);
        const formatDate = (fecha)=>{
          let dia = fecha.getDate();
          let mes = fecha.getMonth() + 1;
          let anio = fecha.getFullYear();

          if(dia < 10){
              dia = '0' + dia;
            }
          if(mes < 10){
              mes = '0' + mes;
            }
          let formatted_date = dia + '-' + mes + '-' + anio;

          return formatted_date;
        }

        html += "<td>" + formatDate(fecha) + "</td>"
        html += "<td>" + pedidos[i].idClienteNavigation.apellido + ' ' + pedidos[i].idClienteNavigation.nombre + "</td>"
        html += "<td>" + pedidos[i].idUsuarioNavigation.apellido + ' ' + pedidos[i].idUsuarioNavigation.nombre + "</td>"
        html += "<td>" + pedidos[i].idFormaPagoNavigation.descripcion + "</td>"
        if(pedidos[i].idEtapaNavigation.idEtapa == 1)
        {
          html += "<td style='color: yellow;'>" + pedidos[i].idEtapaNavigation.descripcion + "</td>"
        }
        else
        if(pedidos[i].idEtapaNavigation.idEtapa == 2){
          html += "<td style='color: green;'>" + pedidos[i].idEtapaNavigation.descripcion + "</td>"
        }
        else
        if(pedidos[i].idEtapaNavigation.idEtapa == 3){
          html += "<td style='color: red;'>" + pedidos[i].idEtapaNavigation.descripcion + "</td>"
        }
        else
        if(pedidos[i].idEtapaNavigation.idEtapa == 4){
          html += "<td style='color: blue;'>" + pedidos[i].idEtapaNavigation.descripcion + "</td>"
        }
        html += "<td><a href='visualizarPedido.html?id=" + pedidos[i].nroPedido + "'><i class='fa-solid fa-eye'></i></a></td>"
        html += "</tr>";
        $("#listPedidos").append(html);
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