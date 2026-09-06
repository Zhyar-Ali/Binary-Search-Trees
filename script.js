const Node = function(dataInput) {
    return{
        data: dataInput,
        left: null,
        right: null
    };
};

const Tree = function(array) {
    
    let arr = array.sort((a,b) => a-b);
    for(let i=1; i<arr.length; i++) {
        let cur = arr[i];
        let prev = arr[i-1];

        if(cur === prev) {
            arr.splice(i, 1);
            i -=1;
        }
    }

    let root = buildTree(arr);

    function buildTree(array) {
        return array;
    };

    return(root);
};

let tree =  Tree([5,2,3,2,1,2,2,5,3]);
console.log(tree);
