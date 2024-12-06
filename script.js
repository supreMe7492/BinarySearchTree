const { error } = require("console");

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class Tree {
  constructor(array) {
    this.array = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(this.array);
    this.prettyPrint(this.root);
  }
  buildTree(array) {
    const start = 0;
    const end = array.length - 1;
    const mid = Math.floor((start + end) / 2);

    if (start > end) {
      return null;
    } else {
      const root = new Node(array[mid]);
      root.left = this.buildTree(array.slice(start, mid));
      root.right = this.buildTree(array.slice(mid + 1));
      return root;
    }
  }
  insert(value) {
    let root = this.root;
    while (true) {
      if (value < root.data) {
        if (root.left == null) {
          root.left = new Node(value);
          return;
        }
        root = root.left;
      } else if (value == root.data) {
        throw new Error("The value is already in the tree");
      } else {
        if (root.right == null) {
          root.right = new Node(value);
          return;
        }
        root = root.right;
      }
    }
  }
  delete(value, currentNode = this.root) {
    if (currentNode == null) {
      return null;
    }

    if (value < currentNode.data) {
      currentNode.left = this.delete(value, currentNode.left);
    } else if (value > currentNode.data) {
      currentNode.right = this.delete(value, currentNode.right);
    } else {
      if (currentNode.left == null && currentNode.right == null) {
        return null;
      }
      if (currentNode.left == null) {
        return currentNode.right;
      }
      if (currentNode.right == null) {
        return currentNode.left;
      }
      let successor = this.getSuccessor(currentNode);
      currentNode.data = successor.data;
      currentNode.right = this.delete(successor.data, currentNode.right);
    }
    return currentNode;
  }

  getSuccessor(node) {
    let current = node.right;
    while (current !== null && current.left !== null) {
      current = current.left;
    }
    return current;
  }
  find(value, node = this.root) {
    if (node == null) {
      return null;
    }
    if (value < node.data) {
      node = this.find(value, node.left);
    }
    if (value > node.data) {
      node = this.find(value, node.right);
    }
    return node;
  }
  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("provide a callback function");
    }
    let queue = [];
    queue.push(this.root);
    while (queue.length > 0) {
      let currentNode = queue.shift();
      callback(currentNode.data);
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }
  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("provide a callback function");
    }
    function traverse(node) {
      if (node == null) {
        return;
      } else {
        traverse(node.left);
        callback(node);
        traverse(node.right);
      }
    }
    traverse(this.root);
  }
  postOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("provide a callback function");
    }
    function traverse(node) {
      if (node == null) {
        return;
      } else {
        traverse(node.left);

        traverse(node.right);
        callback(node);
      }
    }
    traverse(this.root);
  }
  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("provide a callback function");
    }
    function traverse(node) {
      if (node == null) {
        return;
      } else {
        callback(node);
        traverse(node.left);
        traverse(node.right);
      }
    }
    traverse(this.root);
  }
  height(node = this.root) {
    let queue = [];
    queue.push(node);
    let h = 0;
    while (queue.length > 0) {
      let currentNode = queue.shift();
      if (currentNode.left == null && currentNode.right == null) {
        return h;
      } else {
        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);
        h++;
      }
    }
  }
  depth(node = this.root) {
    let queue = [];
    queue.push(node);
    let d = 0;
    while (queue.length > 0) {
      for (let i = 0; i < queue.length; i++) {
        let currentNode = queue.shift();
        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);
      }
      d++;
    }
    return d;
  }
  isBalanced() {
    const node = this.root;
    const leftSubTree = this.depth(node.left);
    const rightSubTree = this.depth(node.right);
    if (leftSubTree - rightSubTree > 1) {
      return false;
    } else {
      return true;
    }
  }
  reBalance() {
    let newArr = [];
    this.inOrder((a) => {
      newArr.push(a);
    });
    this.root = this.buildTree(newArr);
    return "balanced tree";
  }
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

let b = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let a = new Tree(b);
console.log(a.reBalance());
