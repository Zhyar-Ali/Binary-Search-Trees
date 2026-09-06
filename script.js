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

    const prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node === null || node === undefined) {
            return;
        }

        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    };

    const includes = (value) => {
        for(let elements of arr) {
            if(elements === value) {
                return true;
            }
        }

        return false;
    };

    return{prettyPrint, includes, root};
};

let tree = new Tree([3,6,2,1,5,4]);
// tree.prettyPrint(tree.root);
console.log(tree.includes(6));

