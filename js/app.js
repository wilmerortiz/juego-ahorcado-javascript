var arrayLetrasFila1 = ['Q','W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
var arrayLetrasFila2 = ['A','S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'];
var arrayLetrasFila3 = ['Z','X', 'C', 'V', 'B', 'N', 'M'];
var arrayPalabras = [
  'HTML', 'CSS', 'JAVA', 'GITHUB', 'MELONES', 'OBJETOS', 'ARRAY', 'PYTHON', 'JAVASCRIPT', 'PERAS'
];

var letrasTeclado='' ;
arrayLetrasFila1.forEach(letra => {
  letrasTeclado += `<button class="letras" onclick="mostrarInformacionCaracter('${letra}')">${letra}</button>`;
})
arrayLetrasFila2.forEach(letra => {
  letrasTeclado += `<button class="letras" onclick="mostrarInformacionCaracter('${letra}')">${letra}</button>`;
})
arrayLetrasFila3.forEach(letra => {
  letrasTeclado += `<button class="letras" onclick="mostrarInformacionCaracter('${letra}')">${letra}</button>`;
})
document.getElementById('letrasTeclado').innerHTML = letrasTeclado;

let close_button = document.getElementById('close-button');
close_button.addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("window-notice").style.display = "none";
});

var palabraOculta = '';
var palabraOcultaArray = []
var letrasAcertadasArray = [];
var letrasFallidasArray = [];

var vidas = 9;
finalGame = true;

function clearTextarea(){
  document.getElementById('palabra').value = "";
}

function obtenerPalabra(){
  resetGame()

  document.getElementById('letrasFallidas').innerHTML='';
  var random = Math.floor(Math.random()*arrayPalabras.length);
  palabraOculta = arrayPalabras[random];

  let celdas = '';
  for (let i = 0; i < palabraOculta.length; i++) {
    celdas += `<div class="palabra" id='celda-${i}'></div>`;
  }

  //convertimos a un array la palabra secreta. usamos Spread operator
  palabraOcultaArray = [...palabraOculta];
  //vidas = palabraOcultaArray.length;

  document.getElementById('letrasAcertadas').innerHTML = celdas;
}

function savePalabra(){
  let palabra = document.getElementById("palabra").value;
  // Eliminamos los espacions en blanco
  palabra = palabra.replace(/\s+/g, '');

  if(!palabra){
    alert('Ingrese una palabra y tiene que ser máximo de 8 caracteres');
    clearTextarea();
    document.getElementById("palabra").focus();
    return;
  }

  if(palabra.length > 8){
    alert('Ingrese una palabra máximo de 8 caracteres');
    clearTextarea();
    document.getElementById("palabra").focus();
    return;
  }

  var newPalabra = palabra.toUpperCase();

  if(arrayPalabras.indexOf(newPalabra) === -1){
    arrayPalabras.push(newPalabra);
    document.getElementById("palabra").focus();
  }

  clearTextarea();
  
}

function dibujarMunieco(vidas, finalGame){
  var canvas = document.getElementById('canva-munieco');
  if(finalGame){
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    return;
  }
  if(canvas.getContext){
    var ctx = canvas.getContext('2d');

    /**Base */
    ctx.beginPath();
    ctx.moveTo(80,148);
    ctx.lineTo(210,148);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(80,149);
    ctx.lineTo(210,149);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(100,200);

    if(vidas <= 8){
      /**horca alto*/
      ctx.lineTo(100,1);
    }

    if(vidas <= 7){
      /**horca cima*/
      ctx.lineTo(180,1);
    }
    
    if (vidas <= 6) {
      /** cuerda */
    ctx.lineTo(180,15);
    }
    ctx.stroke();

    if (vidas <= 5) {
      /** Cabeza */
      ctx.beginPath();
      ctx.arc(180,30,15,0,Math.PI*2,true);
      ctx.stroke();
    }

    if (vidas <= 4) {
      /**Cuerpo */
      ctx.beginPath();
      ctx.moveTo(180,45);
      ctx.lineTo(180,90);
      ctx.stroke();
    }

    if (vidas <= 3) {
      /**Brazo Izq */
      ctx.beginPath();
      ctx.moveTo(180,45);
      ctx.lineTo(160,100);
      ctx.stroke();
    }

    if (vidas <= 2) {
      /**Brazo Der */
      ctx.beginPath();
      ctx.moveTo(180,45);
      ctx.lineTo(200,100);
      ctx.stroke();
    }

    if (vidas <= 1) {
      /**Pierna Der */
      ctx.beginPath();
      ctx.moveTo(180,90);
      ctx.lineTo(200,130);
      ctx.stroke();
    }

    if (vidas == 0) {
      /**Pierna Izq */
      ctx.beginPath();
      ctx.moveTo(180,90);
      ctx.lineTo(160,130);
      ctx.stroke();

      var message = 'Fin del juego';

    }

  }
}

