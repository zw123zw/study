function ListNode(x) {
  this.val = x
  this.next = null
}

// 反转链表
function ReverseList(pHead) {
  // 反转后，最后的prev就是头了
  let prev = null
  let curr = pHead
  while (curr) {
    // 解构赋值，是先保存右侧的值，再依次赋值给左侧
    ;[curr.next, prev, curr] = [prev, curr, curr.next]
  }
  return prev
}

// 指定m到n翻转
function reverseBetween(head, m, n) {
  var res = new ListNode(-1)
  res.next = head
  var cur = res
  for (var i = 0; i < m - 1; i++) {
    cur = cur.next
  }
  var temp = cur.next
  for (var i = 0; i < n - m; i++) {
    // 先保存temp.next节点
    var ntx = temp.next
    // 设置temp.next节点，在下次循环时取temp.next
    temp.next = ntx.next
    // 将指针翻转，也就是cur.next.next指向cur.next
    ntx.next = cur.next
    // cur.next进一位，也就是到了cur.next.next
    cur.next = ntx
  }
  return res.next
}

// 链表中的节点每k个一组翻转
// 将给出的链表中的节点每 k 个一组翻转，返回翻转后的链表
// 如果链表中的节点数不是 k 的倍数，将最后剩下的节点保持原样
// 你不能更改节点中的值，只能更改节点本身。
function reverseKGroup(head, k) {
  let curr = head // 保存开始节点
  let prev = null // 设置前节点
  let node = head // 设置node节点
  for (let i = 0; i < k; i++) {
    // 依次循环找到k
    if (node === null) {
      return head
    }
    node = node.next
  }
  for (let i = 0; i < k; i++) {
    let next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  head.next = reverseKGroup(curr, k)
  return prev
}

// 合并两个排序的链表
function Merge(pHead1, pHead2) {
  // 递归找到最小的节点返回
  if (!pHead1) return pHead2
  if (!pHead2) return pHead1
  if (pHead1.val < pHead2.val) {
    pHead1.next = Merge(pHead1.next, pHead2)
    return pHead1
  } else {
    pHead2.next = Merge(pHead2.next, pHead1)
    return pHead2
  }
}

//  合并k个已排序的链表
function mergeKLists(lists) {
  let arr = []
  // 循环k个数组，依次取值放入arr中
  for (let i = 0; i < lists.length; i++) {
    let p = lists[i]
    while (p) {
      arr.push(p.val)
      p = p.next
    }
  }
  arr.sort((a, b) => a - b)
  let head = null
  let cur = null
  for (let j = 0; j < arr.length; j++) {
    let node = new ListNode(arr[j])
    if (head === null) {
      // head初始值是null。意思是将head设置为链表的第一个节点
      head = node
    } else {
      cur.next = node
    }
    cur = node
  }
  return head
}

// 链表中是否有环
function hasCycle(head) {
  while (head) {
    if (head.flag) {
      return true
    }
    head.flag = true
    head = head.next
  }
}

// 链表中环的入口结点
function EntryNodeOfLoop(pHead) {
  while (pHead) {
    if (pHead.flag) {
      return pHead
    }
    pHead.flag = true
    pHead = pHead.next
  }
}

// 链表中倒数最后k个结点
function FindKthToTail(pHead, k) {
  let fast = pHead,
    slow = pHead
  for (let i = 0; i < k; i++) {
    if (!fast) return null
    fast = fast.next
  }
  while (fast) {
    fast = fast.next
    slow = slow.next
  }
  return slow
}

// 删除链表的倒数第n个节点
function removeNthFromEnd(head, n) {
  if (!head) return null
  let quick = head
  let slow = head
  for (let i = 0; i < n; i++) {
    quick = quick.next
  }
  if (quick === null) {
    return head.next
  }
  while (quick.next) {
    quick = quick.next
    slow = slow.next
  }
  slow.next = slow.next.next
  return head
}

// 两个链表的第一个公共结点
function FindFirstCommonNode(pHead1, pHead2) {
  if (!pHead1 || !pHead2) return null
  let p1 = pHead1,
    p2 = pHead2
  while (p1 !== p2) {
    p1 = p1 === null ? pHead2 : p1.next
    p2 = p2 === null ? pHead1 : p2.next
  }
  return p1
}

// 链表相加
function addInList(head1, head2) {
  let stack1 = new Array()
  let stack2 = new Array()
  while (head1 !== null) {
    stack1.push(head1)
    head1 = head1.next
  }
  while (head2 !== null) {
    stack2.push(head2)
    head2 = head2.next
  }
  let jinwei = 0
  let pHead = new ListNode(-1)
  let pre = pHead
  while (stack1.length !== 0 || stack2.length !== 0) {
    let node1 = stack1.pop()
    let node2 = stack2.pop()
    let v1 = node1 ? node1.val : 0
    let v2 = node2 ? node2.val : 0
    let falsevalue = v1 + v2 + jinwei
    let truevalue = falsevalue % 10
    jinwei = parseInt(falsevalue / 10)
    let node = new ListNode(truevalue)
    node.next = pre.next
    pre.next = node
  }
  if (jinwei === 1) {
    let tmp = new ListNode(1)
    tmp.next = pHead.next
    pHead.next = tmp
  }
  return pHead.next
}

// 单链表的排序
function sortInList(head) {
  let arr = []
  // 在while循环之前，保存head的值
  let cur = head
  while (cur) {
    arr.push(cur.val)
    cur = cur.next
  }
  arr.sort((a, b) => a - b)
  // 重置cur的值为head，为了循环排序赋值，排序赋值只是改变链表中的值，不改变链表顺序
  cur = head
  for (let i = 0; i < arr.length; i++) {
    cur.val = arr[i]
    cur = cur.next
  }
  return head
}

// 判断一个链表是否为回文结构
function isPail(head) {
  let arr = [],
    res = []
  while (head) {
    arr.push(head.val)
    res.push(head.val)
    head = head.next
  }
  arr.reverse()
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== res[i]) {
      return false
    }
  }
  return true
}

// 链表的奇偶重排
function oddEvenList(head) {
  // let arr = []
  // let cur = head
  // while (cur) {
  //   arr.push(cur.val)
  //   cur = cur.next
  // }
  // let p1 = head
  // for (let i = 0; i < arr.length; i++) {
  //   if ((i + 1) % 2 === 1) {
  //     p1.val = arr[i]
  //     p1 = p1.next
  //   }
  // }
  // for (let i = 0; i < arr.length; i++) {
  //   if ((i + 1) % 2 === 0) {
  //     p1.val = arr[i]
  //     p1 = p1.next
  //   }
  // }
  // return head

  if (!head) return head
  let cur = head
  let next = head.next
  let even = head.next
  // 改变节点指向---双指针，一次循环设置两个节点的next
  while (next && next.next) {
    // 比如把第一个节点的next指向了第三个节点
    cur.next = next.next
    // 把第一个节点赋值为第三个节点
    cur = cur.next
    // 把第二个节点的next指向第四个节点
    next.next = cur.next
    // 把第二个节点赋值为第四个节点
    next = next.next
  }
  cur.next = even
  return head
}

// 删除有序链表中重复的元素
function deleteDuplicates(head) {
  // 改变链表节点的值
  let arr = new Set()
  let cur = head
  while (cur) {
    arr.add(cur.val)
    cur = cur.next
  }
  cur = head
  arr = [...arr]
  for (let i = 0; i > arr.length; i++) {
    cur.val = arr[i]
    if (i === arr.length - 1) {
      cur.next = null
    } else {
      cur = cur.next
    }
  }
  return head

  // 改变next指向
  let current = head
  while (current) {
    if (current.next && current.val === current.next.val) {
      if (current.next.next) {
        current.next = current.next.next
      } else {
        current.next = null
      }
    } else {
      current = current.next
    }
  }
  return head
}

