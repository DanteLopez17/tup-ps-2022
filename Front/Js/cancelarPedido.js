$("#btnConfirmarPedido").click(function(){
  const valores = window.location.search;
  const urlParams = new URLSearchParams(valores);
  let data = urlParams.get('id');

  let pedido = {
    nroPedido : data,
    idEtapa: 2
  }

  $.ajax({
    url: 'https://localhost:5001/Pedido/modificarPedido',
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(pedido),
    success: function (result) {
      if (result.ok) {
        swal("Felicitaciones!", "Pedido actualizado Correctamente!", "success").then((confirmar) => {
          if (confirmar) {
      window.location.href = "../Html/listadoPedido.html";

          }
        });
        
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
  
});
$("#btnCancelarPedido").click(function () {
  const valores = window.location.search;
  const urlParams = new URLSearchParams(valores);
  let data = urlParams.get('id');
  let listDeta = [];

  $.ajax({
    url: 'https://localhost:5001/Pedido/' + data,
    type: "GET",
    success: function (result) {
      if (result.ok) {
        let detallesPedido = result.respuesta;

        for (let detaPedi of detallesPedido) {
          let idPr = detaPedi.idProducto;
          let pre = detaPedi.precio;
          let cant = detaPedi.cantidad;

          detalle = {
            idProducto: idPr,
            cantidad: cant,
            precio: pre,

          }
          listDeta.push(detalle);
        }
        const now = new Date();
        const dia = `0${now.getDate()}`.slice(-2);
        const mes = `0${now.getMonth() + 1}`.slice(-2);
        const hoy = `${now.getFullYear()}-${mes}-${dia}`;
        let fec = hoy;
        let idEta = 3;

        let pedido = {
          fecha: fec,
          idEtapa: idEta,
          nroPedido: data,
          listaDetalles: listDeta
        }

        $.ajax({
          url: 'https://localhost:5001/Pedido/transaccionModificarPedido',
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(pedido),
          success: function (result) {
            if (result.ok) {
              swal("Felicitaciones!", "Pedido actualizado Correctamente!", "success").then((confirmar) => {
                if (confirmar) {
                  window.location.href = "../Html/listadoPedido.html";

                }
              });

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





});


  