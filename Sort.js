function selectionSort  (arr)  {
    for ( let j = 0; j < arr.length; ++j ) {
      let i = iMin = j;
      for ( ++i; i < arr.length; ++i ) {
        ( arr[ i ] < arr[ iMin ] ) && ( iMin = i );
      }
      [ arr[ j ], arr[ iMin ] ] = [ arr[ iMin ], arr[ j ] ];
    }
  
    return arr;
  }

  function shellSort  (arr)  {
    const gap = arr.length;
    let h = 1;
    while ( h < gap / 3 ) {
      h = 3 * h + 1;
    }
    while ( h >= 1 ) {
      for ( let i = h; i < gap; i++ ) {
        for ( let j = i; j >= h && arr[ j ] < arr[ j - h ];  j -= h ) {
          [ arr[ j ], arr[ j - h ] ] = [ arr[ j - h ], arr[ j ] ];
        }
      }
      h = ( h - 1 ) / 3;
    }
  
    return arr;
  }

  function mergeSort  (arr) {
    if (arr.length < 2) {
      return arr;
    }
  
    const middle = parseInt(arr.length / 2) | 0;
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    const merge = (left, right) => {
      const result = [];
      let il = ir = 0;
  
      while (il < left.length && ir < right.length) {
        result.push( (left[il] < right[ir]) ? left[il++] : right[ir++] );
      }
  
      return [...result, ...left.slice(il), ...right.slice(ir)];
    }
  
    return merge(mergeSort(left), mergeSort(right));
  }



  function insertionSort  (arr) {
    const l = arr.length;
    let j, temp;
  
    for ( let i = 1; i < l; i++ ) {
      j = i;
      temp = arr[ i ];
      while ( j > 0 && arr[ j - 1 ] > temp ) {
        arr[ j ] = arr[ j - 1 ];
        j--;
      }
      arr[ j ] = temp;
    }
  
    return arr;
  }

  function a(){
    var str=document.getElementById('cad').value;
    let arr2 = str.split(',');
    arr=[];
    arr2.forEach(a => {
        x=parseInt(a);
        arr.push(x);
    });
    console.log(arr);
    var fecha
    fecha=new Date();
    let start = new Date().getTime()
    console.time('loop');
    arr1=selectionSort(arr);
    console.timeEnd('loop');
    let end = new Date().getTime()
     alert((end-start)+" ms");
    console.log(arr1);
    var cad="";
    arr1.forEach(b =>{
        cad=cad+b+",";
    });
    console.log(cad);
    document.getElementById('res').innerHTML = cad;
  }


  function b(){
    var str=document.getElementById('cad').value;
    let arr2 = str.split(',');
    arr=[];
    arr2.forEach(a => {
        x=parseInt(a);
        arr.push(x);
    });
    console.log(arr);
    var fecha
    fecha=new Date();
    let start = new Date().getTime()
    console.time('loop');
    arr1=insertionSort(arr);
    console.timeEnd('loop');
    let end = new Date().getTime()
     alert((end-start)+" ms");
    console.log(arr1);
    var cad="";
    arr1.forEach(b =>{
        cad=cad+b+",";
    });
    console.log(cad);
    document.getElementById('res').innerHTML = cad;
  }


  function c(){
    var str=document.getElementById('cad').value;
    let arr2 = str.split(',');
    arr=[];
    arr2.forEach(a => {
        x=parseInt(a);
        arr.push(x);
    });
    console.log(arr);
    var fecha
    fecha=new Date();
    let start = new Date().getTime()
    console.time('loop');
    arr1=shellSort(arr);
    console.timeEnd('loop');
    let end = new Date().getTime()
     alert((end-start)+" ms");
    console.log(arr1);
    var cad="";
    arr1.forEach(b =>{
        cad=cad+b+",";
    });
    console.log(cad);
    document.getElementById('res').innerHTML = cad;
  }


  function d(){
    var str=document.getElementById('cad').value;
    let arr2 = str.split(',');
    arr=[];
    arr2.forEach(a => {
        x=parseInt(a);
        arr.push(x);
    });
    let start = new Date().getTime()
    console.log(arr);
    var fecha
    fecha=new Date();
    
  
    console.time('loop');
    arr1=mergeSort(arr);
    console.timeEnd('loop');

    let end = new Date().getTime()
    alert((end-start)+" ms");
    console.log(arr1);
    var cad="";
    arr1.forEach(b =>{
        cad=cad+b+",";
    });
    console.log(cad);
    document.getElementById('res').innerHTML = cad;
  }

  function ran(){
    var numero_random = parseInt( prompt("Ingrese cantidad de numeros: "));
    var lim = 1;
    var sup  = 999;
    while (lim<0 || numero_random<0 || sup<0){
        var numero_random = parseInt( prompt("No se ingreso nada vuelva a ingresar: "));  
    }
     document.getElementById("cad").value = " ";
    
    var imprimir = " ";

    var numeros = []
    for (var i=0; i<numero_random;i++){
        var n = Math.floor((Math.random()*(sup -lim))+lim);
        numeros.push(n);
    }
    console.log(numeros);
    for (var i=0;i<numeros.length; i++){
        if(i==0){
            imprimir += numeros[i].toString();
        }
        else{
        imprimir += ", "+numeros[i].toString();
        }
    }
    console.log(imprimir);
    document.getElementById("cad").value = imprimir;
}

  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Start file download.
document.getElementById("dwn-btn").addEventListener("click", function(){
    // Generate download of hello.txt file with some content
    var text = document.getElementById("cad").value;
    var filename = prompt("Nombre del archivo:");
    
    download(filename, text);
}, false);
function leerArchivo(e) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    cambiaValores(contenido);
  };
  lector.readAsText(archivo);
}
function cambiaValores(contenido) {
  var inputNombre = document.getElementById("cad");
 inputNombre.value = contenido;
}


document.getElementById('file-input')
  .addEventListener('change', leerArchivo, false);