// 给出一个升序排序的链表，删除链表中的所有重复出现的元素，只保留原链表中只出现一次的元素
function deleteDuplicates(head) {
  if (!head) return head
  let arr = new Set()
  let arr1 = new Set()
  let cur = head
  while (cur) {
    if (arr1.has(cur.val)) {
      arr.delete(cur.val)
    } else {
      arr.add(cur.val)
      arr1.add(cur.val)
    }
    cur = cur.next
  }
  arr = Array.from(arr)
  if (!arr.length) return
  cur = new ListNode(arr[0])
  let curr = cur
  for (let i = 1; i < arr.length; i++) {
    cur.next = new ListNode(arr[i])
    cur = cur.next
  }
  return curr
}

// 二分查找
function search(nums, target) {
  // let left = 0
  // let right = nums.length - 1
  // while (left <= right) {
  //   if (nums[left] === target) {
  //     return left
  //   } else if (nums[right] === target) {
  //     return right
  //   }
  //   left++
  //   right--
  // }
  // return -1

  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    let mid = parseInt(left + (right - left) / 2)
    if (target === nums[mid]) {
      return mid
    } else if (target > nums[mid]) {
      left = mid + 1
    } else if (target < nums[mid]) {
      right = mid - 1
    }
  }
  return -1
}

// 二维数组中的查找
function Find(target, array) {
  let m = array.length
  if (m === 0) return false
  let n = array[0].length
  if (n === 0) return false
  let i = 0,
    j = n - 1
  while (i < m && j >= 0) {
    if (target < array[i][j]) {
      j--
    } else if (target > array[i][j]) {
      i++
    } else {
      return true
    }
  }
  return false
}

// 寻找峰值---二分法
function findPeakElement(nums) {
  let peakIndex = -1
  let len = nums.length
  function binaySearch(left, right) {
    const mid = Math.floor((left + right) / 2)
    if (left === right) {
      // 找到峰值
      return mid
    } else if (nums[mid + 1] > nums[mid]) {
      // 判断是否是向上区间
      left = mid + 1
    } else {
      right = mid
    }
    return binaySearch(left, right)
  }
  peakIndex = binaySearch(0, len - 1)
  return peakIndex
}

// 数组中的逆序对---归并排序
function InversePairs(data) {
  let sum = 0
  // 二分数组，分为left和right，然后对left与right排序
  function mergeSort(nums) {
    if (nums.length < 2) return nums
    let mid = Math.floor(nums.length / 2)
    let left = nums.slice(0, mid)
    let right = nums.slice(mid)
    return merge(mergeSort(left), mergeSort(right))
  }
  function merge(left, right) {
    let res = []
    let leftLen = left.length
    let rightLen = right.length
    let len = leftLen + rightLen
    // 双指针i, j，分别指向left与right
    for (let index = 0, i = 0, j = 0; index < len; index++) {
      if (i >= leftLen) res[index] = right[j++] // 如果left已排序完，则取right
      else if (j >= rightLen)
        res[index] = left[i++] // 如果right已排序完，则取left
      else if (left[i] <= right[j]) res[index] = left[i++]
      else {
        res[index] = right[j++]
        sum += leftLen - i
        sum = sum % 1000000007
      }
    }
    return res
  }
  mergeSort(data)
  return sum % 1000000007
}

// 旋转数组的最小数字
function minNumberInRotateArray(rotateArray) {
  return rotateArray.sort((a, b) => a - b)[0]
}

// 比较版本号
function compare(version1, version2) {
  const arr1 = version1.split('.')
  const arr2 = version2.split('.')
  const maxLenth = Math.max(arr1.length, arr2.length)
  for (let i = 0; i < maxLenth; i++) {
    const num1 = arr1[i] ? arr1[i] - '0' : 0
    const num2 = arr2[i] ? arr2[i] - '0' : 0
    if (num1 > num2) return 1
    if (num1 < num2) return -1
  }
  return 0
}

// 二叉树的前序遍历---根左右
function preorderTraversal(root) {
  // if(!root) return []
  // let res = []
  // let queue = [root]
  // while(queue.length){
  //   const n = queue.pop()
  //   res.push(n.val)
  //   // push进去，先判断放右节点，再放左节点
  //   if(n.right) queue.push(n.right)
  //   if(n.left) queue.push(n.left)
  // }
  // return res

  let res = []
  function preOrder(root) {
    if (!root) return
    res.push(root.val)
    preOrder(root.left)
    preOrder(root.right)
  }
  preOrder(root)
  return res
}

// 二叉树的中序遍历---左根右
function inorderTraversal(root) {
  let res = []
  function middleOrder(root) {
    if (!root) return
    middleOrder(root.left)
    res.push(root.val)
    middleOrder(root.right)
  }
  middleOrder(root)
  return res
}

// 二叉树的后序遍历---左右根
function postorderTraversal(root) {
  let res = []
  function postOrder(root) {
    if (!root) return
    postOrder(root.left)
    postOrder(root.right)
    res.push(root.val)
  }
  postOrder(root)
  return res
}

// 求二叉树的层序遍历
function levelOrder(root) {
  let res = []
  function preOrder(root, index) {
    if (!root) return
    if (index >= res.length) res.push([])
    res[index].push(root.val)
    preOrder(root.left, index + 1)
    preOrder(root.right, index + 1)
  }
  preOrder(root, 0)
  return res
}

// 按之字形顺序打印二叉树
function Print(pRoot) {
  const arr = []
  // 存储树的每一级的值
  function das(root, arr, level) {
    if (!root) return
    if (!arr[level]) {
      arr[level] = []
    }
    arr[level].push(root.val)
    das(root.left, arr, level + 1)
    das(root.right, arr, level + 1)
  }
  das(pRoot, arr, 0)
  // 将偶数行翻转
  for (let i = 0; i < arr.length; i++) {
    if (i % 2) {
      arr[i].reverse()
    }
  }
  return arr
}

// 二叉树的最大深度
function maxDepth(root) {
  function dfs(root) {
    if (!root) return 0
    let left = dfs(root.left)
    let right = dfs(root.right)
    return Math.max(left + 1, right + 1)
  }
  return dfs(root)
}

// 二叉树中和为某一值的路径
function hasPathSum(root, sum) {
  if (!root) return false
  if (sum === root.val && !root.left && !root.right) return true
  return (
    hasPathSum(root.left, sum - root.val) ||
    hasPathSum(root.right, sum - root.val)
  )
}

// 二叉搜索树与双向链表
function Convert(pRootOfTree) {
  let head = null,
    pre = null
  const dfs = function (pRootOfTree) {
    if (!pRootOfTree) return
    dfs(pRootOfTree.left)
    if (!pre) {
      head = pRootOfTree
    } else {
      pre.right = pRootOfTree
    }
    pRootOfTree.left = pre
    pre = pRootOfTree
    dfs(pRootOfTree.right)
  }
  if (!pRootOfTree) return
  dfs(pRootOfTree)
  return head
}

// 对称的二叉树
function isSymmetrical(pRoot) {
  if (!pRoot) return true
  function compare(node1, node2) {
    if (!node1 && !node2) return true
    if (!node1 || !node2) return false
    if (node1.val !== node2.val) return false
    return compare(node1.left, node2.right) && compare(node1.right, node2.left)
  }
  return compare(pRoot.left, pRoot.right)
}

