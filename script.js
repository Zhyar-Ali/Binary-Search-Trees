const Node = function(dataInput) {
    return{
        data: dataInput,
        left: null,
        right: null
    };
};

const Tree = function(array) {
    let arr = array.sort((a,b) => a-b);
    removeDup(arr);

    let root = buildTree(arr, 0, arr.length-1);

    function buildTree(array, start, end) {
        if(start>end) return null;

        let mid = start + Math.floor((end-start) / 2);
        let root = new Node(array[mid]);

        root.left = buildTree(array, start, mid-1);
        root.right = buildTree(array, mid+1, end)

        return root;
    };

    function removeDup(arr) {
        for(let i=1; i<arr.length; i++) {
            let cur = arr[i];
            let prev = arr[i-1];

            if(cur === prev) {
                arr.splice(i, 1);
                i -=1;
            }
        }
    }

    const prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node === null || node === undefined) {
            return;
        }

        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    };

    const includes = (value) => {
        if(arr.includes(value)) {return true;}
        return false;
    };

    const insert = (value) => {
        if(arr.includes(value)) {return;}
        let newNode = new Node(value);
        let curRoot = root;

        while(true) {
            if(newNode.data > curRoot.data) {
                if(curRoot.right === null) {
                    curRoot.right = newNode;
                    return;
                }
                curRoot = curRoot.right;
            }else {
                if(curRoot.left === null) {
                    curRoot.left = newNode;
                    return true;
                }
                curRoot = curRoot.left;
            }
        }
    };

    return{prettyPrint, includes, insert, root};
};

let tree = new Tree([1,3,5]);
// tree.prettyPrint(tree.root);
tree.insert(2);
tree.insert(4);
tree.prettyPrint(tree.root);
// console.log(tree.includes(7));

