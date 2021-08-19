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
  var valor;
  var tipo=true;
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
      while (!valueIsEmpty(valor)) {
        valor = prompt("Disponibilidad:");
      }
    }
    else
    {
        nodeData.tipo=false;
        nodeData.color="#F1321C";
        while (!valueIsEmpty(valor)) {
            valor = prompt("Demanda:");
          }
    }
    nodeData.valor=valor;
    console.log(nodeData);
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

function north_west_corner(supply, demand) {
    var num =0;
    nodes.forEach((node)=>{
        if(node.val == 0){
            num++;
        }
    });
    var num1 = 0;
    nodes.forEach((node)=>{
        if(node.val == 1){
            num1++;
        }
    });
    
    let matrix;
    /*let matrix2 = Array(num)
    .fill(0)
    .map(() => Array(num).fill(0));*/
    var  sdem = 0,ssup =0;
    for (var i=0;i<supply.length;i++){
        ssup += supply[i];
    }
    for (var i=0;i<demand.length;i++){
        sdem += demand[i];
    }
    var auxc = false;
    var auxr = false;
    console.log("suply ",ssup);
    console.log("dem ",sdem);
    if (sdem < ssup){
        console.log("llego caso 1");
        res = ssup - sdem;
        supply_copy = supply;
        demand_copy = demand;
        demand_copy.push(res);
        console.log(demand_copy);
        
       matrix = Array(num)
        .fill(0)
        .map(() => Array(num).fill(0));
        var c = 0;
        var t = 0;
    edges.forEach((edge)=>{
        
        if(c == num1-1){
            matrix[t][c] = 0;
            t++;
        }
        if(c==num1){
            c = 0;
        }

        matrix[parseInt(edge.from)-1][c]=parseFloat(edge.label);
        
        
        c++;
        
    });
    auxc = true;
    console.log(matrix);
    }else{
    if (ssup <sdem  ){
        console.log("llego caso 2");
        res = sdem-ssup;
        supply_copy = supply;
        demand_copy = demand;
        supply_copy.push(res);
        console.log(supply_copy);
         matrix = Array(num1)
        .fill(0)
        .map(() => Array(num1).fill(0));
    
    var c = 0;
    var f = 0;
    var change  = 0;
    edges.forEach((edge)=>{
        if(c==num1){
            c = 0;
            f++;

        }
        if(f==num1){
            f = 0;
        }
        
        if(f == num1-1){
            matrix[f][change] = 0;
            change ++;
        }
        
            console.log(parseInt(edge.from)-1," f");
            console.log("colu ",c);
        matrix[parseInt(edge.from)-1][c]=parseFloat(edge.label);
        
        
        c++;
        
        
    });
    console.log(matrix);
    auxr = true;
}
    else{
        console.log("llego caso 3");
    supply_copy = supply;
    demand_copy = demand;
    matrix = Array(num)
        .fill(0)
        .map(() => Array(num).fill(0));
        var c = 0;
    edges.forEach((edge)=>{
        if(c==num){
            c = 0;
        }
       
        matrix[parseInt(edge.from)-1][c]=parseFloat(edge.label);
        
        
        c++;
        
    });
}
}
    i = 0;
    j = 0;
    
    console.log()
    bfs = [];
    is=[];
    js=[];
    vl=[];
    dcc = [...demand_copy];
    scc = [...supply_copy];
    console.log(dcc);
    console.log(scc);
    while (bfs.length < supply.length + demand.length - 1) {
      s = supply_copy[i];
      d = demand_copy[j];
      v = s > d ? d : s;
      supply_copy[i] -= v;
      demand_copy[j] -= v;
      bfs.push([i,j,v]);
      is.push(i);
      js.push(j);
      vl.push(v);
      console.log(i, j, v);
      if (supply_copy[i] == 0 && i < supply.length - 1) i += 1;
      if (demand_copy[j] == 0 && j < demand.length - 1) j += 1;
    }
    
    var sumt = 0;
    var cad = " ";
    var matrixtomax = Array(num)
        .fill(0)
        .map(() => Array(num).fill(0));
    console.log(matrixtomax);
    /*for (var i=0;i<matrix.length;i++){
        for (var j=0;j<matrix.length;j++){
            if (matrix3[i][j]==0){
                matrixtomax[i][j] = matrix[i][j];
            }
        }
    }*/
    
    
    for (i = 0; i <is.length;i++){
                val  = matrix[is[i]][js[i]];
                nval = val * vl[i];
                sumt += nval;
                cad = + matrix[is[i]][js[i]]+"-> "+vl[i] ;
                //matrixtomax[is[i]][js[i]] = matrix[is[i]][js[i]]
                matrix[is[i]][js[i]] = cad; 
            
        
    }
    console.log(matrixtomax);
   /* var nrows = [];
    var ncol = [];
    nrows.push(matrixtomax[0][0]-1);
    for (var i=0;i<matrixtomax.length;i++){
        for (var j=0;j<matrixtomax.length;j++){
            if(i==0 && j==0){
            if(nrows[i]<matrixtomax[i][j]){
                var c = matrixtomax[i][j]-nrows[i];
                ncol.push(c);
            }
        }
        var dat = matrixtomax[i][j]
        if(dat!=0){
            if(matrixtomax[i][j]<ncol[i]){
                var d = matrixtomax[i][j]-ncol[i];
                nrows.push(d);
            }
            else{
                var d = -matrixtomax[i][j]+ncol[i];
                nrows.push(d);
            }
        }

        }

    }
    console.log(nrows,"jdknnsakjdhaskjd");
    console.log("dsajdiuasjdioasd",ncol);*/
    console.log(matrix);
    console.log(sumt);
    //console.log(bfs);
    rowList = [];
    colList = [];
    console.log("sdsdsdsd",dcc);
    console.log("ajshjdsjsj",scc);
    for (let i = 0; i < dcc.length; i++) {
      rowList.push(scc[i]);
      colList.push(dcc[i]);
    }
  console.log(rowList);
  console.log(colList);
    //MOSTRAR MATRIZ
    var num1 = 0;
    nodes.forEach((node)=>{
        if(node.val == 1){
            num1++;
        }
    });
    nombresNodos = [];
    nom = [];
    let showMatrix = " ,";
    nodes.forEach((node)=>{
        if (node.val == 0){
            nombresNodos.push(node.label);
              }
           
              if(node.val ==1){
                showMatrix += node.label + ",";
                  nom.push(node.label);
              }
            
    });
   
    var extra = 0;
    
    
    if (auxc){
        showMatrix += "AUX ,";
        nom.push("AUX"); 
        
    }
    
  
    showMatrix += "DISP.|";
    if(auxr){
        //showMatrix += "AUX ,";
        nombresNodos.push("AUX");
        extra++;
    }
    for (let i = 0; i < nom.length; i++) {
      showMatrix += nombresNodos[i] + ",";
      for (let j = 0; j < nom.length; j++) {
        showMatrix += matrix[i][j] + ",";
      }
  
      showMatrix += rowList[i] + "|";
    }
    
  
    showMatrix += "DEMANDA,";
    colList.forEach((col) => (showMatrix += col + ","));
    console.log(showMatrix);
     var v = document.getElementById('valor');
    v.innerHTML=`Attr = ${sumt}`;
    parseArray1(showMatrix,extra);

    return bfs;
}
//---------------constructor de table--------
const parseArray1 = (matriz,otro) => {
    var num =0;
    nodes.forEach((node)=>{
        if(node.val == 0){
            num++;
        }
    });
    let final = Array(num + 2+otro)
      .fill(0)
      .map(() => Array(num+ 2+otro).fill(0));
  
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

  function Kramer(task){
    nod1=[];
    nodes.forEach(nod => {
        nod1.push({id:nod.id, nodeInputModalName:nod.label, nodeInputModalValue: parseInt(nod.valor) });
    });
    console.log(nod1);
    let matrixad = Array(nodes.length)
      .fill(0)
      .map(() => Array(nodes.length).fill(0));
    
    edges.forEach((edge) => {
        matrixad[parseInt(edge.from)][parseInt(edge.to)] = parseInt(edge.label);
      });
      console.log(matrixad);
      noroeste(matrixad,nod1,task);
}