// 合并二叉树
function mergeTrees(t1, t2) {
  if (t1 && t2) {
    t1.val += t2.val
    t1.left = mergeTrees(t1.left, t2.left)
    t1.right = mergeTrees(t1.right, t2.right)
  }
  return t1 || t2
}

// 二叉树的镜像
function Mirror(pRoot) {
  if (!pRoot) return
  pRoot.mid = pRoot.left
  pRoot.left = pRoot.right
  pRoot.right = pRoot.mid
  Mirror(pRoot.left)
  Mirror(pRoot.right)
  return pRoot
}

// 判断是不是二叉搜索树---中序遍历
function isValidBST(root) {
  let res = []
  function inOrder(root) {
    if (!root) return
    inOrder(root.left)
    res.push(root.val)
    inOrder(root.right)
  }
  inOrder(root)
  for (let i = 0; i < res.length; i++) {
    if (res[i] > res[i + 1]) return false
  }
  return true
}

// 判断是不是完全二叉树
function isCompleteTree(root) {
  let rootArr = new Array()
  rootArr.push(root)
  let end = false
  while (rootArr.length) {
    const node = rootArr.shift()
    if (!node) {
      end = true
    } else {
      if (rootArr.length && end) return false
      rootArr.push(node.left)
      rootArr.push(node.right)
    }
  }
  return true
}

// 判断是不是平衡二叉树
function IsBalanced_Solution(pRoot) {
  // function getTreeDepth(root) {
  //   if (!root) return 0
  //   const left = getTreeDepth(root.left)
  //   const right = getTreeDepth(root.right)
  //   return Math.max(left, right) + 1
  // }
  // if (!pRoot) return true
  // const left = getTreeDepth(pRoot.left)
  // const right = getTreeDepth(pRoot.right)
  // if (Math.abs(left - right) > 1) {
  //   return false
  // }
  // const leftTree = IsBalanced_Solution(pRoot.left)
  // const rightTree = IsBalanced_Solution(pRoot.right)
  // return leftTree && rightTree

  if (!pRoot) return true
  function getMaxDepth(root) {
    if (!root) return 0
    return Math.max(getMaxDepth(root.left) + 1, getMaxDepth(root.right) + 1)
  }
  return (
    Math.abs(getMaxDepth(pRoot.left) - getMaxDepth(pRoot.right)) <= 1 &&
    IsBalanced_Solution(pRoot.left) &&
    IsBalanced_Solution(pRoot.right)
  )
}

//  二叉搜索树的最近公共祖先
function lowestCommonAncestor(root, p, q) {
  if (!root) return
  if (p < root.val && q < root.val) {
    return lowestCommonAncestor(root.left, p, q)
  } else if (p > root.val && q > root.val) {
    return lowestCommonAncestor(root.right, p, q)
  } else {
    return root.val
  }
}

// 在二叉树中找到两个节点的最近公共祖先
function lowestCommonAncestor(root, o1, o2) {
  if (!root) return
  if (root.val === o1 || root.val === o2) {
    return root.val
  }
  let left = lowestCommonAncestor(root.left, o1, o2)
  let right = lowestCommonAncestor(root.right, o1, o2)
  if (left && right) {
    return root.val
  }
  return left ? left : right
}

// 序列化二叉树
function TreeNode(x) {
  this.val = x
  this.left = null
  this.right = null
}
function Serialize(pRoot) {
  if (!pRoot) return ''
  let str = ''
  let queue = []
  queue.push(pRoot)
  str += pRoot.val + '!'
  while (queue.length !== 0) {
    let font = queue.shift()
    if (font.left) {
      str += font.left.val + '!'
      queue.push(font.left)
    } else {
      str += '#!'
    }
    if (font.right) {
      str += font.right.val + '!'
      queue.push(font.right)
    } else {
      str += '#!'
    }
  }
  return str
}
function Deserialize(s) {
  if (!s) return
  s = s.split('!')
  s.pop()
  let i = 1
  let root = new TreeNode(s[0])
  let queue = [root]
  while (i < s.length) {
    let font = queue.shift()
    if (s[i] !== '#') {
      font.left = new TreeNode(Number(s[i]))
      queue.push(font.left)
    }
    i++
    if (s[i] !== '#') {
      font.right = new TreeNode(Number(s[i]))
      queue.push(font.right)
    }
    i++
  }
  return root
}

// 重建二叉树
function reConstructBinaryTree(pre, vin) {
  if (!pre.length || !vin.length) return
  const root = new TreeNode(pre.shift())
  const index = vin.indexOf(root.val)
  root.left = reConstructBinaryTree(pre, vin.slice(0, index))
  root.right = reConstructBinaryTree(pre, vin.slice(index + 1))
  return root
}

// 输出二叉树的右视图
function solve(xianxu, zhongxu) {
  let level = 0
  let res = []
  function rebuild(xianxu, zhongxu, level, res) {
    if (xianxu.length === 0) return null
    const root = xianxu[0]
    const index = zhongxu.findIndex(node => node === root)
    // 左子树的先序遍历结果
    const leftNodePreOrder = xianxu.slice(1, index + 1)
    // 左子树的中序遍历结果
    const leftNodeInOrder = zhongxu.slice(0, index)
    // 右子树的先序遍历结果
    const rightNodePreOrder = xianxu.slice(index + 1)
    // 右子树的中序遍历结果
    const rightNodeInOrder = zhongxu.slice(index + 1)
    rebuild(leftNodePreOrder, leftNodeInOrder, level + 1, res)
    rebuild(rightNodePreOrder, rightNodeInOrder, level + 1, res)
    res[level] = root
  }
  rebuild(xianxu, zhongxu, level, res)
  return res
}

// 用两个栈实现队列
let stack1 = []
let stack2 = []
function push(node) {
  stack1.push(node)
}
function pop() {
  if (stack2.length) {
    while (stack1.length) {
      // push,每次截取最后一个push进数组，那么第一个就在数组最后一位
      stack2.push(stack1.pop())
    }
  }
  // 返回数组最后一位，也就是最新一个，符合队列的先进先出
  return stack2.pop()
}

// 包含min函数的栈
let stack = []
function push(node) {
  let minNode = node
  if (stack.length !== 0) {
    minNode = min() < node ? min() : node
  }
  stack.push({ node, minNode })
}
function pop() {
  return stack.pop().node
}
function top() {
  return stack[stack.length - 1].node
}
function min() {
  return stack[stack.length - 1].minNode
}

// 有效括号序列
function isValid(s) {
  let arr = {
    '(': ')',
    '[': ']',
    '{': '}',
  }
  let map = []
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
      map.push(arr[s[i]])
    } else {
      if (!map.length || map.pop() !== s[i]) {
        return false
      }
    }
  }
  return map.length === 0
}

// 滑动窗口的最大值
function maxInWindows(num, size) {
  let len = num.length
  if (size > len || size === 0) return []
  let i = 0
  let j = size - 1
  let res = []
  // 循环寻找滑动窗口最大值
  while (j < len) {
    let tmp = num.slice(i, j + 1)
    res.push(Math.max(...tmp))
    i++
    j++
  }
  return res
}

// 最小的K个数
function GetLeastNumbers_Solution(input, k) {
  // let arr = input
  // let res = []
  // while (k) {
  //   const min = Math.min(...arr)
  //   res.push(min)
  //   arr.splice(arr.indexOf(min), 1)
  //   k--
  // }
  // return res

  input.sort((a, b) => a - b)
  return input.slice(0, k)
}

// 寻找第K大
function findKth(a, n, K) {
  let input = a
  input.sort((a, b) => b - a)
  return input[K - 1]
}

