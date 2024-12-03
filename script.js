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

let b = [];
for (let i = 0; i < 8; i++) {
  b.push(Math.floor(Math.random() * 45));
}
let a = new Tree(b);
a.insert(34);
