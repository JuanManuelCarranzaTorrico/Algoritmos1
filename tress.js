var width = 1200;
var height = 1200;
var margin = { top: 0, bottom: 0, left: 0, right: 0};
    
class Tree {
  constructor() {
    this.root = null;
  }
  toObject() {
    return this.root;
  }


  add(num) {
   //console.log(num);
   
    if (!this.root) {
      this.root = new Node(num);
      
    } else {
      let node = this.root;

      while (true) {
        node.visited = true
        if (num < node.value) {
          if (node.left) {
            node = node.left;
          } else {
            node.left = new Node(num);
            return;
          }
        } else {
          if (node.right) {
            node = node.right;
          } else {
            node.right = new Node(num);
            return;
          }
        }
      }
    }
    
    
    
  }
  
 
  clearVisited() {
    
    preorderTraverse_clear(this.root,[])
    
  }
  
  
}
var arr=[];
var arbol;
function are(num){
   
    console.log(num);
    
    var r=arr.push(num);
    console.log(arr);
    arbol = buildTree(arr);

    
}

function trees(nodes, task){
  var res = document.getElementById('mynetwork');
    let arbol = buildTree(nodes);
    let response = {
        array: [],
        message: ""
    };
    //console.log(arbol.join(","));

    if(task=="in"){
        response.message = "Inorden\n";
        inorder(1, arbol, response);
    }
    if(task=="pre"){
        response.message = "Preorden\n";
        preorder(1, arbol,response);
    }
    if(task=="post"){
        response.message = "Postorden\n";
        postorder(1, arbol, response);
    }
    res.style.display = "block";
    let aux = "";
    for(let i=0;i<response.message.length-1;i++){
        aux = aux + response.message[i];
        
    }
   
    response.message = aux;
    alert(response.message);
    
    
    
    
    
    console.log(response.message+'\n');
    
}
function resultado(){
  
    trees(arr,"pre");

  trees(arr,"in");
    trees(arr,"post");

}
function inorder(pos, arbol, response){
    if(arbol[pos]==-1){
        return;
    }
    response.array.push({
        node: arbol[pos]
       
    });
    inorder(pos*2,arbol, response);
    response.array.push({
        node: arbol[pos]
        
    })
    response.message =response.message + arbol[pos] + ",";
    inorder((pos*2)+1,arbol, response); 
    return;
}
function preorder(pos, arbol, response){
    if(arbol[pos]==-1){
        return;
    }
    response.array.push({
        node: arbol[pos]
        
    })
    response.message =response.message + arbol[pos] + ",";
    preorder(pos*2,arbol, response);
    preorder((pos*2)+1,arbol, response); 
    return;
}
function postorder(pos, arbol, response){
    if(arbol[pos]==-1){
        return;
    }
    response.array.push({
        node: arbol[pos]
      
    })
    postorder(pos*2, arbol, response);
    postorder((pos*2)+1, arbol, response);
    response.array.push({
        node: arbol[pos]
        
    })
    response.message =response.message + arbol[pos] + ",";
    return;

}

function buildTree(nodes){
    let arbol = [];
    for(let i=0;i<1000000;i++){
        arbol.push(-1);
    }
    let pos;
    for(let i=0;i<nodes.length;i++){
        pos = 1;
        while(arbol[pos]!=-1){
            if(nodes[i]<arbol[pos]){
                pos=pos*2;
            }
            else{
                if(nodes[i]>arbol[pos]){
                    pos=(pos*2)+1;
                }
                else{
                    if(arbol[pos]==nodes[i]){
                        break;
                    }
                }
            }
        }
        arbol[pos]=nodes[i];
    }

    return arbol;
}








class Node {
  constructor(value, left = null, right = null,visited=true) {
    this.left = left;
    this.right = right;
    this.value = value;
    this.visited = visited;
  }
}
const preorderTraverse_clear = (node, array) => {
  if (!node) return array;

  node.visited = false

  array = preorderTraverse_clear(node.left, array);
  array = preorderTraverse_clear(node.right, array);
  return array;
};
    
    
    
    
const preorderTraverse = (node, array, y, x, sign) => {
  if (!node) return array;

  if (y === 0) {
    array.push({ value: node.value, y: 0, x: 0 ,visited:node.visited});
  } else {
    x = x + (sign * 2) / Math.pow(2, y);
    array.push({ value: node.value, y: y, x: x, visited:node.visited });
  }
  y = y + 1;

  array = preorderTraverse(node.left, array, y, x, -1);
  array = preorderTraverse(node.right, array, y, x, 1);
  return array;
};