// 数据流中的中位数
let arrMid = []
function Insert(num) {
  let i = 0
  while (arrMid[i] < num) i++
  arrMid.splice(i, 0, num)
}
function GetMedian() {
  let index = Math.floor(arrMid.length / 2)
  if (arrMid.length % 2) {
    return arrMid[index]
  } else {
    return (arrMid[index] + arrMid[index - 1]) / 2
  }
}

// 表达式求值
function solve(s) {
  let stack = []
  let sign = '+'
  let i = 0
  let num = 0
  while (i < s.length) {
    if (s[i] === '(') {
      let flag = 1,
        start = i + 1
      while (flag) {
        i++
        if (s[i] === '(') flag++
        if (s[i] === ')') flag--
      }
      let end = i
      let arr = s.slice(start, i)
      num = solve(arr)
      i = end
    } else if (s[i] >= '0' && s[i] <= '9') {
      num = num * 10 + Number(s[i])
    }
    if (s[i] < '0' || s[i] > '9' || i === s.length - 1) {
      if (sign === '+') stack.push(num)
      if (sign === '-') stack.push(num * -1)
      if (sign === '*') stack.push(stack.pop() * num)
      sign = s[i]
      num = 0
    }
    i++
  }
  return stack.reduce((a, b) => {
    return a + b
  })
}

// 两数之和
function twoSum(numbers, target) {
  const res = new Array(2)
  let map = new Map()
  let n = numbers.length
  for (let i = 0; i < n; i++) {
    if (map.has(target - numbers[i])) {
      res[0] = map.get(target - numbers[i]) + 1
      res[1] = i + 1
    } else {
      map.set(numbers[i], i)
    }
  }
  return res
}

// 数组中出现次数超过一半的数字
function MoreThanHalfNum_Solution(numbers) {
  let map = new Map()
  numbers.forEach(v => {
    if (!map.has(v)) {
      map.set(v, 1)
    } else {
      map.set(v, map.get(v) + 1)
    }
  })
  // for (let [k, val] of map) {
  //   if (val > numbers.length / 2) {
  //     return k
  //   }
  // }
  return Array.from(map.keys()).find(k => map.get(k) > numbers.length / 2)
}

// 数组中只出现一次的两个数字
function FindNumsAppearOnce(array) {
  let map = new Map()
  array.forEach(v => {
    if (!map.has(v)) {
      map.set(v, 1)
    } else {
      map.set(v, map.get(v) + 1)
    }
  })
  // let res = []
  // for (let [k, val] of map) {
  //   if (val === 1) {
  //     res.push(k)
  //   }
  // }
  // return res.sort((a, b) => a - b)
  return Array.from(map.keys())
    .filter(k => map.get(k) === 1)
    .sort((a, b) => a - b)
}

// 缺失的第一个正整数
function minNumberDisappeared(nums) {
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], true)
  }
  let j
  for (j = 1; j <= nums.length; j++) {
    if (!map.has(j)) return j
  }
  return j
}

// 三数之和，双向指针遍历，每次左指针，当前位，右指针相加，为0则找到了返回。没有则根据相加和判断，相加和大于0则右指针减少，小于0则左指针增加
function threeSum(num) {
  num.sort((a, b) => a - b)
  let res = []
  for (let i = 0; i < num.length; i++) {
    if (num[i] > 0) {
      return res
    }
    if (i !== 0 && num[i] === num[i - 1]) {
      continue
    }
    let left = i + 1
    let right = num.length - 1
    while (left < right) {
      let sum = num[i] + num[left] + num[right]
      if (sum === 0) {
        res.push([num[i], num[left], num[right]])
        left++
        right--
        while (num[left] === num[left - 1]) {
          left++
        }
        while (num[right] === num[right + 1]) {
          right--
        }
      }
      if (sum > 0) {
        right--
      }
      if (sum < 0) {
        left++
      }
    }
  }
  return res
}

// 没有重复项数字的全排列---回溯
function permute(nums) {
  let len = nums.length
  let res = []
  function brackTrace(path) {
    // 排列项
    if (path.length === len) return res.push(path.slice())
    for (let i = 0; i < len; i++) {
      if (path.indexOf(nums[i]) === -1) {
        // 插入值
        path.push(nums[i])
        // 递归
        brackTrace(path)
        // 回溯
        path.pop()
      }
    }
  }
  brackTrace([])
  return res
}

// 有重复项数字的全排列
function permuteUnique(num) {
  num.sort((a, b) => a - b)
  let res = []
  let path = []
  let used = []
  function backTrack(num) {
    if (path.length === num.length) {
      res.push(path.slice())
      return
    }
    for (let i = 0; i < num.length; i++) {
      if (i > 0 && num[i] === num[i - 1] && !used[i - 1]) continue
      if (!used[i]) {
        path.push(num[i])
        used[i] = true
        backTrack(num)
        path.pop()
        used[i] = false
      }
    }
  }
  backTrack(num)
  return res
}

// 岛屿数量
function solve(grid) {
  function dfs(i, j) {
    if (i < 0 || i >= grid.length) {
      return
    }
    if (j < 0 || j >= grid[i].length) {
      return
    }
    if (grid[i][j] === '0') {
      return
    }
    grid[i][j] = '0'
    // 寻找四个方向的值，如果为0或者超出边界则返回
    dfs(i - 1, j)
    dfs(i + 1, j)
    dfs(i, j - 1)
    dfs(i, j + 1)
  }
  if (!grid.length) {
    return 0
  }
  let count = 0
  for (let i = 0; i < grid.length; i++) {
    for (j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '1') {
        count++
        dfs(i, j)
      }
    }
  }
  return count
}

// 字符串的排列---回溯，深度优先
function Permutation(str) {
  let arr = str.split('')
  let res = []
  function swap(p, q) {
    ;[arr[p], arr[q]] = [arr[q], arr[p]]
  }
  function dfs(p, q) {
    if (p === q) {
      res.push(arr.join(''))
      return
    }
    for (let i = p; i <= q; i++) {
      swap(p, i)
      // 深度遍历
      dfs(p + 1, q)
      // 回溯
      swap(p, i)
    }
  }
  dfs(0, arr.length - 1)
  res = Array.from(new Set(res))
  return res
}

// N皇后问题
function Nqueen(n) {
  let res = []
  const backTrack = arr => {
    if (arr.length === n) {
      let temp = new Array(n).fill(0).map(_ => new Array(n).fill('.'))
      let ele = arr.map((e, i) => {
        temp[i][e] = 'Q'
        return temp[i].join('')
      })
      res.push(ele)
      return
    }
    for (let i = 0; i < n; i++) {
      if (arr.indexOf(i) < 0) {
        let flag = true
        let cur = arr.length
        for (let j = 1; cur - j >= 0; j++) {
          if (arr[cur - j] === i - j) flag = false
        }
        for (let j = 1; cur - j >= 0 && i + j <= n; j++) {
          if (arr[cur - j] === i + j) flag = false
        }
        flag && backTrack(arr.concat(i))
      }
    }
  }
  backTrack([])
  return res.length
}

// 括号生成
function generateParenthesis(n) {
  let res = []
  const dfs = (left, right, curStr) => {
    if (left === 0 && right === 0) {
      res.push(curStr)
      return
    }
    if (left > 0) {
      dfs(left - 1, right, curStr + '(')
    }
    if (right > left) {
      dfs(left, right - 1, curStr + ')')
    }
  }
  dfs(n, n, '')
  return res
}

