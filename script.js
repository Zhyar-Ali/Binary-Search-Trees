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

    const deleteItem = (rootIn, value) => {
        if(rootIn === null) {
            return rootIn;
        }

        if(rootIn.data > value) {
            rootIn.left = deleteItem(rootIn.left, value);
        }else if(rootIn.data < value) {
            rootIn.right = deleteItem(rootIn.right, value);
        }else{
            if(rootIn.left === null) {return rootIn.right;}
            if(rootIn.right === null) {return rootIn.left;}

            const succ = getSucc(rootIn);
            rootIn.data = succ.data;
            rootIn.right = deleteItem(rootIn.right, succ.data);
        }
        return rootIn;
    };

    function getSucc(currNode) {
        currNode = currNode.right;
        while(currNode !== null && currNode.left !== null) {
            currNode = currNode.left;
        }
        return currNode;
    }

    const levelOrderForEach = (callback) => {
        if(!callback) {
            throw new Error("A callback is required");
        }
        const queue = [root];
        
        while(queue.length > 0) {
            let current = queue.shift();

            callback(current.data);
            
            if(current.left !== null) {
                queue.push(current.left);
            }
            if(current.right !== null) {
                queue.push(current.right);
            }
        }
    };

    const inOrderForEach = (callback, rootIn = root) => {
        if(!callback) {
            throw new Error("A callback is required");
        }
        if(rootIn === null) {
            return;
        }
        inOrderForEach(callback, rootIn.left);
        callback(rootIn.data);
        inOrderForEach(callback, rootIn.right);
    };

    const preOrderForEach = (callback, rootIn = root) => {
        if(!callback) {
            throw new Error("A callback is required");
        }
        if(rootIn === null) {
            return;
        }
        callback(rootIn.data);
        preOrderForEach(callback, rootIn.left);
        preOrderForEach(callback, rootIn.right);
    };

    return{prettyPrint, includes, insert, deleteItem, levelOrderForEach, inOrderForEach, preOrderForEach, root};
};

let tree = new Tree([1,3,5]);
// tree.prettyPrint(tree.root);
tree.insert(2);
tree.insert(4);
tree.insert(0);
tree.insert(6);
// tree.prettyPrint(tree.root);
// tree.deleteItem(tree.root, 6);
// tree.prettyPrint(tree.root);
// tree.levelOrderForEach((value) => console.log(value));
// tree.inOrderForEach((value)=>console.log(value));
tree.preOrderForEach((value)=>console.log(value));
// console.log(tree.includes(7));

