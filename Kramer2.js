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

  //--------------------antes de kramer
  //function preKramer(){
    document.querySelector('.kramer').addEventListener('click', ()=>{
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
    supply = [];
    demand = [];
    for (var i=0;i<num1;i++){
        var value = parseInt(prompt(`Ingrese el valor de la demanda ${i+1}`));
        while (value<0){
            var value = parseInt(prompt(`Ingrese el valor de la demanda ${i+1}`));
        }
        demand.push(value);
    }
   
    for (var i=0;i<num;i++){
        var value = parseInt(prompt(`Ingrese el valor de la disponibilidad ${i+1}`));
        while (value<0){
            var value = parseInt(prompt(`Ingrese el valor de la disponibilidad ${i+1}`));
        }
        supply.push(value);
    }
    
    console.log(" disp ",supply);
    console.log("demanda ",demand);
    
    bfs = north_west_corner(supply, demand);
});