// 矩阵最长递增路径
function solve(matrix) {
  let dirs = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ]
  let m = matrix.length
  let n = matrix[0].length
  let dp = new Array(m + 1)
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(n + 1).fill(0)
  }
  function dfs(i, j) {
    if (dp[i][j] > 0) return dp[i][j]
    if (dp[i][j] === 0) dp[i][j] = 1
    for (let k = 0; k < 4; k++) {
      let nextI = i + dirs[k][0]
      let nextJ = j + dirs[k][1]
      if (
        nextI >= 0 &&
        nextI < m &&
        nextJ >= 0 &&
        nextJ < n &&
        matrix[nextI][nextJ] > matrix[i][j]
      )
        dp[i][j] = Math.max(dp[i][j], dfs(nextI, nextJ) + 1)
    }
    return dp[i][j]
  }
  if (m === 0 || n === 0) return 0
  let res = 0
  for (let i = 0; i < m; i++) {
    for (j = 0; j < n; j++) {
      res = Math.max(res, dfs(i, j))
    }
  }
  return res
}

// 斐波那契数列
function Fibonacci(n) {
  const fib = n => {
    if (n === 1 || n === 2) return 1
    return fib(n - 1) + fib(n - 2)
  }
  return fib(n)
}

// 跳台阶
function jumpFloor(number) {
  const res = []
  res[1] = 1
  res[2] = 2
  if (number > 2) {
    for (let i = 3; i <= number; i++) {
      res[i] = res[i - 1] + res[i - 2]
    }
  }
  return res[number]
}

// 最小花费爬楼梯
function minCostClimbingStairs(cost) {
  let dp = [0, 0]
  for (let i = 2; i <= cost.length; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
  }
  return dp[cost.length]
}

// 最长公共子序列
function LCS(s1, s2) {
  if (typeof s1 !== 'string' || typeof s2 !== 'string') {
    return -1
  }
  if (!s1 || !s2) return -1
  const arr = []
  let m = s1.length
  let n = s2.length
  for (let i = 0; i <= m; i++) {
    if (arr[i] === undefined) {
      arr[i] = []
    }
    for (let j = 0; j <= n; j++) {
      if (i === 0 || j === 0) {
        arr[i][j] = ''
        continue
      }
      let c1 = s1.charAt(i - 1)
      let c2 = s2.charAt(j - 1)
      if (c1 === c2) {
        arr[i][j] = arr[i - 1][j - 1] + c1
      } else {
        let l1 = arr[i - 1][j].length
        let l2 = arr[i][j - 1].length
        arr[i][j] = l1 >= l2 ? arr[i - 1][j] : arr[i][j - 1]
      }
    }
  }
  return arr[m][n] === '' ? -1 : arr[m][n]
}

// 最长公共子串
function LCS(str1, str2) {
  // let maxLength = 0
  // let index
  // let dp = []
  // for (let i = 0; i < str1.length; i++) {
  //   dp.push([])
  // }
  // for (let i = 0; i < str2.length; i++) {
  //   dp[0][i] = str1[0] === str2[i] ? 1 : 0
  // }
  // for (let i = 0; i < str1.length; i++) {
  //   dp[i][0] = str2[0] === str1[i] ? 1 : 0
  // }
  // for (let i = 1; i < str1.length; i++) {
  //   for (j = 1; j < str2.length; j++) {
  //     if (str1[i] === str2[j]) {
  //       dp[i][j] = dp[i - 1][j - 1] + 1
  //       if (maxLength < dp[i][j]) {
  //         maxLength = dp[i][j]
  //         index = i
  //       }
  //     } else {
  //       dp[i][j] = 0
  //     }
  //   }
  // }
  // return str1.substring(index - maxLength + 1, index + 1)

  const dp = new Array(str1.length + 1)
  let max = 0
  const map = new Map()
  for (let i = 0; i <= str1.length; i++) {
    dp[i] = new Array(str2.length + 1).fill(0)
  }
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
        max = Math.max(max, dp[i][j])
        if (!map.has(max)) map.set(max, i)
      }
    }
  }
  let startIndex = map.get(max) - max
  let endIndex = map.get(max)
  return str1.substring(startIndex, endIndex)
}

// 不同路径的数目---动态规划核心就是将大问题分成若干个小问题，找出每个小问题的最优解，合起来就是大问题最优解
// 本题解题思路是，一个格子的路径值只与格子上方与格子左方的格子路径有关，初始化时将每一行的第一个格子路径和每一列的第一个格子路径和设置为1，循环就可以找到所有路径了
function uniquePaths(m, n) {
  let dp = []
  for (let i = 0; i < m; i++) {
    // 每一行的格子数量初始化
    dp[i] = new Array(n)
    // 每一行的第一个格子路径设为1
    dp[i][0] = 1
  }
  for (let i = 0; i < n; i++) {
    // 每一列的第一个格子路径设为1
    dp[0][i] = 1
  }
  for (let i = 1; i < m; i++) {
    for (j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
  return dp[m - 1][n - 1]
}

// 矩阵的最小路径和---第一行与第一列，只能分别向右或向下，没有第二种选择，因此第一行只能由其左边的累加，第一列只能由其上面的累加，取其中较小值与当前位置的值相加就是到当前位置的最小路径和
function minPathSum(matrix) {
  let m = matrix.length
  let n = matrix[0].length
  let dp = Array(m)
    .fill(0)
    .map(x => Array(n).fill(0))
  dp[0][0] = matrix[0][0]
  // 设置每列的第一个的值
  for (let i = 1; i < n; i++) {
    dp[0][i] = dp[0][i - 1] + matrix[0][i]
  }
  // 设置每行的第一个的值
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + matrix[i][0]
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // 找到最小值
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + matrix[i][j]
    }
  }
  return dp[m - 1][n - 1]
}

// 把数字翻译成字符串
function solve(nums) {
  let index
  for (index = 0; index < nums.length; index++) {
    if (nums[index] !== '0') {
      break
    }
  }
  nums = nums.substring(index, nums.length)
  let dp = new Array(nums.length)
  if (!nums.length) return 0
  if (nums.length === 1 && nums[0] === '0') return 0
  if (nums.length === 1) return 1
  if (nums[1] !== '0' && parseInt(nums[0] + nums[1]) <= 26) dp[1] = 2
  else {
    dp[1] = 1
  }
  dp[0] = 1
  for (let i = 2; i < nums.length; i++) {
    if (nums[i] === '0') {
      if (nums[i - 1] === '0') return 0
      else if (nums[i - 1] <= '2') {
        dp[i] = dp[i - 2]
      } else {
        return 0
      }
    } else {
      if (nums[i - 1] === '0') {
        dp[i] = dp[i - 1]
      } else if (parseInt(nums[i - 1] + nums[i]) <= 26) {
        dp[i] = dp[i - 1] + dp[i - 2]
      } else {
        dp[i] = dp[i - 1]
      }
    }
  }
  return dp[nums.length - 1]
}

// 兑换零钱(一)
function minMoney(arr, aim) {
  let dp = new Array(aim + 1)
  for (let i = 1; i <= aim; i++) {
    dp[i] = Infinity
  }
  dp[0] = 0
  for (let i = 1; i <= aim; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] <= i) {
        dp[i] = Math.min(dp[i], dp[i - arr[j]] + 1)
      }
    }
  }
  return dp[aim] > aim ? -1 : dp[aim]
}

// 最长上升子序列(一)
function LIS(arr) {
  if (!arr.length) {
    return 0
  }
  let dp = new Array(arr.length)
  dp[0] = 1
  // 遍历数组中所有的数，再遍历当前数之前的数
  // 只要前面某个数小于当前数，则要么长度加1，要么保持不变，取两者中的较大者
  // 即dp[i]=Math.max(dp[i],dp[j] + 1)
  for (let i = 0; i < arr.length; i++) {
    dp[i] = 1
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }
  return Math.max(...dp)
}

