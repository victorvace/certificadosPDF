const fs = require('fs');

function certificado(objJSON){

this.img64 = fs.readFileSync('./images/MUESTRA.jpg', 'base64');
this.nombre = objJSON.nombre +' '+ objJSON.apellido1 +' '+ objJSON.apellido2;

this.horizontalMarginNombre = 140;
this.fontSizeNombre = 34;

this.marginTopCurso;
this.marginBottomCurso = 0;
this.horizontalMarginCurso = 20;
this.fontSizeCurso;

this.marginTopCert;
this.marginBottomCert;
this.horizontalMarginCert = 140;

 this.configurarCertificado=function() {
  console.log('Maquetado del certificado de ' + objJSON.nombre);

  //let marginBottomNombre;

  let lengthNombre = this.nombre.length;

  if(lengthNombre<30){
    this.marginTopNombre = 130;
  } else if(lengthNombre>30){
    this.marginTopNombre = 90;
  } else if(lengthNombre>45){
    this.marginTopNombre = 10;
  }

  //let marginTopCurso;
  //let marginBottomCurso = 0;
  //let horizontalMarginCurso = 20;
  //let fontSizeCurso;

  let lengthCurso = objJSON.curso.length;

  //let marginTopCert;
  //let marginBottomCert;
  //let horizontalMarginCert = 140;

  if(lengthCurso<25){
    this.fontSizeCurso = 60;
    this.marginTopCurso = 55;
    this.marginTopCert = 40;
    this.marginBottomCert = 60;
  } else if(lengthCurso<32){
    this.fontSizeCurso = 50;
    this.marginTopCurso = 50;
    this.marginTopCert = 60;
    this.marginBottomCert = 40;
  } else {
    this.fontSizeCurso = 40;
    this.marginTopCurso = 50;
    this.marginTopCert = 70;
    this.marginBottomCert = 40;
  };
};

  this.generarCertificado = function(cb){
    cb({
      background: [
        {
          image: 'data:image/jpeg;base64,' + this.img64,
          width: 842,
          height: 595
        }
      ],
      info: {
        title: 'Certificado de obtención',
        author: 'Víctor Vanaclocha Cebrián',
        producer: 'GeeksHubs Academy',
        },
      content: [
        {
          text: this.nombre,
          style: 'nombre'
        },
        {
          text: objJSON.curso, //25(60),32(50),X(40)
          style: 'curso'
        },
        {
          text: 'Certificado', //25(60),32(50),X(40)
          style: 'certificado'
        },
        {
          text: 'Codigo: ' + objJSON.codigo,
          style: 'code'
        }
      ],
      pageOrientation: 'landscape',
      pageSize: 'A4',
      styles: {
        nombre: {
          color:'black',
          font: 'Roboto',
          fontSize: this.fontSizeNombre,
          alignment: 'center',
          margin: [this.horizontalMarginNombre,
             this.marginTopNombre,
              this.horizontalMarginNombre,
               null]
        },
        curso: {
          color:'#D81B0C',
          font: 'BreeSerif',
          fontSize: this.fontSizeCurso,
          alignment: 'center',
          margin: [this.horizontalMarginCurso,
             this.marginTopCurso,
              this.horizontalMarginCurso,
               null]
        },
        certificado: {
          color: '#D81B0C',
          font: 'BreeSerif',
          fontSize: 60,
          alignment: 'center',
          margin: [this.horizontalMarginCert,
             this.marginTopCert,
              this.horizontalMarginCert,
               this.marginBottomCert]
        },
        code: {
          color:'black',
          font: 'Roboto',
          bold: true,
          fontSize: 10,
          alignment: 'right',
          margin: [null, null, 0, 0]
        }
      }
    })
  }
}

module.exports = certificado;
