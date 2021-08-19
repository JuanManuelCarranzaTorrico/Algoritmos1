
var cIdN = 0;
var cIdE = 0;
var Matriz;

var container = document.getElementById("mynetwork");

var locales = {
  en: {
    edit: 'Editar',
    del: 'Eliminar',
    back: 'Volver',
    addNode: 'Agregar nodo',
    addEdge: 'Agregar enlace',
    editNode: 'Editar nodo',
    editEdge: 'Editar enlace',
    addDescription: 'Haga click en un espacio vacio para agregar un nuevo nodo.',
    edgeDescription: 'Haga click en un nodo y arrastre el enlace hasta otro nodo para conectarlos.',
    editEdgeDescription: 'Haga click en cualquiera de los puntos y arrastrelos hasta el nodo que quiera conectar.',
    createEdgeError: 'Cannot link edges to a cluster.',
    deleteClusterError: 'Clusters cannot be deleted.',
    editClusterError: 'Clusters cannot be edited.'
  }
}

var nodes = new vis.DataSet([]);
  
  var edges = new vis.DataSet([]);
  
 
  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {
    width: "100%",
    height: "800px",
    
    locale: 'en',
    locales: locales,
    manipulation:{
      addNode:function(nodeData,callback){
        addNodo(nodeData,callback);
      },
      addEdge:function(edgeData,callback){
        addEnlace(edgeData,callback);
      },
      editNode:function(nodeData,callback){
        editarNodo(nodeData,callback);
      },
      editEdge: function(edgeData,callback){
        editarEnlace(edgeData,callback);
      }
      
    },
    nodes: {
      physics: false,
      fixed: true,
      color: "#F8F8FF",
      font: {
        color: "black",
        size: 24,
      },
    },
    edges: {
      color: {
        color: "#000000",
        highlight: "#848484",
        hover: "#848484",

      },
   
    font: {
      color: "#f5f5f5",
      size: 10,
      align: "horizontal",
      background: "none",
      strokeWidth: 0,
      align: "top",
      size: 24,
    },
  },
};


const addNodo = (nodeData,callback) =>{
  var nom;
  if (nodes.length == 0) {
    cIdN = 0;
  }
  
  do{
    nom = prompt("Nombre del nodo:","");
    X = prompt("Coordenada X:","");
    Y = prompt("Coordenada Y:","");
    if (nom.length == 0 || X.length == 0 || Y.length == 0) {
      alert("Campo vacio");
    }
  }while(nom.length == 0 && X.length == 0 && Y.length == 0);
  
  nodeData.id = cIdN++;
  nodeData.label = nom;
  nodeData.x=parseFloat(X);
  if(Y!=0){
    nodeData.y=(Y*(-1));
  }else{
    nodeData.y=parseFloat(Y);
  }
  
  t=String('x: '+X+'|y: '+Y);
  nodeData.title = t;

  callback(nodeData);
};

const addEnlace = (edgeData,callback) =>{
  edgeData.id = cIdE++;
  callback(edgeData);
};

const editarNodo = (nodeData,callback) =>{
  var nom;
  var control=false;
  
  while (control == false) {
    nom = prompt("Nuevo nombre del nodo:");
    X = prompt("Nueva coordenada X:","");
    Y = prompt("Nueva coordenada Y:","");
    if (nom.length == 0 || X.length == 0 || Y.length == 0) {
      alert("Campo vacio");
    }else{
      control=true;
    }
  }
  t=String('x: '+X+'|y: '+Y);
  nodeData.label = nom;
  nodeData.x=parseFloat(X);
  nodeData.y=parseFloat(Y);
  nodeData.title=t;
  callback(nodeData);
};

const editarEnlace = (edgeData,callback) =>{
  callback(edgeData);
};


const exportG = () => {
  var filename;
  do{
    filename = prompt("Nombre del archivo:");
    if (filename.length == 0) {
      alert("Archivo no definido");
    }
  }while(filename.length == 0)
  ArrayNodos()
  let file = new Blob([JSON.stringify(ArrayNodos())],{type: "application/json"});
  let a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = `${filename}.json`;
  a.click();
  
};
or=edges;
function ArrayNodos(){
      l= [];
     Anodo= [];
     Aenlace=[];
      nodes.forEach((nodo) => {
        if (nodo.label !== 'center') {
          Anodo.push({id:nodo.id, label:nodo.label, x:nodo.x, y:nodo.y, title:nodo.title});
        }
        
      });
      //console.log(Anodo);
      or.forEach((enlace) => {
        Aenlace.push({from:enlace.from, to:enlace.to, id:enlace.id});
      });
      //console.log(Aenlace);
      var Exportdata={
        node:Anodo,
        edge:Aenlace
      };
      return Exportdata;
  };

function Resolver(){
  var nodos=clear();
  sx=0;
  sy=0;
  for (var i = 0; i < nodos.length; i++) {
    sx +=nodos[i].x;
    sy +=nodos[i].y;
  }
  console.log('sumx',sx);
  console.log('sumy',sy);
  n=nodos.length;
  promx=(sx/n);
  promy = sy/n;
  console.log('X: ',promx,'Y: ',promy);
  t=String('x: '+promx+'|y: '+promy);
  alert('X: '+promx+' Y: '+promy);
  nodes.update({id: cIdN++, label: '', title:t, x:promx, y:(promy)*(-1), color:"#00FF00"});

};




function clear(){
  nodes.forEach((no)=>{
    //console.log('nodo ',no);
  })
  var nu=[];
  nodes.forEach((no)=>{
    coo=no.title.split('|');
    prex=coo[0].split(': ');
    prey=coo[1].split(': ');
   // console.log('px',prex);
    //console.log('py',prey);
    if (no.x==parseFloat(prex[1]) && no.y==parseFloat(prey[1])) {
      aux=no;
      nu.push(aux);
    }else{
      if (no.x!=parseFloat(prex[1])){
         nu.push({id:no.id, label:no.label, x:(no.x)*(-1), y:no.y});
        
      }else if (no.y!=parseFloat(prey[1])) {
        nu.push({id:no.id, label:no.label, x:no.x, y:(no.y)*(-1)});
      }
    }

  })
  console.log('nu',nu);
  return nu;
}

network = new vis.Network(container, data, options);








var network1=null;


function cargar(dn,de){
  //dn=[{"id":0,"label":"a","title":"Node a"},{"id":1,"label":"b","title":"Node b"}];
  console.log(dn[1]["id"]);
  console.log(cIdN);
  cIdN=dn[dn.length-1]["id"];
  cIdN++;
  console.log(cIdN);
   nodes = new vis.DataSet(dn);
  //de=[{"from":0,"to":1,"id":0,"label":"5"}];
   edges = new vis.DataSet(de);
  cIdE=de[de.length-1]["id"];
  cIdE++;
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


