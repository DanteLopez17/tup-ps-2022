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
        // cantidad
        const canti = document.querySelector('#txtCantidad');
        const cant = canti.value;
        if(cant > ProductoBD.cantidad){
          alert("La cantidad ingresada es superior al disponible");
          return false;
        }

        //subtotal
        let subtot = cant * pre;
        let nroPed = null;

        /*  
        Cantidad:null
        IdDetallePedido [int]:0
        IdProducto:null
        IdProductoNavigation [Producto]:null
        NroPedido:null
        NroPedidoNavigation [Pedido]:null
        Precio:null

        || 
        


        Cantidad:null
        IdProducto:null
        NroPedido:null
        Precio:null
        */

        const Producto = { id, nombre, desc, pre, cant, subtot, nroPed }
        const DetalleBD = { 
          Cantidad: cant,
          IdProducto: id,
          NroPedido: null,
          Precio: pre,
         }
        detallesBD.push(DetalleBD);

        for (let i = 0; i < productos.length; i++) {
          if (productos[i].id == valueproducto) {
            alert("El producto ya esta cargado")
            return false;
          }
        }

        productos.push(Producto);
        listado.innerHTML = '';

        for (let produc of productos) {
          listado.innerHTML += `
          <tr>
            <td>${produc.nombre}</td>
            <td>${produc.desc}</td>
            <td>$${produc.pre}</td>
            <td>${produc.cant}</td>
            <td>$${produc.subtot}</td>
            <td><a href='#'>Modificar</a></td>
          </tr>
          `;
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

}
$("#btnCargarProducto").click(function () {
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
  document.getElementById("btnConfirmarPedido").removeAttribute("hidden");
})
$("#btnConfirmarPedido").click(function () {
  // capturar datos
  //Arreglo de detalle
  let detalles = detallesBD;
  //Cliente
  let idCli = $("#cboCliente").val();
  //Usuario
  let idUsu = $("#cboUsuario").val();
  //FormaPago
  let idForPa = $("#cboFormaPago").val();
  //Etapa
  let idEt = $("#cboEtapa").val();
  //Fecha
  let fec = $("#txtFecha").val();

  let pedido = {
    fecha: fec,
    idCliente: idCli,
    idUsuario: idUsu,
    idFormaPago: idForPa,
    idEtapa: idEt

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
    }
  });

})
