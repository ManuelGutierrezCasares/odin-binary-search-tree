import { Node, Tree, prettyPrint } from './classes.js';
import { populateArray, unbalanceTree } from './mainHelper.js';

// Driver script

// Instantiate and Populate array with numbers < 100
const LENGTH = 10;
const arr = Array(LENGTH);
populateArray(arr, LENGTH);

// Instantiate Tree
const tree = new Tree(arr);

// Check if Tree is balanced
console.log(tree.isBalanced());
prettyPrint(tree.root);

// Print different orders
tree.levelOrder(e => console.log(e));
tree.preOrder(e => console.log(e));
tree.postOrder(e => console.log(e));
tree.inOrder(e => console.log(e));

// Unbalance Tree by adding 5 numbers > 100
unbalanceTree(tree, 5);
prettyPrint(tree.root);

// Check if Tree is unbalanced
console.log(tree.isBalanced());

// Rebalance Tree
tree.rebalance();
prettyPrint(tree.root);

// Check if Tree is balanced
console.log(tree.isBalanced());

// Print different orders
tree.levelOrder(e => console.log(e));
tree.preOrder(e => console.log(e));
tree.postOrder(e => console.log(e));
tree.inOrder(e => console.log(e));