function mostrarInformacionCaracter(evObject) {
  if(finalGame){
    return
  }

  var regexp = "^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";

  //var letra = String.fromCharCode(evObject.which);
  let letrasFallidas = document.getElementById('letrasFallidas');
  if(evObject.length == 1){
    letra = evObject
  }else{
    letra = evObject.key.toUpperCase();
  }
  
  if( letra.match(regexp) != null && letra.length==1){
    
    let letrasAsignar = palabraOcultaArray.filter(pl => pl === letra);
    let indice = letrasAcertadasArray.indexOf(letra);

    if(indice < 0){
      letrasAcertadasArray.push(...letrasAsignar);
    }

    //console.log('letrasAcertadasArray', letrasAcertadasArray);

    contador = 0;

    for(index = 0; index < palabraOcultaArray.length; index++) {
      if( palabraOcultaArray[index] == letra ){

        document.getElementById('celda-'+index).innerHTML = letra;
        contador++;
      }
    }

    if(letrasAcertadasArray.length == palabraOcultaArray.length){
      //alert('Felicidades, Has ganado...!');
      document.getElementById("window-notice").style.display = "flex";
      document.getElementById("message").innerHTML = "<p class='message-success'><strong>FELICIDADES HAS GANADO !</strong></p>";
      dibujarMunieco(vidas);
      finalGame = true;
      return
    }

    if(contador == 0){
      let indice = letrasFallidasArray.indexOf(letra);
      if(indice < 0){
        letrasFallidasArray.push(letra);
        letrasFallidas.innerHTML = letrasFallidas.innerHTML + letra;
        vidas--;
        if(vidas == 0){
          //alert('Has perdido, Juego finalizados');
          document.getElementById("window-notice").style.display = "flex";
          document.getElementById("message").innerHTML = "<p class='message-fail'><strong>JUEGO FINALIZADO !</strong></p><br><p> LA PALABRA OCULTA ERA: "+palabraOculta+"</p>";
          dibujarMunieco(vidas);
          //console.log(palabraOculta)
          finalGame = true;
          return
        }
        dibujarMunieco(vidas);
      }
    }
  
  }
}

function resetGame(){
  finalGame = false;
  vidas = 9;
  letrasFallidasArray = [];
  letrasAcertadasArray = [];
  dibujarMunieco(0, true);
}

function oculatrContent(section){
  if(section == 'home'){
    obtenerPalabra();
    document.getElementById('home').removeAttribute('style');
    document.getElementById('initGame').setAttribute('style', 'display: none');
    document.getElementById('addNewPalabra').setAttribute('style', 'display: none');
  }else if(section == 'initGame'){
    obtenerPalabra();
    document.getElementById('initGame').removeAttribute('style');
    document.getElementById('home').setAttribute('style', 'display: none');
    document.getElementById('addNewPalabra').setAttribute('style', 'display: none');
  }else{
    document.getElementById('addNewPalabra').removeAttribute('style');
    document.getElementById('home').setAttribute('style', 'display: none');
    document.getElementById('initGame').setAttribute('style', 'display: none');
  }
}


var btnNewPalabra = document.getElementById('btnNewPalabra');
var btnSavePalabra = document.getElementById('btnSavePalabra');
var btnCancelar = document.getElementById('btnCancelar');
var btnInitGame = document.getElementById('btnInitGame');
var btnIniciarJuego = document.getElementById('btnIniciarJuego');
var btnNewGame = document.getElementById('btnNewGame');
var btnDesistir = document.getElementById('btnDesistir');

btnSavePalabra.onclick = savePalabra;
btnNewPalabra.onclick = () => oculatrContent('addNewPalabra');
btnCancelar.onclick = () => oculatrContent('home');
//btnInitGame.onclick = () => oculatrContent('initGame');
//btnIniciarJuego.onclick = () => oculatrContent('initGame');
btnNewGame.onclick = obtenerPalabra;
btnDesistir.onclick = () => oculatrContent('home');



btnInitGame.addEventListener("click", function(e) {
  e.preventDefault();
  document.onkeyup = mostrarInformacionCaracter;
  oculatrContent('initGame');
});

btnIniciarJuego.addEventListener("click", function(e) {
  e.preventDefault();
  document.onkeyup = mostrarInformacionCaracter;
  oculatrContent('initGame');
});

/*
window.onload = function() { 
  document.onkeyup = mostrarInformacionCaracter;
}
*/