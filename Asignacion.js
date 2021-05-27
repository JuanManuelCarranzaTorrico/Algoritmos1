// Nodes and Edges counter.
var nodeIdCounter = 0;
var edgesIdCounter = 0;

// Create the network.
var container = document.getElementById("mynetwork");

// Default array with nodes.
var nodes = new vis.DataSet([]);

// Default array with edges.
var edges = new vis.DataSet([]);

// Savew Data.
var data = {
  nodes: nodes,
  edges: edges,
};
var men1= {
 mensaje: mensaje
};

var options = {
  interaction: {
    hover: false,
  },
  physics: {
    enabled: false,
  },
 
  manipulation: {
    enabled: true,
    initiallyActive: false,
    addNode: function (nodeData, callback) {
      addNode(nodeData, callback);
    },
    editNode: function (nodeData, callback) {
      editNode(nodeData, callback);
    },
    addEdge: function (edgeData, callback) {
      addEdge(edgeData, callback);
    },
    editEdge: function (edgeData, callback) {
      editEdge(edgeData, callback);
    },
    // editEdge: true,
    deleteNode: true,
    deleteEdge: false,
  },
  nodes: {
    
    font: {
      color: "#333333",
      size: 18,
    },
  },
  edges: {
    color: {
      color: "#f5f5f5",
      highlight: "#848484",
      hover: "#848484",
    },
    arrows: {
      to: {
        enabled: true,
        type: "triangle",
      },
    },
    font: {
      color: "#f5f5f5",
      size: 10,
      align: "horizontal",
      background: "none",
      strokeWidth: 0,
      align: "top",
    },
  },
};


// Add new custom Node.
function addNode(nodeData, callback) {

  if (nodes.length === 0) {
    nodeIdCounter = 0;
  }
  // Verify if it's Empty.
  var label;
  while (!valueIsEmpty(label)) {
    label = prompt("Nombre del nodo:");
  }

  nodeData.id = nodeIdCounter++;
  nodeData.label = label;
  nodeData.title = "Node " + label;
  if (window.confirm('Origen (Confirmar)   Destino (Cancelar)'))
    {
      nodeData.tipo=true;
      nodeData.color="#0EEA2F";
    }
    else
    {
        nodeData.tipo=false;
        nodeData.color="#F1321C";
    }
  callback(nodeData);
}
// Add new custom Node.
function editNode(nodeData, callback) {

  if (nodes.length === 0) {
    nodeIdCounter = 0;
  }
  // Verify if it's Empty.
  var label;
  while (!valueIsEmpty(label)) {
    label = prompt("Nombre del nodo:");
  }

  nodeData.label = label;
  nodeData.title = "Node " + label;
  callback(nodeData);
}

// Add new custom Edge.
function addEdge(edgeData, callback) {

  if (edges.length === 0) {
    edgesIdCounter = 0;
  }
  // Verify if it's Empty.
  var label;
  while (!valueIsEmpty(label)) {
    label = prompt("Ingrese el valor:");
  }

  if (edgeData.from === edgeData.to) {
    
      edgeData.id = edgesIdCounter++;
      edgeData.label = label;
      callback(edgeData);
    
  } else {
    edgeData.id = edgesIdCounter++;
    edgeData.label = label;
    callback(edgeData);
  }
}
function editEdge(edgeData, callback) {

  if (edges.length === 0) {
    edgesIdCounter = 0;
  }
  // Verify if it's Empty.
  var label;
  while (!valueIsEmpty(label)) {
    label = prompt("Ingrese el valor:");
  }

  if (edgeData.from === edgeData.to) {
    
      callback(edgeData);
    
  } else {
    
    edgeData.label = label;
    callback(edgeData);
  }
}

// Verify if the string is Empty.
function valueIsEmpty(label) {
  return label && label !== "";
}

// Enable the network.
var network = new vis.Network(container, data, options);


const generarMatriz = () => {
  let matrix = Array(nodes.length)
    .fill(0)
    .map(() => Array(nodes.length).fill(0));

  edges.forEach((edge) => {
    matrix[parseInt(edge.from)][parseInt(edge.to)] = edge.label;
  });

  rowList = [];
  colList = [];
  console.log(matrix);

  for (let i = 0; i < matrix.length; i++) {
    sumRow = 0;
    sumCol = 0;
    for (let j = 0; j < matrix.length; j++) {
      sumRow += parseFloat(matrix[i][j]);
      sumCol += parseFloat(matrix[j][i]);
    }

    rowList.push(sumRow);
    colList.push(sumCol);
  }



  nombresNodos = [];

  let showMatrix = " ,";
  nodes.forEach((node) => {
    showMatrix += node.label + ",";
    nombresNodos.push(node.label);
  });

  showMatrix += "SUMA|";

  for (let i = 0; i < matrix.length; i++) {
    showMatrix += nombresNodos[i] + ",";
    for (let j = 0; j < matrix.length; j++) {
      showMatrix += matrix[i][j] + ",";
    }

    showMatrix += rowList[i] + "|";
  }

  showMatrix += "SUMA,";
  colList.forEach((col) => (showMatrix += col + ","));

  parseArray(showMatrix);
};

