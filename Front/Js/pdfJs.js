document.addEventListener('DOMContentLoaded', ()=>{

  const $boton = document.querySelector('#exportar');
  $boton.addEventListener('click', ()=>{

    
    const $elementoParaConvertir = document.querySelector('#probando');
    html2pdf().set({
      margin:1,
      filename: 'Documento.pdf',
      image:{
        type:'jpeg',
        quality: 0.98
      },
      html2canvas:{
        scale:3,
        letterRendering: true,
      },
      jsPDF:{
        unit:"in",
        format:"a4",
        orientation: 'landscape'
      }
    }).from($elementoParaConvertir)
    .save()
    .catch(err => console.log(err))
    .finally()
    .then(()=>{
      console.log("Guardado!")
    })
  })

})


