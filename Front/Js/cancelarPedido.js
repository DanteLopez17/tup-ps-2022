//Aplicar la logica para los botones cancelar y confirmar pedido
//https://localhost:5001/Pedido/modificarPedido
const valores = window.location.search;

//Mostramos los valores en consola:
//console.log(valores);

//Resultado:
//?id=valorId

//Creamos la instancia
const urlParams = new URLSearchParams(valores);

//Accedemos a los valores
let data = urlParams.get('id');

$("#btnCancelarPedido").click(function(){
  let fec = $("#txtFecha").val();
  let idCli = $("#cboCliente").val();
  let idUsu = $("#cboUsuario").val();
  let idForPa = $("#cboFormaPago").val();
  let idEta = 3;

  let pedido = {
    nroPedido : data,
    fecha: fec,
    idCliente: idCli,
    idUsuario :idUsu,
    idFormaPago : idForPa,
    idEtapa: idEta
  }

  $.ajax({
    url: 'https://localhost:5001/Pedido/modificarPedido',
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(pedido),
    success: function (result) {
      if (result.ok) {
        swal("Felicitaciones!", "Pedido actualizado Correctamente!", "success");
        setTimeout(function(){
          window.location.replace("../Html/listadoPedido.html");
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
  
})

$("#btnConfirmarPedido").click(function(){
  let fec = $("#txtFecha").val();
  let idCli = $("#cboCliente").val();
  let idUsu = $("#cboUsuario").val();
  let idForPa = $("#cboFormaPago").val();
  let idEta = 2;

  let pedido = {
    nroPedido : data,
    fecha: fec,
    idCliente: idCli,
    idUsuario :idUsu,
    idFormaPago : idForPa,
    idEtapa: idEta
  }

  $.ajax({
    url: 'https://localhost:5001/Pedido/modificarPedido',
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(pedido),
    success: function (result) {
      if (result.ok) {
        swal("Felicitaciones!", "Pedido actualizado Correctamente!", "success");
        setTimeout(function(){
          window.location.replace("../Html/listadoPedido.html");
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
  
})


  