const parseArray = (matriz) => {
  let final = Array(nodes.length + 2)
    .fill(0)
    .map(() => Array(nodes.length + 2).fill(0));

  let rows = matriz.split(["|"]);

  for (let i = 0; i < rows.length; i++) {
    let cols = rows[i].split(",");

    for (let j = 0; j < cols.length; j++) {
      final[i][j] = cols[j];
    }
  }

  crearTabla(final);
};

const crearTabla = (datosTabla) => {
  let finalTable = document.getElementById("finalTable");

  var cuerpoTabla = createCustomElement("tbody");

  finalTable.innerHTML = "";

  datosTabla.forEach(function (datosFilas) {
    var fila = createCustomElement("tr");

    datosFilas.forEach(function (datosCeldas) {
      var celda = createCustomElement("th");

      celda.appendChild(document.createTextNode(datosCeldas));
      fila.appendChild(celda);
    });

    cuerpoTabla.appendChild(fila);
  });

  finalTable.appendChild(cuerpoTabla);
};



//FUNCIONES

const createCustomElement = (element, attributes, children) => {
  let customElement = document.createElement(element);
  
  if (children !== undefined) {
    children.forEach((child) => {
      if (child.nodeType) {
        if (child.nodeType === 1 || child.nodeType === 11)
        customElement.appendChild(child);
        else customElement.innerHTML += child;
      }
    });
  }
  addAtributes(customElement, attributes);
  return customElement;
};

const addAtributes = (element, attrObj) => {
  for (let attr in attrObj) {
    if (attrObj.hasOwnProperty(attr)) element.setAttribute(attr, attrObj[attr]);
  }
};


//matrixad is Adjacency Matrix


