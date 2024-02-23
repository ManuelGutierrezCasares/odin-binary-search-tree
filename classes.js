export class Node {
  constructor (data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

export class Tree {
  constructor (arr) {
    arr = arr.sort(compareNumbers);
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== arr[i + 1]) {
        newArr.push(arr[i]);
      }
    }
    this.root = this.buildTree(newArr);
  }

  buildTree (arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = new Node(arr[mid], this.buildTree(arr, start, mid - 1), this.buildTree(arr, mid + 1, end));

    return root;
  }

  insert (value, node = this.root) {
    if (node.data === value) return;
    if (node.left === null && node.data > value) {
      node.left = new Node(value, null, null);
      return;
    };
    if (node.right === null && node.data < value) {
      node.right = new Node(value, null, null);
      return;
    };
    if (node.data > value) this.insert(value, node.left);
    if (node.data < value) this.insert(value, node.right);
  }

  delete (value, node = this.root) {
    // Delete if child node is leaf
    if (node.left instanceof Node && node.left.data === value && !node.left.left && !node.left.right) {
      node.left = null;
      return;
    }
    if (node.right instanceof Node && node.right.data === value && !node.right.left && !node.right.right) {
      node.right = null;
      return;
    }
    console.log(node);
    // Delete if child node has only one child
    if (node.left instanceof Node && node.left.data === value && node.left.left && !node.left.right) {
      node.left = node.left.left;
      return;
    }
    if (node.left instanceof Node && node.left.data === value && !node.left.left && node.left.right) {
      node.left = node.left.right;
      return;
    }
    if (node.right instanceof Node && node.right.data === value && node.right.left && !node.right.right) {
      node.right = node.right.left;
      return;
    }
    if (node.right instanceof Node && node.right.data === value && !node.right.left && node.right.right) {
      node.right = node.right.right;
      return;
    }

    // Delete if child node has two children
    if (node.left instanceof Node && node.left.data === value && node.left.left && node.left.right) {
      let tmp = node.left.right;
      let bkup = tmp;
      let flag = false;
      while (tmp.left) {
        flag = true;
        bkup = tmp;
        tmp = tmp.left;
      }
      node.left.data = tmp.data;
      if (!flag) {
        node.left.right = tmp.right;
      } else {
        bkup.left = null;
      }
      return;
    }
    if (node.right instanceof Node && node.right.data === value && node.right.left && node.right.right) {
      console.log('entro right');
      let tmp = node.right.right;
      let bkup = tmp;
      let flag = false;
      while (tmp.left) {
        flag = true;
        bkup = tmp;
        tmp = tmp.left;
      }
      node.right.data = tmp.data;
      if (!flag) {
        node.right.right = tmp.right;
      } else {
        bkup.left = null;
      }
      return;
    }

    if (node.data > value) this.delete(value, node.left);
    if (node.data < value) this.delete(value, node.right);
  }

  find (value, node = this.root) {
    if (node.data === value) return node;
    if (value < node.data) {
      node = node.left;
      return this.find(value, node);
    } else {
      node = node.right;
      return this.find(value, node);
    }
  }

  levelOrder (cb = null) {
    const visitedNodes = [];
    const array = [];
    visitedNodes.push(this.root);
    while (visitedNodes.length) {
      if (!cb) {
        array.push(visitedNodes[0].data);
      } else {
        cb(visitedNodes[0].data);
      }
      if (visitedNodes[0].left) visitedNodes.push(visitedNodes[0].left);
      if (visitedNodes[0].right) visitedNodes.push(visitedNodes[0].right);
      visitedNodes.shift();
    }
    return cb ? this : array;
  }

  preOrder (cb = null, node = this.root) {
    const arr = [];

    function rPreOrder (cb, node) {
      if (node === null) return;
      if (cb) {
        cb(node.data);
        rPreOrder(cb, node.left);
        rPreOrder(cb, node.right);
      } else {
        arr.push(node.data);
        rPreOrder(cb, node.left);
        rPreOrder(cb, node.right);
      }
    }
    rPreOrder(cb, node);
    return cb ? this : arr;
  }

  inOrder (cb = null, node = this.root) {
    const arr = [];

    function rInOrder (cb, node) {
      if (node === null) return;
      if (cb) {
        rInOrder(cb, node.left);
        cb(node.data);
        rInOrder(cb, node.right);
      } else {
        rInOrder(cb, node.left);
        arr.push(node.data);
        rInOrder(cb, node.right);
      }
    }
    rInOrder(cb, node);
    return cb ? this : arr;
  }

  postOrder (cb = null, node = this.root) {
    const arr = [];

    function rPostOrder (cb, node) {
      if (node === null) return;
      if (cb) {
        rPostOrder(cb, node.left);
        rPostOrder(cb, node.right);
        cb(node.data);
      } else {
        rPostOrder(cb, node.left);
        rPostOrder(cb, node.right);
        arr.push(node.data);
      }
    }
    rPostOrder(cb, node);
    return cb ? this : arr;
  }

  height (node, current = this.root) {
    while (current) {
      if (current.data === node) {
        return checkHeight(current, node) - 1;
      }
      if (node < current.data) {
        current = current.left;
      } else if (node > current.data) {
        current = current.right;
      }
    }

    return null;
  }

  depth (node, current = this.root, count = 0) {
    if (current === null) return null;
    if (current.data === node) return count;
    if (node < current.data) {
      current = current.left;
      count = this.depth(node, current, ++count);
      return count;
    } else {
      current = current.right;
      count = this.depth(node, current, ++count);
      return count;
    }
  }

  isBalanced (current = this.root) {
    if (current === null) {
      return null;
    } else {
      const left = this.isBalanced(current.left);
      const right = this.isBalanced(current.right);
      const leftHeight = checkHeight(current.left);
      if (right === false || left === false) {
        return false;
      }
      const rightHeight = checkHeight(current.right);
      if ((Math.abs(leftHeight - rightHeight) <= 1)) {
        return true;
      }
      return false;
    }
  }

  rebalance () {
    if (this.isBalanced()) {
      return null;
    }
    // Inorder sorts the currently unbalanced tree in rebalancedArray
    const rebalancedArray = this.inOrder();
    this.root = this.buildTree(rebalancedArray);
    return this;
  }
}

export const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

function compareNumbers (a, b) {
  return a - b;
}

function checkHeight (current) {
  if (!current) {
    return 0;
  } else {
    const left = checkHeight(current.left);
    const right = checkHeight(current.right);

    return 1 + Math.max(left, right);
  }
}

/*
How did I debug isBalanced method
isBalanced (current = this.root) {
    if (current === null) {
      return null;
    } else {
      console.log('current is ', current.data);
      const left = this.isBalanced(current.left);
      console.log(`left is ${left}, current is ${current.data}`);
      const right = this.isBalanced(current.right);
      console.log(`right is ${right}, current is ${current.data}`);
      const leftHeight = checkHeight(current.left);
      if (right === false || left === false) {
        return false;
      }
      console.log(`left height is ${leftHeight}, current is ${current.data}`);
      const rightHeight = checkHeight(current.right);
      console.log(`right height is ${rightHeight}, current is ${current.data}`);
      if ((Math.abs(leftHeight - rightHeight) <= 1)) {
        console.log(true);
        return true;
      }
      console.log(false);
      return false;
    }
  }
    */