// 连续子数组的最大和---动态规划，每次累加取最大值，最后返回数组中最大值
function FindGreatestSumOfSubArray(array) {
  let dp = []
  dp[0] = array[0]
  let n = array.length
  for (let i = 1; i < n; i++) {
    dp[i] = Math.max(dp[i - 1] + array[i], array[i])
  }
  return Math.max(...dp)
}

// 最长回文子串---循环，每次取值从中间向两边扩张，判断是否是回文子串
function getLongestPalindrome(A) {
  function getLength(begin, end) {
    while (begin >= 0 && end < A.length && A[begin] == A[end]) {
      begin--
      end++
    }
    return end - begin - 1
  }
  let maxLen = 1
  for (let i = 0; i < A.length - 1; i++) {
    maxLen = Math.max(maxLen, getLength(i, i), getLength(i, i + 1))
  }
  return maxLen
}

// 数字字符串转化成IP地址
function restoreIpAddresses(s) {
  let res = []
  let path = []
  function traceTrack(str, count) {
    if (count === 4) {
      if (str === '') {
        res.push(path.join('.'))
      }
      return
    }
    for (let i = 1; i <= 3 && i <= str.length; i++) {
      if (parseInt(str.substring(0, i)) <= 255) {
        if (i >= 2 && str[0] === '0' && str[1] === '0') return
        if (i >= 2 && str[0] === '0' && str[1] !== '0') return
        path.push(str.substring(0, i))
        traceTrack(str.substring(i, str.length), count + 1)
        path.pop()
      }
    }
  }
  traceTrack(s, 0)
  return res
}

// 编辑距离
function editDistance(str1, str2) {
  let dp = new Array(str1.length + 1)
  for (let i = 0; i < dp.length; i++) dp[i] = new Array(str2.length + 1)
  //初始化dp
  dp[0][0] = 0
  for (let i = 1; i < dp.length; i++) dp[i][0] = dp[i - 1][0] + 1
  for (let i = 1; i < dp[0].length; i++) dp[0][i] = dp[0][i - 1] + 1

  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[0].length; j++) {
      if (str1[i - 1] == str2[j - 1]) dp[i][j] = dp[i - 1][j - 1]
      else dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]) + 1
    }
  }
  return dp[str1.length][str2.length]
}

// 正则表达式匹配
function match(str, pattern) {
  // write code here
  const m = str.length,
    n = pattern.length
  // 1. dp 下标的含义
  // dp[i][j] 表示从 str 首字母到 i ，以及从 pattern 首字母到 j 的子字符串是否匹配
  // 只要存在 i = m - 1 时，有一个 j 为 true 即匹配
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(false))
  // 2. 初始化
  dp[0][0] = true // '' 和 '' 是匹配的
  // str 为 '' ，初始化 pattern 不为空串的情况
  // 例如：
  // '' 与 a* 这种情况时，dp[0][2] = true;
  // 这里从 2 开始，因为如果从 1 开始，即使 1 的位置是 '*' 也是无意义的，因为 * 和空串不匹配
  for (let i = 2; i <= n; i++) {
    if (pattern[i - 1] === '*') dp[0][i] = dp[0][i - 2]
  }
  // 3. 状态转移
  // 状态转移时只需要分别考虑 '*' 和 其他字符时的情况
  // 其中 '*' 因为表示 0 次或者多次，需要特别注意 0 次的情况
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (pattern[j - 1] !== '*') {
        // 非 '*' 的情况
        if (pattern[j - 1] === '.' || pattern[j - 1] === str[i - 1]) {
          // 如果当前两字符相同 或者 模式字符串指向字符为 '.'
          // 则 dp[i][j] 是否匹配取决于前一个字符
          dp[i][j] = dp[i - 1][j - 1]
        }
      } else if (j >= 2) {
        // '*' 的情况，这里 j 限定了 >=2 与初始化的意思是一致的
        // 如果 '*' 前一个字符为 '.' 或者 '*' 的前一个字符与当前字符相同
        if (pattern[j - 2] == '.' || pattern[j - 2] === str[i - 1]) {
          // `有 i - 1 这个字符` 时，取决于 '*' 的前一个位置是否匹配
          // 或，`没有 i - 1 这个字符` 时是否匹配
          dp[i][j] = dp[i][j - 2] || dp[i - 1][j]
        } else {
          // 如果 '*' 前面的字符 j - 1 与 i - 1 位置指向字符不同，或者不为 '.'
          // 则，当前位置 dp[i][j] 是否匹配
          // 取决于 `没有 j - 1 这个字符` 时的情况，也就是 dp[i][j - 2] 没有 j - 1 字符的状态
          dp[i][j] = dp[i][j - 2]
        }
      }
    }
  }
  // 返回整个子串的匹配情况
  return dp[m][n]
}

// 最长的括号子串
function longestValidParentheses(s) {
  if (!s) return 0
  const n = s.length
  let max = 0
  const stack = []
  let start = -1
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ')') {
      // 如果有右括号，但是左括号栈里没有括号，则此时从 start 到 i 都的子串是不合法的，更新 start
      if (!stack.length) {
        start = i
      } else {
        stack.pop() // 解决 2 不执行的问题
        if (stack.length) {
          // 执行 1
          max = Math.max(max, i - stack[stack.length - 1])
        } else {
          // 执行 2
          max = Math.max(max, i - start)
        }
      }
    } else {
      // 左括号直接添加它的下标到栈中就好了
      stack.push(i)
    }
  }
  return max
}

// 打家劫舍(一)
function rob(nums) {
  let len = nums.length
  if (len == 1) return nums[0] //针对简单情况进行处理
  if (len == 2) return Math.max(nums[0], nums[1])
  let dp = new Array(len).fill(0) //dp[i]代表到第i家所能得到的最大金额
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0], nums[1])
  for (let i = 2; i < len; i++) {
    dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1])
  }
  return Math.max(...dp)
}

// 打家劫舍(二)
function rob(nums) {
  let len = nums.length
  let dp1 = new Array(len + 1).fill(0)
  let dp2 = new Array(len + 1).fill(0)
  dp1[0] = 0
  dp1[1] = nums[0]
  dp2[0] = 0
  dp2[1] = 0
  for (let i = 2; i <= len; i++) {
    if (i == len) {
      dp1[i] = Math.max(dp1[i - 1], nums[i - 1])
    } else {
      dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + nums[i - 1])
    }
  }
  for (let i = 2; i <= len; i++) {
    dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + nums[i - 1])
  }
  return dp1[len] > dp2[len] ? dp1[len] : dp2[len]
}

// 买卖股票的最好时机(一)
function maxProfit(prices) {
  let n = prices.length
  if (n <= 1) return 0
  let minValue = prices[0],
    maxP = 0
  for (let i = 0; i < n; i++) {
    minValue = Math.min(minValue, prices[i])
    maxP = Math.max(maxP, prices[i] - minValue)
  }
  return maxP
}

//  买卖股票的最好时机(二)
function maxProfit(prices) {
  let income = 0
  for (let i = 1; i < prices.length; i++) {
    let diff = prices[i] - prices[i - 1]
    if (diff > 0) income += diff
  }
  return income
}