//task is a string "max" for maximization "min" for minimization
let permutations = []
function asignacion(task){ 
  let matrixad = Array(nodes.length)
      .fill(0)
      .map(() => Array(nodes.length).fill(0));
  let matriz1 = Array(nodes.length)
      .fill(0)
      .map(() => Array(nodes.length).fill(0));
  
    edges.forEach((edge) => {
      matrixad[parseInt(edge.from)][parseInt(edge.to)] = parseInt(edge.label);
    });
    let colors = ["#800000","#FF0000","#FFA500","#808000","#800080","#FF00FF","#008000","#000080","#0000FF","#008080","#000000","#808080"];
    let response = {
        array: [],
        message: "",
    }

    let info = {
        sources: [],
        destinies: []
    };
    let matrix = correctMatrix(matrixad,info);
    if(info.sources.length>=info.destinies.length){
        permute(info.sources,0,info.sources.length-1);
        let resultCost;
        let solution;
        if(task == "max"){
            resultCost = -1000000;
            for(let i=0;i<permutations.length;i++){
                let iterationCost = 0;
                for(let j=0;j<info.destinies.length;j++){
                    iterationCost += matrixad[permutations[i][j]][info.destinies[j]];
                }
                if(iterationCost > resultCost){ 
                    resultCost = iterationCost;
                    solution = permutations[i];
                }
            }
            console.log(resultCost);
            console.log(solution.join(','));
            response.message = response.message.concat("El costo maximo es ",resultCost,"\n");
        }
        if(task == "min"){
            resultCost = 1000000;
            for(let i=0;i<permutations.length;i++){
                let iterationCost = 0;
                for(let j=0;j<info.destinies.length;j++){
                    iterationCost += matrixad[permutations[i][j]][info.destinies[j]];
                }
                if(iterationCost < resultCost){ 
                    resultCost = iterationCost;
                    solution = permutations[i];
                }
            }
            console.log(resultCost);
            console.log(solution.join(','));
            response.message = response.message.concat("El costo minimo es ",resultCost,"\n");
        }
        for(let i=0;i<info.destinies.length;i++){
          a=consegirlabel(solution[i]);
          b=consegirlabel(info.destinies[i]);
          edges.forEach((edge) => {
            if(parseInt(edge.from)==solution[i]&&parseInt(edge.to)==info.destinies[i]){
              matriz1[parseInt(edge.from)][parseInt(edge.to)] = "X";
            }
            else{
              // matriz1[parseInt(edge.from)][parseInt(edge.to)] = "";
            }
            
          });
            // response.message = response.message.concat("El nodo ",a," es asignado a ",b,"\n");
            let object1 = {
                type: "node",
                id: solution[i],
                color: colors[i]
            };
            let object2 = {
                type: "edge",
                source: solution[i],
                target: info.destinies[i],
                color: colors[i]
            };
            let object3 = {
                type: "node",
                id: info.destinies[i],
                color: colors[i]
            };
            response.array.push(object1);
            response.array.push(object2);
            response.array.push(object3);
        }
    }
    else{
        let resultCost;
        let solution;
        permute(info.destinies,0,info.destinies.length-1);
        if(task == "max"){
            resultCost = -1000000;
            for(let i=0;i<permutations.length;i++){
                let iterationCost = 0;
                for(let j=0;j<info.sources.length;j++){
                    iterationCost += matrixad[info.sources[j]][permutations[i][j]];
                }
                if(iterationCost > resultCost){ 
                    resultCost = iterationCost;
                    solution = permutations[i];
                }
            }
            console.log(resultCost);
            console.log(solution.join(','));
            response.message = response.message.concat("El costo maximo es ",resultCost,"\n");
        }
        if(task == "min"){
            resultCost = 1000000;
            for(let i=0;i<permutations.length;i++){
                let iterationCost = 0;
                for(let j=0;j<info.sources.length;j++){
                    iterationCost += matrixad[info.sources[j]][permutations[i][j]];
                }
                if(iterationCost < resultCost){ 
                    resultCost = iterationCost;
                    solution = permutations[i];
                }
            }
            console.log(resultCost);
            console.log(solution.join(','));
            response.message = response.message.concat("El costo minimo es ",resultCost," <br> \n");
        }
        for(let i=0;i<info.sources.length;i++){
          a=consegirlabel(info.sources[i]);
          b=consegirlabel(solution[i]);
          edges.forEach((edge) => {
            if(parseInt(edge.from)==info.sources[i]&&parseInt(edge.to)==solution[i]){
              matriz1[parseInt(edge.from)][parseInt(edge.to)] = "X";
            }
            else{
              
            }
            
          });
            // response.message = response.message.concat("El nodo ",a," es asignado a ",b,"\n");
            let object1 = {
                type: "node",
                id: info.sources[i],
                color: colors[i]
            };
            let object2 = {
                type: "edge",
                source: info.sources[i],
                target: solution[i],
                color: colors[i]
            };
            let object3 = {
                type: "node",
                id: solution[i],
                color: colors[i]
            };
            response.array.push(object1);
            response.array.push(object2);
            response.array.push(object3);
        }
    }
    console.log(response.message);
    console.log(response.array);
    console.log(matriz1);
    genera_tabla(matriz1);
    //  alert(mat(matriz1));
    //  ma=mat(matriz1);
    // document.getElementById('resp1').innerHTML = ma.ca;

    
   


    document.getElementById('mensaje').innerHTML = response.message;
    

    return response;
}
function consegirlabel(id1){
  console.log('hola1');
  console.log(id1);
  var label="";
  nodes.forEach((node)=>{
    console.log(node.id,' ',node.label);
    if(node.id==id1){
      label= node.label;
    }

  });
  return label;
}
function swap (alphabets, index1, index2) {
    let temp = alphabets[index1];
    alphabets[index1] = alphabets[index2];
    alphabets[index2] = temp;
    return alphabets;
  }
  
function permute (alphabets, startIndex, endIndex) {
    let aux = [];
    if (startIndex === endIndex) {
        for(let i=0;i<alphabets.length;i++){
            //console.log(alphabets[i]);
            aux.push(alphabets[i]);
        }
        //console.log(aux);
        permutations.push(aux);
    } else {
      for (let i = startIndex; i <= endIndex; i++) {
        alphabets = swap(alphabets, startIndex, i);
        permute(alphabets, startIndex + 1, endIndex);
        alphabets = swap(alphabets, i, startIndex);
      }
    }
  }


