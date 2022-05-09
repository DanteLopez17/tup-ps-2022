$.ajax({
  url: 'https://localhost:5001/Usuario/listadoUsuarios',
  type: "GET",
  success: function (result) {
    if (result.ok) {
      let usuarios = result.respuesta;
      //capturar input buscador
      const buscador = document.querySelector('#inputBuscador');
      //capturamos el body de la tabla
      const cuerpo = document.querySelector('#listUsuarios');

      //Creamos la funcion filtrar
      const filtrar = ()=>{
        cuerpo.innerHTML = '';
        const texto = buscador.value.toLowerCase();
        for(let usuario of usuarios){
          let nom = usuario.nombre.toLowerCase();
          let ape = usuario.apellido.toLowerCase();
          let fecnac = usuario.fechaNacimiento.toLowerCase();
          let tipdoc = usuario.idTipoDocNavigation.descripcion.toLowerCase();
          let numidoc = usuario.numDoc;
          let numdoc = numidoc.toString();
          let mail = usuario.email.toLowerCase();
          let rol = usuario.idRolNavigation.descripcion.toLowerCase();
          let estad = usuario.idEstadoNavigation.descripcion.toLowerCase();

          if(nom.indexOf(texto) != -1 || ape.indexOf(texto) != -1 || fecnac.indexOf(texto) != -1 || tipdoc.indexOf(texto) != -1 || numdoc.indexOf(texto) != -1 || mail.indexOf(texto) != -1 || rol.indexOf(texto) != -1|| estad.indexOf(texto) != -1){

            let fecha = new Date(usuario.fechaNacimiento);
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
            cuerpo.innerHTML += `
            <tr>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido}</td>
            <td>${formatDate(fecha)}</td>
            <td>${usuario.idTipoDocNavigation.descripcion}</td>
            <td>${usuario.numDoc}</td>
            <td>${usuario.email}</td>
            <td>${usuario.idRolNavigation.descripcion}</td>
            <td>${usuario.idEstadoNavigation.descripcion}</td>
            <td><a href='modificarUsuario.html?id=${usuario.idUsuario}'>Modificar</a></td>
            </tr>
            `
          }
        }
        if(cuerpo.innerHTML === ''){
          cuerpo.innerHTML += `
          <p>Usuario no encontrado...</p>
          `
        }
      }
      buscador.addEventListener('keyup', filtrar);
      filtrar();
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