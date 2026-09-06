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

    let root = buildTree(arr, 0, arr.length-1);

    function buildTree(array, start, end) {
        if(start>end) return null;

        let mid = start + Math.floor((end-start) / 2);
        let root = new Node(array[mid]);

        root.left = buildTree(array, start, mid-1);
        root.right = buildTree(array, mid+1, end)

        return root;
    };

    return(root);
};

let tree = new Tree([5,2,3,2,1,2,2,5,3]);
console.log(tree);