// 买卖股票的最好时机(三)
function maxProfit(prices) {
  const n = prices.length
  if (!prices.length) return 0
  // 1、 状态数组
  // 每层，可能的五种状态
  // 0. 未买入第一次，未买入第二次
  // 1. 买入第一次，未买入第二次
  // 2. 卖出第一次，未买入第二次
  // 3. 卖出第一次，买入第二次
  // 4. 卖出第一次，卖出第二次
  const dp = new Array(n).fill(0).map(() => new Array(5).fill(-Infinity)) // 初始化时我们给一个比较小的数，这样 max 比较时，会选择更大的数，可以少点判断
  // 2、 用第一天的状态初始化
  // 第一天的状态只可能有两种
  dp[0][0] = 0 // 未买入第一次，当前最高收益 0
  dp[0][1] = -prices[0] // 买入第一次，当前最高收益就是买入后剩的钱，因为初始时是没钱的，所以直接为负值
  for (let i = 1; i < n; i++) {
    // 3、 状态转移方程
    dp[i][0] = dp[i - 1][0] // 保持未买入
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]) // 第一次买入，或未买入第一次到买入第一次
    dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] + prices[i]) // 第一次卖出，或以买入第一次但未卖出到卖出第一次
    dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] - prices[i]) // 第二次买入，或已卖出第一次但未买入第二次，到买入第二次
    dp[i][4] = Math.max(dp[i - 1][4], dp[i - 1][3] + prices[i]) // 第二次卖出，或以买入第二次但未卖出第二次，到卖出第二次
  }
  return Math.max(dp[n - 1][4], Math.max(0, dp[n - 1][2])) //有可能第二次是没必要买的，第一次买完后
}

// 字符串变形
function trans(s, n) {
  const arr = s.split(' ').map(item => {
    let word = item.split('')
    word.forEach((v, index) => {
      if (v.charCodeAt(0) < v.toLowerCase().charCodeAt(0)) {
        word[index] = word[index].toLowerCase()
      } else {
        word[index] = word[index].toUpperCase()
      }
    })
    console.log(word.join(''))
    return word.join('')
  })
  return arr.reverse().join(' ')
}

// 最长公共前缀
function longestCommonPrefix(strs) {
  if (!strs.length) return ''
  let res = ''
  let falg = true
  for (let i = 0; i < strs[0].length; i++) {
    const str = strs[0][i]
    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== str) {
        falg = false
        break
      } else {
        falg = true
      }
    }
    if (falg) res += str
  }
  return res
}

// 验证IP地址
function solve(IP) {
  // IPv4
  // 遍历数组，对于IPv4，需要依次验证分组为4，分割不能缺省，没有前缀0或者其他字符，数字在0-255范围内。
  // IPv6
  // 对于IPv6，需要依次验证分组为8，分割不能缺省，每组不能超过4位，不能出现除数字小大写a-f以外的字符。
  const arr4 = IP.split('.')
  const arr6 = IP.split(':')
  const ex4 = /^0$|^[1-9]\d{0,2}$/
  const ex6 = /^[0-9a-fA-F]{1,4}$/
  if (arr4.length === 4 && arr4.every(v => v.match(ex4) && v < 256)) {
    return 'IPv4'
  } else if (arr6.length === 8 && arr6.every(v => v.match(ex6))) {
    return 'IPv6'
  }
  return 'Neither'
}

// 大数加法
function solve(s, t) {
  let sp = s.length - 1
  let tp = t.length - 1
  let res = []
  let sum = 0
  let p = 0
  while (sp >= 0 || tp >= 0 || p != 0) {
    let sv = sp >= 0 ? s[sp] - 0 : 0
    let tv = tp >= 0 ? t[tp] - 0 : 0
    sum = sv + tv + p
    res.unshift(sum % 10)
    p = sum >= 10 ? 1 : 0
    sp--
    tp--
  }
  return res.join('')
}

// 合并两个有序的数组
function merge(A, m, B, n) {
  A.length = m + n
  let p = m + n - 1
  let i = m - 1
  let j = n - 1
  while (i >= 0 && j >= 0 && p >= 0) {
    if (A[i] > B[j]) {
      A[p] = A[i]
      p--
      i--
    } else {
      A[p] = B[j]
      p--
      j--
    }
  }
  while (j >= 0) {
    A[p--] = B[j--]
  }
}

// 判断回文
function judge(str) {
  let arr = str.split('')
  let newStr = arr.reverse().join('')
  return newStr === str
}

// 合并区间
function merge(intervals) {
  intervals.sort((a, b) => a.start - b.start)
  const res = []
  if (intervals[0]) res.push(intervals[0])
  for (let i = 1; i < intervals.length; i++) {
    if (res[res.length - 1].end >= intervals[i].end) continue
    else if (res[res.length - 1].end >= intervals[i].start) {
      res[res.length - 1].end = intervals[i].end
    } else {
      res.push(intervals[i])
    }
  }
  return res
}

// 最小覆盖子串
function minWindow(S, T) {
  let l = 0,
    r = 0
  const map = new Map()
  let lent = T.length
  let lens = S.length
  for (let i = 0; i < lent; i++) {
    map.set(T[i], map.has(T[i]) ? map.get(T[i]) + 1 : 1)
  }
  let len = map.size
  let res = ''
  while (r < lens) {
    const nowc = S[r]
    if (map.has(nowc)) {
      map.set(nowc, map.get(nowc) - 1)
      if (map.get(nowc) === 0) {
        len--
      }
    }
    while (len === 0) {
      let newStr = S.slice(l, r + 1)
      if (!res || res.length > newStr.length) res = newStr
      let nowl = S[l]
      if (map.has(nowl)) {
        map.set(nowl, map.get(nowl) + 1)
        if (map.get(nowl) === 1) {
          len++
        }
      }
      l++
    }
    r++
  }
  return res
}

// 反转字符串
function solve(str) {
  let j = str.length - 1
  if (j <= 1) return str
  let res = ''
  while (j >= 0) {
    res += str[j]
    j--
  }
  return res
}

// 最长无重复子数组
function maxLength(arr) {
  let max = 0
  const str = []
  for (let i in arr) {
    let index = str.indexOf(arr[i])
    if (index !== -1) {
      str.splice(0, str.indexOf(arr[i]) + 1)
    }
    str.push(arr[i])
    max = Math.max(str.length, max)
  }
  return max
}

