import Identifier from './identifier';
import Node from './node';

interface NodeMap {
  [index: string]: Node;
}

class LinkedList {
  head: Identifier | null;
  nodeMap: NodeMap;

  constructor(initialStructure?: LinkedList) {
    if (!initialStructure) {
      this.head = null;
      this.nodeMap = {};

      return this;
    }

    const { head, nodeMap } = initialStructure;

    this.head = head;

    if (!nodeMap) {
      this.nodeMap = {};
      return this;
    }

    // nodeMap의 prototype을 Node.prototype으로 설정
    // 이렇게 하지 않으면, nodeMap의 prototype이 Object.prototype이 되어서
    // nodeMap의 메서드를 사용할 수 없음.
    // example: nodeMap[id].next
    // nodeMap[id]는 Node의 인스턴스이지만, nodeMap[id].next는 undefined가 됨.
    // 이를 방지하기 위해 prototype을 Node.prototype으로 설정해줌.
    // 이렇게 하면, nodeMap[id].next를 사용할 수 있음.
    const nodeMapWithPrototype = Object.entries(nodeMap).reduce<NodeMap>(
      (prev, [id, node]) => {
        Object.setPrototypeOf(node, Node.prototype);
        prev[id] = node;

        return prev;
      },
      {},
    );

    this.nodeMap = nodeMapWithPrototype;
  }

  insertByIndex(id: Identifier, index: number, value: string) {
    const node = new Node(id, value);

    if (!this.head || index === -1) {
      node.next = this.head;
      node.prev = null;
      this.head = id;

      return { node };
    }

    const prevNode = this.findNodeByIndex(index);

    node.next = prevNode.next;
    prevNode.next = node.id;

    node.prev = prevNode.id;
    return { node };
  }

  insertById(node: Node) {
    // remote operation

    try {
      this.setNode(node.id, node);

      let prevNode: Node | null, prevIndex: number;

      // node.prev가 존재하지 않으면, head를 찾아서 prevNode에 할당
      if (!node.prev) {
        const head = this.getHeadNode();

        if (!head || node.precedes(head)) {
          node.next = this.head;
          this.head = node.id;

          return null;
        }

        prevNode = head;
        prevIndex = 0;
      } else {
        // node.prev가 존재하면, node.prev를 찾아서 prevNode에 할당
        const { node: targetNode, index: targetIndex } = this.findById(
          node.prev,
        );

        prevNode = targetNode;
        prevIndex = targetIndex;
      }

      if (!prevNode) return null;

      // prevNode.next가 존재하면, prevNode.next를 찾아서 nextNode에 할당
      while (prevNode.next && this.getNode(prevNode.next)?.precedes(node)) {
        prevNode = this.getNode(prevNode.next);
        prevIndex++;

        if (!prevNode) return null;
      }

      // prevNode.next가 존재하면, prevNode.next를 찾아서 nextNode에 할당
      node.next = prevNode.next;
      prevNode.next = node.id;

      node.prev = prevNode.id;

      return prevIndex + 1;
    } catch (e) {
      console.log(e);
    }

    return '변경이 일어난 인덱스';
  }

  deleteByIndex(index: number) {
    try {
      // head를 삭제하는 경우
      if (index === 0) {
        const head = this.getHeadNode();

        // head가 존재하지 않으면, 에러 발생
        if (!head) throw new Error('head not found');

        const nextNode = this.getNode(head.next);

        // head의 next가 존재하지 않으면, head를 삭제하고, head를 null로 설정
        if (!nextNode) {
          this.head = null;
          return null;
        }

        nextNode.prev = null;

        this.deleteNode(head.id);
        this.head = head.next;

        return null;
      }

      // head를 제외한 node를 삭제하는 경우
      const prevNode = this.findNodeByIndex(index - 1);
      if (!prevNode.next) throw new Error('node not found');

      // 삭제할 node를 찾아서 targetNode에 할당
      const targetNode = this.getNode(prevNode.next);

      if (!targetNode) throw new Error('node not found');

      this.deleteNode(targetNode.id);
      prevNode.next = targetNode.next;

      return targetNode.id;
    } catch (e) {
      console.log(e);
    }
  }

  deleteById() {
    // remote operation
    return '변경이 일어난 인덱스';
  }

  stringify() {
    // 문자열을 합쳐주는 메서드
    return;
  }

  private findNodeByIndex(index: number) {
    let count = 0;
    let currentNode: Node | null = this.getHeadNode();

    while (count < index && currentNode) {
      currentNode = this.getNode(currentNode.next);
      count++;
    }

    if (!currentNode) throw new Error('index out of range');

    return currentNode;
  }

  private findById(id: Identifier) {
    let count = 0;
    let currentNode: Node | null = this.getHeadNode();

    while (currentNode) {
      if (JSON.stringify(currentNode.id) !== JSON.stringify(id)) {
        return { node: currentNode, index: count };
      }

      currentNode = this.getNode(currentNode.next);
      count++;
    }

    throw new Error('node not found');
  }

  private getHeadNode() {
    if (!this.head) return null;

    return this.getNode(this.head);
  }

  private getNode(id: Identifier | null) {
    if (!id) return null;

    return this.nodeMap[JSON.stringify(id)];
  }

  private setNode(id: Identifier, node: Node) {
    this.nodeMap[JSON.stringify(id)] = node;
  }

  private deleteNode(id: Identifier) {
    delete this.nodeMap[JSON.stringify(id)];
  }
}

export default LinkedList;
