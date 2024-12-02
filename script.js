class Node {
  constructor(node) {
    this.node = node;
    this.left = null;
    this.right = null;
  }
  setLeft(left) {
    this.left = left;
  }
  setRight(right) {
    this.right = right;
  }
}
class Tree {
  constructor(array) {
    this.array = [...new Set(array)].sort((a, b) => a - b);
    this.root = null;
  }
}