// 盛水最多的容器
function maxArea(height) {
  let left = 0
  let right = height.length - 1
  let max = 0
  let area = 0
  while (left < right) {
    area = Math.min(height[left], height[right]) * (right - left)
    max = Math.max(area, max)
    if (height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }
  return max
}

// 接雨水问题
function maxWater(arr) {
  let leftMax = 0,
    rightMax = 0
  let left = 0,
    right = arr.length - 1
  let res = 0
  while (left < right) {
    leftMax = Math.max(leftMax, arr[left])
    rightMax = Math.max(rightMax, arr[right])
    if (arr[left] < arr[right]) {
      res += leftMax - arr[left]
      left++
    } else {
      res += rightMax - arr[right]
      right--
    }
  }
  return res
}

// 分糖果问题
function candy(arr) {
  // * 解法：贪心
  // * 思路：
  // *   要想分出最少的糖果，利用贪心思想，肯定是相邻位置没有增加的情况下大家都分到1,
  // *   相邻位置有增加的情况下，分到糖果数加1就好。什么情况下会增加糖果，相邻位置有得
  // *   分差异，可能是递增可能是递减，如果是递增的话，糖果依次加1，如果是递减糖果依次减1?
  // *   这不符合最小，必须从1开始加才是最小，那我们可以反向加1.
  // * 时间复杂度：O(n)，单独遍历两次.
  // * 空间复杂度：O(n)。记录每个位置糖果数的辅助数组.
  const len = arr.length
  if (len <= 1) return len
  let nums = []
  // 全部初始化为1
  for (let i = 0; i < len; i++) {
    nums[i] = 1
  }
  // 从开始循环数组，每次跟右边比较，如果右边得分大于左边则，右边分到糖果数在左边基础上加1
  for (let i = 1; i < len; i++) {
    if (arr[i] > arr[i - 1]) {
      nums[i] = nums[i - 1] + 1
    }
  }
  let res = nums[len - 1]
  // 从末尾开始循环比较，每次比较末尾两个值，如果左边更大，但是糖果数更少，那么左边糖果数加1
  for (let i = len - 2; i >= 0; i--) {
    // 如果左边更大，但是糖果数更少
    if (arr[i] > arr[i + 1] && nums[i] <= nums[i + 1]) {
      nums[i] = nums[i + 1] + 1
    }
    res += nums[i]
  }
  return res
}

// 主持人调度
function minmumNumberOfHost(n, startEnd) {
  let star = []
  let end = []
  let host = 0
  for (let i = 0; i < startEnd.length; i++) {
    star.push(startEnd[i][0])
    end.push(startEnd[i][1])
  }
  // 将获取到的开始时间从小到大排序
  star.sort((a, b) => a - b)
  // 将获取到的结束时间从小到大排序
  end.sort((a, b) => a - b)
  for (let i = 0; i < n; i++) {
    // 如果开始时间大于大于结束时间，那么就不会有交叉，不需要额外的主持人
    if (star[i] >= end[0]) {
      end.splice(0, 1)
    } else {
      // 开始时间小于结束时间，有交叉，需要额外的主持人
      host++
    }
  }
  return host
}

// 旋转数组
function solve(n, m, a) {
  m = m % n
  return a.slice(n - m).concat(a.slice(0, n - m))
}

// 螺旋矩阵
function spiralOrder(matrix) {
  const res = []
  if (!matrix.length) return res
  let left = 0
  let right = matrix[0].length - 1
  let up = 0
  let down = matrix.length - 1
  while (left <= right && up <= down) {
    for (let i = left; i <= right; i++) {
      res.push(matrix[up][i])
    }
    // 收缩上边界
    up++
    if (up > down) break
    for (let i = up; i <= down; i++) {
      res.push(matrix[i][right])
    }
    // 收缩右边界
    right--
    if (left > right) break
    for (let i = right; i >= left; i--) {
      res.push(matrix[down][i])
    }
    // 收缩下边界
    down--
    if (up > down) break
    for (let i = down; i >= up; i--) {
      res.push(matrix[i][left])
    }
    // 收缩左边界
    left++
    if (left > right) break
  }
  return res
}

// 顺时针旋转矩阵
function rotateMatrix(mat, n) {
  let tmp = []
  let k = n
  while (k--) {
    tmp.push([])
  }
  for (let i = n - 1; i >= 0; i--) {
    for (let j = 0; j < n; j++) {
      tmp[j].push(mat[i][j])
    }
  }
  return tmp
}

// 设计LRU缓存结构
var Solution = function (capacity) {
  this.capacity = capacity
  this.m = new Map()
  this.list = new DoubleLinkedList()
}
function DoubleLinkedList() {
  this.head = new ListNode(null, 0, -1, null)
  this.tail = new ListNode(null, 0, -1, null)
  this.head.next = this.tail
  this.tail.pre = this.head
  this.insert = function (key, value) {
    const newNode = new ListNode(this.head, key, value, this.head.next)
    this.head.next.pre = newNode
    this.head.next = newNode
    return newNode
  }
  this.move = function (cur) {
    const pre = cur.pre
    const next = cur.next
    pre.next = next
    next.pre = pre
    cur.next = this.head.next
    cur.pre = this.head
    this.head.next.pre = cur
    this.head.next = cur
  }
  this.delete = function () {
    const deleteNode = this.tail.pre
    const pre = deleteNode.pre
    pre.next = this.tail
    this.tail.pre = pre
    deleteNode.next = deleteNode.pre = null
    return deleteNode.key
  }
}
function ListNode(pre, key, value, next) {
  this.pre = pre
  this.key = key
  this.value = value
  this.next = next
}
/**
 * @param {number} key
 * @return {number}
 */
Solution.prototype.get = function (key) {
  const res = this.m.get(key)
  if (res !== undefined) {
    this.list.move(res)
    return res.value
  }
  return -1
}
/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
Solution.prototype.set = function (key, value) {
  const res = this.m.get(key)
  if (res !== undefined) {
    res.value = value
    this.list.move(res)
  } else {
    if (this.m.size === this.capacity) {
      const deleteKey = this.list.delete()
      this.m.delete(deleteKey)
    }
    const newNode = this.list.insert(key, value)
    this.m.set(key, newNode)
  }
}

// 设计LFU缓存结构
function ListNode(k, v, c, l, r) {
  this.k = k
  this.v = v
  this.c = c || 1
  this.l = l
  this.r = r
}
function Linklist() {
  this.head = new ListNode(-1, 'head')
  this.tail = new ListNode(-1, 'tail')
  this.head.r = this.tail
  this.tail.l = this.head
  this.length = 0
}
Linklist.prototype.add = function (node) {
  let r = this.head.r
  node.r = r
  node.l = this.head
  r.l = node
  this.head.r = node
  this.length++
}
Linklist.prototype.delete = function (node) {
  if (node.l) {
    let l = node.l
    l.r = node.r
    node.r.l = l
  }
  this.length--
}
var LFUCache = function (capacity) {
  this.capacity = capacity
  this.minFreq = 1
  this.nodeMap = new Map()
  this.freqMap = new Map()
}
LFUCache.prototype.get = function (key) {
  if (this.capacity === 0) {
    return -1
  }
  const node = this.nodeMap.get(key)
  if (!node) return -1
  this.update(node)
  return node.v
}
LFUCache.prototype.update = function (node) {
  // 从旧链表中删除节点
  let last = this.freqMap.get(node.c)
  last.delete(node)
  if (!last.length && node.c === this.minFreq) {
    // 如果链表为空，且当前次数是最低次数的链表值，最低次数的指针 + 1
    this.minFreq++
  }
  // 从新链表头部插入
  let now = this.freqMap.get(++node.c)
  if (!now) {
    now = new Linklist()
    this.freqMap.set(node.c, now)
  }
  now.add(node)
}
LFUCache.prototype.put = function (key, value) {
  if (this.capacity === 0) return
  let node = this.nodeMap.get(key)
  if (!node) {
    // 不存在节点，创建
    node = new ListNode(key, value)
    if (!this.freqMap.get(node.c)) {
      this.freqMap.set(node.c, new Linklist())
    }
    const nodes = this.freqMap.get(node.c)
    if (this.nodeMap.size >= this.capacity) {
      // 个数超过时，从最低使用次数的链表中的尾部移除元素
      let minNodes = this.freqMap.get(this.minFreq)
      let minNode = minNodes.tail.l
      this.nodeMap.delete(minNode.k)
      minNodes.delete(minNode)
    }
    // 因为新增，必然使用此时最低，回归到1
    this.minFreq = 1
    this.nodeMap.set(key, node)
    nodes.add(node)
  } else {
    node.v = value
    this.update(node)
  }
}
function LFU(operators, capacity) {
  const cache = new LFUCache(capacity)
  const res = []
  for (let i = 0; i < operators.length; i++) {
    const opt = operators[i]
    if (opt[0] === 1) {
      cache.put(opt[1], opt[2])
    } else {
      res.push(cache.get(opt[1]))
    }
  }
  return res
}
