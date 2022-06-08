const productos = [];
const detallesBD = [];
const listado = document.querySelector('#listDetallePedido');

const llenar = () => {
  const valueproducto = $("#cboProducto").val();
  $.ajax({
    url: 'https://localhost:5001/Producto/' + valueproducto,
    type: "GET",
    success: function (result) {
      if (result.ok) {
        let ProductoBD = result.respuesta;
        let id = ProductoBD.idProducto;
        let nombre = ProductoBD.nombre;
        let desc = ProductoBD.descripcion;
        let pre = ProductoBD.precio;
        var cantidadConsultar = ProductoBD.cantidad;
        // cantidad
        const canti = document.querySelector('#txtCantidad');
        const cant = canti.value;
        if(cant > ProductoBD.cantidad){
          swal("Error!", "La cantidad ingresada es superior a la disponible!", "info");
          return false;
        }

        //subtotal
        let subtot = cant * pre;
        let nroPed = null;

        const Producto = { id, nombre, desc, pre, cant, subtot, nroPed }

        const DetalleBD = { 
          cantidad: cant,
          idProducto: id,
         // nroPedido: null,
          precio: pre,
         }
        

        for (let i = 0; i < productos.length; i++) {
          if (productos[i].id == valueproducto) {
          swal("Error!", "El producto ya esta cargado!", "info");
            return false;
          }
        }
        for (let i = 0; i < DetalleBD.length; i++) {
          if (DetalleBD[i].IdProducto == valueproducto) {
          swal("Error!", "El producto ya esta cargado!", "info");
            return false;
          }
        }
        detallesBD.push(DetalleBD);
        productos.push(Producto);
        listado.innerHTML = '';

        for (let produc of productos) {
          listado.innerHTML += `
          <tr>
            <td class='cpoCentro'>${produc.desc}</td>
            <td class='cpoIzquierda'>$${produc.pre}</td>
            <td class='cpoIzquierda'>${produc.cant}</td>
            <td class='cpoIzquierda'>$${produc.subtot}</td>
            <td class='cpoCentro'><a data-toggle="modal" data-target="#exampleModal" data-whatever="${produc.desc}" data-otracosa="${produc.cant}" data-id="${produc.id}"><i class='fa-solid fa-eye'></i></a></td>
          </tr>
          `;
        }
        
      document.getElementById("btnConfirmarPedido").removeAttribute("hidden");
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

}

$("#btnCargarProductoDeta").click(function () {
  let produ = $("#cboProducto").val();
  let cant = $("#txtCantidad").val();

  if(produ < 0 || produ == null)
  {
    swal("Error", "Seleccione un producto", "warning");
    return false;
  }
  if(cant == "" || cant == null || cant <= 0)
  {
    swal("Error", "Debe ingresar una cantidad", "warning");
    return false;
  }

  llenar();
})
$("#btnConfirmarPedido").click(function () {
  // capturar datos
  //Fecha
  let fec = $("#txtFecha").val();
  //Cliente
  let idCli = $("#cboCliente").val();
  //Usuario
  let idUsu = $("#cboUsuario").val();
  //FormaPago
  let idForPa = $("#cboFormaPago").val();
  //Etapa
  let idEt = $("#cboEtapa").val();
  //Arreglo de detalle
  let detalles = detallesBD;

  let pedido = {
    fecha: fec,
    idCliente: idCli,
    idUsuario: idUsu,
    idFormaPago: idForPa,
    idEtapa: idEt,
    listaDetalles: detalles
  }

  swal({
    title: "¿Desea confirmar el pedido?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((confirmar) => {
    if (confirmar) {
      $.ajax({
        url: 'https://localhost:5001/Pedido/transaccionAltaPedido',
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(pedido),
        success: function (result) {
          if (result.ok) {
            swal("Felicitaciones!", "Pedido cargado Correctamente!", "success").then((confirmar)=>{
              if(confirmar){
                window.location.replace("../Html/listadoPedido.html");
              }
            });

          }
          else
            swal({
              title: "Error",
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
  });

})


//Llamada Ajax Vieja
/*
      $.ajax({
        url: 'https://localhost:5001/Pedido/cargarCabecera',
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(pedido),
        success: function (result) {
          if (result.ok) {

            let PedidoNuevo = result.respuesta;
            let idPedido = PedidoNuevo.nroPedido;
            for (let i = 0; i < detalles.length; i++) {
              detalles[i].NroPedido = idPedido;
            }
            
            $.ajax({
              url: 'https://localhost:5001/Pedido/cargarDetalle',
              type: "POST",
              contentType: "application/json",
              data: JSON.stringify(detalles),
              success: function (result) {
                if (result.ok) {
                  swal("Pedido Cargado Exitosamente", {
                    icon: "success",
                  });
                }
                else
                  swal({
                    title: "Error",
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
            swal({
              title: "Error",
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


*/