//This function convert a simple Adjacency Matrix into a Matrix with only sources and destinies
function correctMatrix(matrixad, info){
    let sources = [];
    let destinies = [];
    //Search for destinies
    for(let i=0;i<matrixad.length;i++){
        let isDestiny = true;
        for(let j=0;j<matrixad.length;j++){
            if(matrixad[i][j]!=0){
                isDestiny = false;
            }
        }
        if(isDestiny){
            destinies.push(i);
        }
    }
    info.destinies = destinies;
    //Search for destinies
    for(let i=0;i<matrixad.length;i++){
        let isSource = true;
        for(let j=0;j<matrixad.length;j++){
            if(matrixad[j][i]!=0){
                isSource = false;
            }
        }
        if(isSource){
            sources.push(i);
        }
    }
    info.sources = sources;
    //Complete a new Matrix
    let newMatrix = [];
    for(let i=0;i<sources.length;i++){
        let newRow = [];
        for(let j=0;j<destinies.length;j++){
            newRow.push(matrixad[sources[i]][destinies[j]]);
        }
        newMatrix.push(newRow);
    }
    return newMatrix;
}
function mat(matriz1){
  nodo1= [];
  
 nodes.forEach((node) => {
   nodo1.push({id:node.id, label:node.label, title:node.title, color:node.color});
 });
  var cad='<table class="table table-striped><tr><td></td>';
  for (i=0;i<nodes.length;i++){
    cad=cad+'<td>'+nodo1[i]["label"]+'</td>';
  }
  cad=cad+'</tr>';
  for(j=0;j<nodes.length;j++){
    cad=cad+'<tr><td>'+nodo1[j]["label"]+'</td>';

    for(k=0;k<nodes.length;k++){
      cad=cad+'<td>'+matriz1[j][k]+'</td>';

    }
    cad=cad+'</tr>';
  }
  cad=cad+'</table>';
  let ma= {
    ca: cad
  };
  return ma;
}
function genera_tabla(matriz1) {
  nodo1= [];
  
 nodes.forEach((node) => {
   nodo1.push({id:node.id, label:node.label, title:node.title, color:node.color});
 });
  // Obtener la referencia del elemento body
  var body = document.getElementsByTagName("body")[0];
  let finalTable = document.getElementById("finalTable");

  // Crea un elemento <table> y un elemento <tbody>
  var tabla   = document.createElement("table");
  var tblBody = document.createElement("tbody");
   
   for (var i = 0; i < 1; i++) {
    
    var hilera = document.createElement("tr");

    for (var j = 0; j < 1; j++) {
      
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(" ");
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }
    for (var j = 0; j < nodes.length; j++) {
      
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(nodo1[j]["label"]);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }

    
    tblBody.appendChild(hilera);
   }

  // Crea las celdas
  for (var i = 0; i < nodes.length; i++) {
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");
    var celda = document.createElement("td");
      var textoCelda = document.createTextNode(nodo1[i]["label"]);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);

    for (var j = 0; j < nodes.length; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(matriz1[i][j]);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }

    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }

  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  finalTable.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tabla);
  // modifica el atributo "border" de la tabla y lo fija a "2";
  tabla.setAttribute("border", "2");
}

function arnodo(){
  nodo1= [];
  edge1=[];
 nodes.forEach((node) => {
   nodo1.push({id:node.id, label:node.label, title:node.title, color:node.color});
 });
 console.log(nodo1);
 edges.forEach((edge) => {
   edge1.push({from:edge.from, to:edge.to, id:edge.id, label:edge.label});
 });
 console.log(edge1);
 var data1={node:nodo1,
 edge:edge1};
 return data1;

}
function download(){
 filename = prompt("Ingrese el nombre del del archivo");
 console.log(nodes);
 
 let file = new Blob([JSON.stringify(arnodo())], {type: "application/json "});
 let a = document.createElement('a');
 a.href=URL.createObjectURL(file);
 a.download=filename+'.json';
 a.click();
}
var network1=null;
function cargar(dn,de){
  //dn=[{"id":0,"label":"a","title":"Node a"},{"id":1,"label":"b","title":"Node b"}];
  console.log(dn[1]["id"]);
  console.log(nodeIdCounter);
  nodeIdCounter=dn[dn.length-1]["id"];
  nodeIdCounter++;
  console.log(nodeIdCounter);
   nodes = new vis.DataSet(dn);
  //de=[{"from":0,"to":1,"id":0,"label":"5"}];
   edges = new vis.DataSet(de);
  edgesIdCounter=de[de.length-1]["id"];
  edgesIdCounter++;
  data={
    nodes: nodes,
    edges: edges,
  };
  
  network1 = new vis.Network(container, data, options);
  
}
if(network1!=null){
  network=network1;
}


function leerArchivo(e) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    con2=JSON.parse(contenido);
    console.log(con2["node"]);
    console.log(con2["edge"]);
    cargar(con2["node"],con2["edge"]);
    //mostrarContenido(contenido);
  };
  lector.readAsText(archivo);
}

function mostrarContenido(contenido) {
  var con2
  con2=JSON.parse(contenido);
  console.log(con2["node"]);
  console.log(con2["edge"]);

}

document.getElementById('file-input')
  .addEventListener('change', leerArchivo, false);


