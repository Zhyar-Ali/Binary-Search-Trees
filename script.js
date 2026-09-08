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

    const prettyPrint = (node = root, prefix = '', isLeft = true) => {
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

    const postOrderForEach = (callback, rootIn = root) => {
        if(!callback) {
            throw new Error("A callback is required");
        }
        if(rootIn === null) {
            return;
        }
        postOrderForEach(callback, rootIn.left);
        postOrderForEach(callback, rootIn.right);
        callback(rootIn.data);
    };

    const height = (value) => {
        let currNode = root;

        while(currNode !== null && currNode.data !== value) {        
            if(currNode.data > value) {
                currNode = currNode.left;
                continue;
            }
            if(currNode.data < value) {
                currNode = currNode.right;
            }
        }

        if(currNode === null) {
            return undefined;
        }

        return calculateHeight(currNode);
    };

    function calculateHeight(node) {
        if(node === null) {
            return -1;
        }

        let leftSide = calculateHeight(node.left);
        let rightSide = calculateHeight(node.right);

        return 1 + Math.max(leftSide,rightSide);
    }

    const depth = (value) => {
        let currNode = root;
        let depthValue = 0;

        while(currNode !== null && currNode.data !== value) {        
            if(currNode.data > value) {
                currNode = currNode.left;
                depthValue++;
                continue;
            }
            if(currNode.data < value) {
                currNode = currNode.right;
                depthValue++;
            }
        }

        if(currNode === null) {
            return undefined;
        }
        return depthValue;
    };

    const isBalanced = () => {
        const rec = (node) => {
            if(node === null) {
                return true;
            }

            let leftHeight = calculateHeight(node.left);
            let rightHeight = calculateHeight(node.right);

            let leftSide = rec(node.left);
            let rightSide = rec(node.right);

            return (Math.abs(leftHeight-rightHeight) <= 1 && leftSide && rightSide);
        };

        return rec(root);
    };

    const rebalance = () => {
        let newArr = [];
        inOrderForEach((value) => newArr.push(value));
        root = buildTree(newArr,0,newArr.length-1);
    };

    return{prettyPrint, includes, insert, deleteItem, levelOrderForEach, inOrderForEach, preOrderForEach, postOrderForEach, height, depth, isBalanced, rebalance, root};
};

//Testing
//1
const randomNumbers = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));
const tree = new Tree(randomNumbers);

console.log("Initial array:");
console.log(randomNumbers);

//2
console.log("\nIs balanced?");
console.log(tree.isBalanced());
tree.prettyPrint();

//3
console.log("\nLevel Order:");
const levelOrder = [];
tree.levelOrderForEach((value) => levelOrder.push(value));
console.log(levelOrder);

console.log("\nPre Order:");
const preOrder = [];
tree.preOrderForEach((value) => preOrder.push(value));
console.log(preOrder);

console.log("\nPost Order:");
const postOrder = [];
tree.postOrderForEach((value) => postOrder.push(value));
console.log(postOrder);

console.log("\nIn Order:");
const inOrder = [];
tree.inOrderForEach((value) => inOrder.push(value));
console.log(inOrder);

//4
console.log("\nAdding numbers greater than 100...");

tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);
tree.insert(105);

//5
console.log("\nAfter inserting numbers > 100:");
console.log("Is balanced?");
console.log(tree.isBalanced());
tree.prettyPrint();

//6
tree.rebalance();

//7
console.log("\nAfter rebalancing:");
console.log("Is balanced?");
console.log(tree.isBalanced());
tree.prettyPrint();

//8
console.log("\nLevel Order:");
const newLevelOrder = [];
tree.levelOrderForEach((value) => newLevelOrder.push(value));
console.log(newLevelOrder);

console.log("\nPre Order:");
const newPreOrder = [];
tree.preOrderForEach((value) => newPreOrder.push(value));
console.log(newPreOrder);

console.log("\nPost Order:");
const newPostOrder = [];
tree.postOrderForEach((value) => newPostOrder.push(value));
console.log(newPostOrder);

console.log("\nIn Order:");
const newInOrder = [];
tree.inOrderForEach((value) => newInOrder.push(value));
console.log(newInOrder);

