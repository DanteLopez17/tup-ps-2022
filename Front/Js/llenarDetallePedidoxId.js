window.addEventListener('load', function(){
  const valores = window.location.search;

//Mostramos los valores en consola:
//console.log(valores);

//Resultado:
//?id=valorId

//Creamos la instancia
const urlParams = new URLSearchParams(valores);

//Accedemos a los valores
let data = urlParams.get('id');

$.ajax({
  url: 'https://localhost:5001/Pedido/' + data,
  type: "GET",
  success: function (result) {
    if (result.ok) {
      let detallesPedido = result.respuesta;

      //capturamos el body de la tabla
      const cuerpo = document.querySelector('#listPedGenerados');
      let acumTotal = 0;
        cuerpo.innerHTML = '';
        for(let detaPedi of detallesPedido){
          let numPed = detaPedi.nroPedido
          let nomPro = detaPedi.idProductoNavigation.nombre;
          let descPro = detaPedi.idProductoNavigation.descripcion;
          let pre = detaPedi.precio;
          let cant = detaPedi.cantidad;
          let subto = pre * cant;
          acumTotal += pre * cant;
          let fec = new Date(detaPedi.nroPedidoNavigation.fecha);
            const formatDate = (fec)=>{
              let dia = fec.getDate();
              let mes = fec.getMonth() + 1;
              let anio = fec.getFullYear();

              if(dia < 10){
                dia = '0' + dia;
              }
              if(mes < 10){
                mes = '0' + mes;
              }
              let formatted_date = anio + '-' + mes + '-' + dia;

              return formatted_date;
              }
          
          $("#txtFecha").val(formatDate(fec));

          let idComboCliente = detaPedi.nroPedidoNavigation.idCliente;
          let idComboUsuario = detaPedi.nroPedidoNavigation.idUsuario;
          let idComboFormaPago = detaPedi.nroPedidoNavigation.idFormaPago;
          let idComboEtapa = detaPedi.nroPedidoNavigation.idEtapa;

          document.getElementById("cboCliente").value = idComboCliente;
          document.getElementById("cboUsuario").value = idComboUsuario;
          document.getElementById("cboFormaPago").value = idComboFormaPago;
          document.getElementById("cboEtapa").value = idComboEtapa;

          $("#lblTotal").text('Total: ' + "$"+acumTotal);

          if(idComboEtapa == 1)
          {
            document.getElementById("btnCancelarPedido").removeAttribute("hidden");
            document.getElementById("btnConfirmarPedido").removeAttribute("hidden");            
          }

            cuerpo.innerHTML += `
            <tr>
            <td>${numPed}</td>
            <td>${nomPro}</td>
            <td>${descPro}</td>
            <td>$${pre}</td>
            <td>${cant}</td>
            <td>$${subto}</td>
            </tr>
            `
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

})