const preorderTraverse_link = (node, linkarray, y, x, sign) => {
  if (!node) return linkarray;
  var prev_x = x;
  var prev_y = y - 1;

  if (y === 0) {
  } else {
    x = x + (sign * 2) / Math.pow(2, y);
    linkarray.push({ source: [prev_x, prev_y], target: [x, y] });
  }
  y = y + 1;

  linkarray = preorderTraverse_link(node.left, linkarray, y, x, -1);
  linkarray = preorderTraverse_link(node.right, linkarray, y, x, 1);
  return linkarray;
};

var topMargin = 50;

const convertToXY = (item) => {
  var node = {};
  node.value = item.value;
  node.y = item.y * 50 + topMargin;
  node.x = item.x * 200 + 400;
  node.visited = item.visited;
  return node;
};

const convertLinkToXY = (item) => {
  var node = { source: [], target: [] };
  node.source[0] = item.source[0] * 200 + 400;
  node.source[1] = item.source[1] * 50 + topMargin;
  node.target[0] = item.target[0] * 200 + 400;
  node.target[1] = item.target[1] * 50 + topMargin;
  return node;
};

let tree = new Tree();

    
var treeArray = preorderTraverse(tree.root, [], 0, 0, 1);
treeArray = treeArray.map(convertToXY);
var svg = d3
  .select("body")
  .append("svg");
    
   
var nodes = svg.append("g")
           .attr("class", "nodes")
           .selectAll("circle")
           .data(treeArray)
           .enter()
           
           .append("g")
          
    			 .attr("transform",d => "translate(" + d.x + "," + d.y + ")");


nodes.append("circle")
      .attr("class", "node")
			.attr("fill" , "white")
			.attr("stroke" , "black")
      .attr("r", 20);


nodes.append("text")
     .attr("text-anchor", "middle")
		 .attr("y", ".3em")
     .text(d => d.value);    
    
var linkGen = d3.linkVertical();
    
var prevLink=[]
function resetTree() {
   
  location.reload();
}

