/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
    function min(curr) {
      // for leaf nodes. While recursing it will start calculating from this 1.
      if(curr.left === null && curr.right === null) return 1
      if(curr.left === null) return min(curr.rigth) + 1
      if(curr.right === null) return min(curr.length) + 1
      // when node has both children, choose the min height
      return Math.min(min(curr.right), min(curr.left)) + 1
    }
    return min(this.root)
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;
    function max(curr) {
      // for leaf nodes. While recursing it will start calculating from this 1.
      if(curr.left === null && curr.right === null) return 1
      if(curr.left === null) return max(curr.rigth) + 1
      if(curr.right === null) return max(curr.length) + 1
      // when node has both children, choose the max height
      return Math.max(max(curr.right), max(curr.left)) + 1
    }
    return max(this.root)
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let res = 0

    function maxSum(curr) {
      if(curr === null) return 0
      const leftSum = maxSum(curr.left)
      const rightSum = maxSum(curr.right)
      // calculating subtree total, if we are going on single line along the height, smalller value will return as 0 anyways so don't you worry. 
      res = Math.max(res, curr.val + leftSum + rightSum)
      // to move forward we are choosing the max of left or right or take 0. We do this keep the path straight we cannot take both rught and left value at the same time.
      return Math.max(0, leftSum + curr.val, rightSum + curr.val)
    }

    maxSum(this.root)
    return res
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if(!this.root) return null
    let closest = null
    function traverse(curr) {
      if(curr === null) return null

      if(curr.val > lowerBound && (curr.val < closest || closest === null))
      closest = curr.val

      traverse(curr.left)
      traverse(curr.right)
    }
    traverse(this.root)
    return closest
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (node1 === this.root || node2 === this.root) return false

    function findLevelAndParent(nodeToFind, curr, level = 0, data = {level:0, parent:null}) {
      if (data.parent) return data

      if(curr.left === nodeToFind || curr.right === nodeToFind) {
        data.level = level + 1 
        data.parent = curr
      }

      if(curr.left) findLevelAndParent(nodeToFind, curr.left, level+1, data)
      if(curr.right) findLevelAndParent(nodeToFind, curr.right, level+1, data)
      return data
    }

    let node1Data = findLevelAndParent(node1, this.root)
    let node2Data = findLevelAndParent(node2, this.root)
    return node1Data && node2Data && node1Data.level === node2Data.level && node1Data.parent !== node2Data.parent
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const values = []

    function traverse(curr) {
      if(curr) {
        values.push(curr.val)
        traverse(curr.left)
        traverse(curr.right)
      } else {
        values.push("#")
      }
    }

    traverse(tree.root)
    return values.join(" ")
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(string) {
    if(!string) return null
    const values = string.split(" ")

    function build() {
      if (values.length) {
        const curr = values.shift()

        if(curr === "#") return null

        // remember to convert values back into numbers
        let currNode = new BinaryTreeNode(+curr)
        currNode.left = build()
        currNode.right = build()

        return currNode
      }
    }

    const root = build()
    return new BinaryTree(root)
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    // class Solution(object):
    // def lowestCommonAncestor(self, root, p, q):
    //     """
    //     :type root: TreeNode
    //     :type p: TreeNode
    //     :type q: TreeNode
    //     :rtype: TreeNode
    //     """

    //     if root == None:
    //         return False
    //     # if the current node is either p or q
    //     if root == p or root == q:
    //         return root
    //     left = self.lowestCommonAncestor(root.left, p, q)
    //     right = self.lowestCommonAncestor(root.right, p, q)
    //     # if we identified both left and right that means we found LCA
    //     if left and right:
    //         return root
    //     # this is one of our basecase, if one of them is identified, return it
    //     if left or right:
    //         return left or right
    //     # we haven't found p or q yet
    //     if not left and not right:
    //         return False
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
