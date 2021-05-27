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