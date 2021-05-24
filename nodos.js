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

var options = {
  interaction: {
    hover: true,
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
    deleteNode: false,
    deleteEdge: false,
  },
  nodes: {
    color: "#FFFFFF",
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
function arnodo(){
   nodo1= [];
   edge1=[];
  nodes.forEach((node) => {
    nodo1.push({id:node.id, label:node.label, title:node.title});
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






  
  //Johnson
  const Jhonson = () =>{
    Arrayen=[];
    ArrayAppi = [];
    ArrayAtpf = [];
  
    punt=[];
    p=0;
    edges.forEach((enlace)=>{
      if (enlace.from == p) {
        dato = new llenarAppi(enlace.from,enlace.from);
        ArrayAppi.push(dato);
        
        punt=[enlace.to,enlace.label];
        appiant=parseFloat(enlace.from);
        a=parseFloat(enlace.label);
        appi = appiant + a;
        dato = new llenarAppi(enlace.to,appi);
        ArrayAppi.push(dato);
        antt=enlace.to;
        p=-1;
      }else{
        console.log(enlace+'\n....'+antt+' antt......punt0 '+punt[0]);
        if(antt != enlace.to && punt[0] == enlace.from){
            appiant=parseFloat(punt[1]);
            a=parseFloat(enlace.label);
            appi = appiant + a;
            dato = new llenarAppi(enlace.to,appi);
            ArrayAppi.push(dato);
            antt=enlace.to;
        }else{
          if (antt != enlace.to && punt[0] != enlace.from) {
             for (let app of ArrayAppi){
                if (app.id==enlace.from) {
                  appiant=parseFloat(app.appi);
                  a=parseFloat(enlace.label);
                  appi = appiant + a;
                  dato = new llenarAppi(enlace.to,appi);
                  //console.log(dato);
                  ArrayAppi.push(dato);
                  break;
                }
              }
                  antt=enlace.to;
                  punt=[enlace.from,appi];
          }else{
                for (let app of ArrayAppi){
                  if (app.id==enlace.from) {
                    appiant=parseFloat(app.appi);
                    a=parseFloat(enlace.label);
                    appi = appiant + a;
                    if (appi > parseFloat(punt[1])) {
                      change=false;
                      for (let ap of ArrayAppi){
                        if (ap.id==enlace.to) {
                          ap.appi=appi;
                          change=true;
                          break;
                        }
                      }
                      if(change==false){
                          dato = new llenarAppi(enlace.to,appi);
                          console.log(dato);
                          ArrayAppi.push(dato);break;
                        
                      }
                      punt=[enlace.to,appi];antt=enlace.to;break;
                    }else{
                      
                      punt=[enlace.to,punt[1]];antt=enlace.to;break;
                    }
  
                  }
              }
          }
          
        }
        
      }
    });
  
    edges.forEach((enlace)=>{
      dato = new llenarAen(enlace.from,enlace.to,enlace.label);
      Arrayen.push(dato);
    });
  
    antf=0;
    j =ArrayAppi.length - 1;
    p =ArrayAppi[j].id;
    console.log(Arrayen);
    for (var i = Arrayen.length - 1; i >= 0; i--) {
      //console.log(Arrayen[i].to+' to ..........id '+ArrayAppi[j].id);
      if (Arrayen[i].to == p) {
          dato = new llenarAtpf(Arrayen[i].to,ArrayAppi[j].appi);
          //console.log(dato);
          ArrayAtpf.push(dato);
          atpfant=parseFloat(ArrayAppi[j].appi);
          a=parseFloat(Arrayen[i].label);
          //console.log('att = '+a);
          atpf = atpfant - a;
          dato = new llenarAtpf(Arrayen[i].from,atpf);
          ArrayAtpf.push(dato);
          antf=Arrayen[i].from;
          punt=[Arrayen[i].from,atpf];
          //console.log(punt);
          p=-1;
      }else{
        if (antf != Arrayen[i].from && punt[0] == Arrayen[i].to) {
          ex=false;aux=0;
          for (let atp of ArrayAtpf) {
            if(Arrayen[i].from==atp.id){
              atpfant=parseFloat(punt[1]);
              a=parseFloat(Arrayen[i].label);
              atpfA = atpfant - a;aux=atp.atpf;ex=true;break;
            }
          }
          if (ex) {
            if (atpfA<aux) {
              for (let atp of ArrayAtpf) {
                if(Arrayen[i].from==atp.id){
                  atp.atpf=atpfA;break;
                }
              }
            }
          }else{
            atpfant=parseFloat(punt[1]);
            a=parseFloat(Arrayen[i].label);
            atpf = atpfant - a;
            dato = new llenarAtpf(Arrayen[i].from,atpf);
            //console.log(dato);
            ArrayAtpf.push(dato);
          }
          
          anft=Arrayen[i].from;
        }else{
          
          if (Arrayen[i].to != punt[0] &&  antf != Arrayen[i].from) {
            for (let atp of ArrayAtpf) {
              if (Arrayen[i].to==atp.id) {
                atpfant=parseFloat(atp.atpf);
                //console.log('atpfant ='+atpfant);
                a=parseFloat(Arrayen[i].label);
  
                atpf = atpfant - a;
                dato = new llenarAtpf(Arrayen[i].from,atpf);
                ArrayAtpf.push(dato);
                antf=Arrayen[i].from;
                punt=[Arrayen[i].from,atpf];
                break;
              }
            }        
            
          }else{
            for (let atp of ArrayAtpf) {
              if (Arrayen[i].to==atp.id) {
                atpfant=parseFloat(atp.atpf);
                a=parseFloat(Arrayen[i].label);
                atpf = atpfant - a;
                if (atpf < parseFloat(punt[1])) {
                  change=false;
                      
                  for (let at of ArrayAtpf) {
                    if(at.id == punt[0]){
                      at.atpf = atpf;
                      break;
                    }
                  }
                  antf=Arrayen[i].from;
                  punt=[Arrayen[i].from,atpf];
                }else{
                  antf=Arrayen[i].from;
                  punt=[Arrayen[i].from,punt[1]];
                  break;
                }
              }
            }
          }
        }
      }
    }
  
    AddElement(ArrayAppi,ArrayAtpf);
    rutaCritica(ArrayAppi,ArrayAtpf);
  }
  
  function llenarAen(from,to,label){
    this.from=from;
    this.to=to;
    this.label=label;
  }
  
  function llenarAppi(id,appi){
    this.id=id;
    this.appi=appi;
  }
  
  function llenarAtpf(id,atpf){
    this.id=id;
    this.atpf=atpf;
  }
  
  const AddElement=(ArrayAppi,ArrayAtpf)=>{
    aux = ArrayAtpf.reverse();
    console.log(ArrayAppi);
    console.log(aux);
    for (var i = 0; i <= ArrayAppi.length - 1; i++) {
      if (ArrayAppi[i].id == aux[i].id) {
        nodes.forEach((nodo)=>{
          if (nodo.id == aux[i].id) {
            t=String('appi:'+ArrayAppi[i].appi+' | atpf:'+aux[i].atpf);
            nodes.update({id: nodo.id, title:t});
          }
        });
      }
    }
  
  }
  
  const rutaCritica=(ArrayAppi,ArrayAtpf)=>{
    Nodo = [];
    for (var i = 0; i <= ArrayAppi.length - 1; i++) {  
      if (ArrayAppi[i].id == ArrayAtpf[i].id) {
        dato = new llenarNodo(ArrayAppi[i].id,ArrayAppi[i].appi,ArrayAtpf[i].atpf);
        Nodo.push(dato);
      }
    }
    edges.forEach((enlace)=>{
      for (var i = 0; i <= Nodo.length - 1; i++) {  
        if (enlace.from == Nodo[i].id) {
          ap=Nodo[i].appi;
        }else{
          if (enlace.to == Nodo[i].id) {
            at=Nodo[i].atpf;
          }
        }
      }
      h = at - ap - parseFloat(enlace.label);
      t = String(enlace.label+"\nh="+h);
      edges.update({id: enlace.id, label:t});
      
      if (h==0) {
        t= enlace.label+"\nh="+h;
        edges.update({id: enlace.id, color:"#00FF00"});
      }
      
    });
  }
  
  function llenarNodo(id,appi,atpf){
    this.id=id;
    this.appi=appi;
    this.atpf=atpf;
  }