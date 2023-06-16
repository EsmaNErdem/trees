/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if(!this.root) return 0

    let tot = this.root.val
    function sum(curr) {
      for (let child of curr.children) {
        tot += child.val
        if(child.children.length > 0) {
          sum(child)
        }
      }
    }
    sum(this.root)
    return tot
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if(!this.root) return 0

    let count = this.root.val % 2 === 0 ? 1 : 0

    function countE(curr) {
      for (let child of curr.children) {

        if(child.val % 2 == 0) count++
        if(child.children.length > 0) {
          countE(child)
        }
      }
    }
    countE(this.root)
    return count
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
  if(!this.root) return 0

    let count = this.root.val > lowerBound ? 1 : 0

    function countG(curr) {
      for (let child of curr.children) {
        
        if(child.val > lowerBound) count++
        if(child.children.length > 0) {
          countG(child)
        }
      }
    }
    countG(this.root)
    return count
  }
}


let nums = new Tree(
  new TreeNode(1,
    [new TreeNode(5),
     new TreeNode(6),
     new TreeNode(8)]))


module.exports = { Tree, TreeNode };