function addn(){
 var sar=document.getElementById('num').value;
 let arr2 = sar.split(',');
    arr=[];
    arr2.forEach(a => {
        x=parseInt(a);
        arr.push(x);
    });
    arr.forEach(b =>{
      console.log(b);
      tree.clearVisited();
      tree.add(b);
      are(b);
      var treeArray = preorderTraverse(tree.root, [], 0, 0, 1);
  
  var treelinkArray = preorderTraverse_link(tree.root, [], 0, 0, 1);

  treeArray = treeArray.map(convertToXY);
  var treelinkArrayAft = treelinkArray.map(convertLinkToXY);
  var treelinkArrayBef = treelinkArray.map(convertLinkToXY);
  
  var mydiff = _.cloneDeep(_.differenceWith(treelinkArrayBef,prevLink,_.isEqual))
 
  
  prevLink = _.cloneDeep(treelinkArrayBef)
  for (let i = 0;i<prevLink.length;i++){
    if(_.isEqual(prevLink[i].source,mydiff[0].source) && _.isEqual(prevLink[i].target,mydiff[0].target) )
      prevLink[i].target = prevLink[i].source
  }
  
 
  updateTree(treeArray,prevLink,treelinkArrayBef);
  prevLink = _.cloneDeep(treelinkArrayBef);
    });
//  console.log(sar);
//  tree.clearVisited();
//  tree.add(sar);
//  are(sar);
//  var treeArray = preorderTraverse(tree.root, [], 0, 0, 1);
  
//   var treelinkArray = preorderTraverse_link(tree.root, [], 0, 0, 1);

//   treeArray = treeArray.map(convertToXY);
//   var treelinkArrayAft = treelinkArray.map(convertLinkToXY);
//   var treelinkArrayBef = treelinkArray.map(convertLinkToXY);
  
//   var mydiff = _.cloneDeep(_.differenceWith(treelinkArrayBef,prevLink,_.isEqual))
 
  
//   prevLink = _.cloneDeep(treelinkArrayBef)
//   for (let i = 0;i<prevLink.length;i++){
//     if(_.isEqual(prevLink[i].source,mydiff[0].source) && _.isEqual(prevLink[i].target,mydiff[0].target) )
//       prevLink[i].target = prevLink[i].source
//   }
  
 
//   updateTree(treeArray,prevLink,treelinkArrayBef);
//   prevLink = _.cloneDeep(treelinkArrayBef);
}
var newValue = 0
function addRandomToTree() {
  var randInt = Math.floor(Math.random() * 100);
  newValue = randInt;
  tree.clearVisited();
  var num=tree.add(randInt);
  are(randInt);
  //console.log(num); undefinetd
    
  var treeArray = preorderTraverse(tree.root, [], 0, 0, 1);
  
  var treelinkArray = preorderTraverse_link(tree.root, [], 0, 0, 1);

  treeArray = treeArray.map(convertToXY);
  var treelinkArrayAft = treelinkArray.map(convertLinkToXY);
  var treelinkArrayBef = treelinkArray.map(convertLinkToXY);
  
  var mydiff = _.cloneDeep(_.differenceWith(treelinkArrayBef,prevLink,_.isEqual))
 
  
  prevLink = _.cloneDeep(treelinkArrayBef)
  for (let i = 0;i<prevLink.length;i++){
    if(_.isEqual(prevLink[i].source,mydiff[0].source) && _.isEqual(prevLink[i].target,mydiff[0].target) )
      prevLink[i].target = prevLink[i].source
  }
  
 
  updateTree(treeArray,prevLink,treelinkArrayBef);
  prevLink = _.cloneDeep(treelinkArrayBef);


}

function updateTree(treeArray,treelinkArrayBef,treelinkArrayAft){
  var t = d3.transition()
    .duration(750)  
  
  var links = svg.selectAll("path")
    .data(treelinkArrayBef);
  
  
  var enter_links = links.enter().append("path")
    .attr("fill", "none")
    .attr("stroke", "black")
  ;
  
  
  links = enter_links.merge(links)
  	.attr("d", linkGen);
  
  links = svg.selectAll("path")
    .data(treelinkArrayAft);
  
  links.exit().remove();
  
  enter_links = links.enter().append("path")
    .attr("fill", "none")
    .attr("stroke", "black");
  
  
  links = enter_links.merge(links)
  	.transition()
  	.attr("d", linkGen);
  
  

  
  var nodes = svg.append("g").selectAll('circle')
  						.data(treeArray);
  
 svg.selectAll("g").selectAll('g').data(treeArray).exit().remove()
  
  var enter = nodes.enter().append('g')
  				.attr("transform",d => "translate(" + d.x + "," + d.y + ")");
  
  
  enter.append("circle")
          .attr("class", "node")
          .attr("fill" , d => !d.visited ? "grey" : d.value<newValue ? "grey" : d.value===newValue ? "white" : "grey")
          .attr("stroke" , "black")
          .attr("r", 20);
  enter.append("text")
          .attr("text-anchor", "middle")
          .attr("y", ".3em")
          .text(d => d.value);
  
  nodes = enter.merge(nodes);
 
  
  
  
  


}
function ran(){
  var numero_random = parseInt( prompt("Ingrese cantidad de numeros: "));
  var lim = 1;
  var sup  = 99;
  while (lim<0 || numero_random<0 || sup<0){
      var numero_random = parseInt( prompt("No se ingreso nada vuelva a ingresar: "));  
  }
   document.getElementById("num").value = " ";
  
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
  document.getElementById("num").value = imprimir;
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
  var text = document.getElementById("num").value;
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
  var inputNombre = document.getElementById("num");
 inputNombre.value = contenido;
}


document.getElementById('file-input')
  .addEventListener('change', leerArchivo, false);


