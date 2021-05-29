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


function noroeste(matrizad, nodes, task){
    let matriz1 = Array(nodes.length)
      .fill(0)
      .map(() => Array(nodes.length).fill(0));
    let colors = ["#800000","#FF0000","#FFA500","#808000","#800080","#FF00FF","#008000","#000080","#0000FF","#008080","#000000","#808080"];
    let response = {
        array: [],
        message: "",
    };
    let info = {
        sources: [],
        destinies: [],
        demand: [],
        disponibility: [],
        cost_matrix: []
    };
    let correctness = check_correctness(matrizad,nodes,info);
    if(correctness){
        console.log("SOURCES");
        console.log(info.sources.join(','));
        console.log("DESTINIES");
        console.log(info.destinies.join(','));
        console.log("DISPONIBILITY");
        console.log(info.disponibility.join(','));
        console.log("DEMAND");
        console.log(info.demand.join(','));
        console.log("Cost Matrix");
        console.log(info.cost_matrix.join("\n"));

        //Solution
        //Precharge Solution
        let sol = [];
        for(let i=0;i<info.cost_matrix.length;i++){
            let aux = [];
            for(let j=0;j<info.cost_matrix[i].length;j++){
                aux.push(0);
            }
            sol.push(aux);
        }
        if(task == "max"){
            //Maximization
            while(sum(info.disponibility)>0 && sum(info.demand)>0){
                //Calculate penalities and identify the maximum penality
                //rows
                let max_penalty_row = -1;
                let id_penalty_row = -1;
                let aux = [];
                for(let i=0;i<info.cost_matrix.length;i++){
                    aux = [];
                    for(let j=0;j<info.cost_matrix[i].length;j++){
                        if(info.disponibility[i]!=0 && info.demand[j]!=0){
                            aux.push(info.cost_matrix[i][j]);
                        }
                        if(aux.length > 0){
                            let penalty_row = calc_penalty_max(aux);
                            if(penalty_row>max_penalty_row){
                                max_penalty_row = penalty_row;
                                id_penalty_row = i;
                            }
                        }
                    }
                }
                //cols
                let max_penalty_col = -1;
                let id_penalty_col = -1;
                aux = [];
                for(let i=0;i<info.cost_matrix[0].length;i++){
                    aux = [];
                    for(let j=0;j<info.cost_matrix.length;j++){
                        if(info.disponibility[j]!=0 && info.demand[i]!=0){
                            aux.push(info.cost_matrix[j][i]);
                        }
                        if(aux.length>0){
                            let penalty_col = calc_penalty_max(aux);
                            if(penalty_col>max_penalty_col){
                                max_penalty_col= penalty_col;
                                id_penalty_col = i;
                            }
                        }
                    }
                }
                //maximize penalty
                if(max_penalty_row >= max_penalty_col){
                    //search for row
                    let target = get_col_of_maximum_value_row(info.cost_matrix,id_penalty_row,info.disponibility,info.demand);
                    if(info.disponibility[id_penalty_row]>=info.demand[target]){
                        info.disponibility[id_penalty_row] -= info.demand[target];
                        sol[id_penalty_row][target] = info.demand[target];
                        info.demand[target] = 0;
                    }
                    else{
                        info.demand[target] -= info.disponibility[id_penalty_row];
                        sol[id_penalty_row][target] = info.disponibility[id_penalty_row];
                        info.disponibility[id_penalty_row] = 0;
                    }
                }
                else{
                    //search for 
                    let target = get_row_of_maximum_value_col(info.cost_matrix,id_penalty_col,info.disponibility,info.demand);
                    if(info.disponibility[target]>=info.demand[id_penalty_col]){
                        info.disponibility[target] -= info.demand[id_penalty_col];
                        sol[target][id_penalty_col] = info.demand[id_penalty_col];
                        info.demand[id_penalty_col] = 0;
                    }
                    else{
                        info.demand[id_penalty_col] -= info.disponibility[target];
                        sol[target][id_penalty_col] = info.disponibility[target];
                        info.disponibility[target] = 0;
                    }
                }
            }
            console.log(sol.join("\n"));
        }
        else{
            //Minimization
            while(sum(info.disponibility)>0 && sum(info.demand)>0){
                //Calculate penalities and identify the maximum penality
                //rows
                let max_penalty_row = -1;
                let id_penalty_row = -1;
                let aux = [];
                for(let i=0;i<info.cost_matrix.length;i++){
                    aux = [];
                    for(let j=0;j<info.cost_matrix[i].length;j++){
                        if(info.disponibility[i]!=0 && info.demand[j]!=0){
                            aux.push(info.cost_matrix[i][j]);
                        }
                        if(aux.length > 0){
                            let penalty_row = calc_penalty_min(aux);
                            if(penalty_row>max_penalty_row){
                                max_penalty_row = penalty_row;
                                id_penalty_row = i;
                            }
                        }
                    }
                }
                //cols
                let max_penalty_col = -1;
                let id_penalty_col = -1;
                aux = [];
                for(let i=0;i<info.cost_matrix[0].length;i++){
                    aux = [];
                    for(let j=0;j<info.cost_matrix.length;j++){
                        if(info.disponibility[j]!=0 && info.demand[i]!=0){
                            aux.push(info.cost_matrix[j][i]);
                        }
                        if(aux.length>0){
                            let penalty_col = calc_penalty_min(aux);
                            if(penalty_col>max_penalty_col){
                                max_penalty_col= penalty_col;
                                id_penalty_col = i;
                            }
                        }
                    }
                }
                //maximize penalty
                if(max_penalty_row >= max_penalty_col){
                    //search for row
                    let target = get_col_of_minimum_value_row(info.cost_matrix,id_penalty_row,info.disponibility,info.demand);
                    if(info.disponibility[id_penalty_row]>=info.demand[target]){
                        info.disponibility[id_penalty_row] -= info.demand[target];
                        sol[id_penalty_row][target] = info.demand[target];
                        info.demand[target] = 0;
                    }
                    else{
                        info.demand[target] -= info.disponibility[id_penalty_row];
                        sol[id_penalty_row][target] = info.disponibility[id_penalty_row];
                        info.disponibility[id_penalty_row] = 0;
                    }
                }
                else{
                    //search for 
                    let target = get_row_of_minimum_value_col(info.cost_matrix,id_penalty_col,info.disponibility,info.demand);
                    if(info.disponibility[target]>=info.demand[id_penalty_col]){
                        info.disponibility[target] -= info.demand[id_penalty_col];
                        sol[target][id_penalty_col] = info.demand[id_penalty_col];
                        info.demand[id_penalty_col] = 0;
                    }
                    else{
                        info.demand[id_penalty_col] -= info.disponibility[target];
                        sol[target][id_penalty_col] = info.disponibility[target];
                        info.disponibility[target] = 0;
                    }
                }
            }
            console.log(sol.join("\n"));
        }
        //Fill animation

        let total_cost = 0,color_id = 0;;
        for(let i=0;i<sol.length;i++){
            for(let j=0;j<sol[i].length;j++){
                if(sol[i][j]>0){
                    total_cost += (sol[i][j]*info.cost_matrix[i][j]);
                    let object = {
                        type: "edge",
                        source: info.sources[i],
                        target: info.destinies[j],
                        color: colors[color_id%12],
                        ro: sol[i][j]
                    };
                    response.array.push(object);
                    console.log(info.sources[i]);
                    console.log(info.destinies[j]);
                    
                    matriz1[parseInt(info.sources[i])][parseInt(info.destinies[j])] = (sol[i][j].toString());
                      
                   //response.message = response.message + label_of(info.sources[i],nodes) + " envia " + sol[i][j].toString() + " unidades a "+ label_of(info.destinies[j],nodes)+ "#";
                    color_id += 1;
                }
            }
        }
        response.message = response.message + "El costo total es " + total_cost.toString();
    }
    else{
        response.message = response.message + "La demanda no coincide con la disponibilidad";
    }
    console.log(matriz1);
    genera_tabla(matriz1);
    console.log(response.message);
    document.getElementById('mensaje').innerHTML = response.message;
    return response;
}
function label_of(target, nodes){
    let res;
    for(let i=0;i<nodes.length;i++){
        if(nodes[i].id == target){
            res = nodes[i].nodeInputModalName;
        }
    }
    return res;
}
function calc_penalty_max(lista){
    let res =0;
    if(lista.length>1){
        //1st iteration
        let pos,max_value1=-1;
        for(let i=0;i<lista.length;i++){
            if(lista[i]>max_value1){
                max_value1 = lista[i];
                pos = i;
            }
        }
        lista[pos] = -1;
        //2nd iteration
        let max_value2 = -1;
        for(let i=0;i<lista.length;i++){
            if(lista[i]>max_value2){
                max_value2 = lista[i];
            }
        }
        res = max_value1 - max_value2;
    }
    else{
        res = lista[0];
    }
    return res;

}
function calc_penalty_min(lista){
    let res =0;
    if(lista.length>1){
        //1st iteration
        let pos,min_value1=1000000000;
        for(let i=0;i<lista.length;i++){
            if(lista[i]<min_value1){
                min_value1 = lista[i];
                pos = i;
            }
        }
        lista[pos] = 1000000000;
        //2nd iteration
        let min_value2 = 1000000000;
        for(let i=0;i<lista.length;i++){
            if(lista[i]<min_value2){
                min_value2 = lista[i];
            }
        }
        res = min_value2 - min_value2;
    }
    else{
        res = lista[0];
    }
    return res;

}
function get_col_of_maximum_value_row(cost, row, disponibility, demand){
    let pos_max, max_val = -1;
    for(let i=0;i<cost[row].length;i++){
        if(disponibility[row]!=0 && demand[i]!=0){
            if(cost[row][i]>max_val){
                max_val = cost[row][i];
                pos_max = i;
            }
        }
    }
    return pos_max;
}
function get_row_of_maximum_value_col(cost, col, disponibility, demand){
    let pos_max, max_val = -1;
    for(let i=0;i<cost.length;i++){
        if(disponibility[i]!=0 && demand[col]!=0){
            if(cost[i][col]>max_val){
                max_val = cost[i][col];
                pos_max = i;
            }
        }
    }
    return pos_max;
}
function get_col_of_minimum_value_row(cost, row, disponibility, demand){
    let pos_max, min_val = 1000000000;
    for(let i=0;i<cost[row].length;i++){
        if(disponibility[row]!=0 && demand[i]!=0){
            if(cost[row][i]<min_val){
                min_val = cost[row][i];
                pos_max = i;
            }
        }
    }
    return pos_max;
}
function get_row_of_minimum_value_col(cost, col, disponibility, demand){
    let pos_max, min_val = 1000000000;
    for(let i=0;i<cost.length;i++){
        if(disponibility[i]!=0 && demand[col]!=0){
            if(cost[i][col]<min_val){
                min_val = cost[i][col];
                pos_max = i;
            }
        }
    }
    return pos_max;
}
function sum(lista){
    let sum = 0;
    for(let i=0;i<lista.length;i++){
        sum += lista[i];
    }
    return sum;
}
function check_correctness(matrizad, nodes, info){
    let total_demand = 0, total_disponibility = 0;
    let res = false;
    for(let i=0;i<nodes.length;i++){
        let current_node = nodes[i].id;
        let value_node = nodes[i].nodeInputModalValue;
        if(is_source(current_node, matrizad)){
            total_disponibility += value_node;
            info.sources.push(current_node);
            info.disponibility.push(value_node);
        }
        else{
            total_demand += value_node;
            info.destinies.push(current_node);
            info.demand.push(value_node);
        }
    }
    for(let i=0;i<info.sources.length;i++){
        let aux = [];
        for(let j=0;j<info.destinies.length;j++){
            aux.push(matrizad[info.sources[i]][info.destinies[j]]);
        }
        info.cost_matrix.push(aux);
    }
    if(total_demand == total_disponibility){
        res = true;
    }
    return res;
}
function is_source(id, matrizad){
    let res = true;
    for(let i=0;i<matrizad.length;i++){
        if(matrizad[i][id]!=0){
            res = false;
        }
    }
    return res;
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
// let nodes1 = [
//     {
//         id: 0,
//         nodeInputModalName: "Alpha",
//         nodeInputModalValue: 10,
//     },
//     {
//         id: 1,
//         nodeInputModalName: "Betha",
//         nodeInputModalValue: 10,
//     },
//     {
//         id: 2,
//         nodeInputModalName: "Gamma",
//         nodeInputModalValue: 7,
//     },
//     {
//         id: 3,
//         nodeInputModalName: "A",
//         nodeInputModalValue: 4,
//     },
//     {
//         id: 4,
//         nodeInputModalName: "B",
//         nodeInputModalValue: 8,
//     },
//     {
//         id: 5,
//         nodeInputModalName: "C",
//         nodeInputModalValue: 10,
//     },
//     {
//         id: 6,
//         nodeInputModalName: "D",
//         nodeInputModalValue: 5,
//     },

// ];
// let matrizad = [[0,0,0,2,3,6,7],
//                 [0,0,0,1,2,3,7],
//                 [0,0,0,7,6,2,3],
//                 [0,0,0,0,0,0,0],
//                 [0,0,0,0,0,0,0],
//                 [0,0,0,0,0,0,0],
//                 [0,0,0,0,0,0,0]];

//noroeste(matrizad,nodes1,"max");

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




function arnodo(){
    nodo1= [];
    edge1=[];
   nodes.forEach((node) => {
     nodo1.push({id:node.id, label:node.label, title:node.title, color:node.color, valor:node.valor});
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
  
