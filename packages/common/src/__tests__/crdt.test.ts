import { CRDT } from '../crdt/crdt';
import { LinkedList } from '../crdt/linked-list';

describe('[Common CRDT test]', () => {
  let user: CRDT;

  beforeEach(() => {
    const initialStructure = new LinkedList();
    user = new CRDT(1, initialStructure);
  });

  describe('function:localInsert', () => {
    it('should insert a node at the head of the list', () => {
      user.localInsert(-1, '1');
      user.localInsert(-1, '2');

      expect(user.read()).toEqual('21');
    });

    it('should insert a node at the tail of the list', () => {
      user.localInsert(-1, '1');
      user.localInsert(0, '2');

      expect(user.read()).toEqual('12');
    });
  });

  describe('function:localDelete', () => {
    it('should delete a node at the tail of the list', () => {
      user.localInsert(-1, '1');
      user.localInsert(0, '2');

      expect(user.read()).toEqual('12');

      user.localDelete(1);

      expect(user.read()).toEqual('1');
    });

    it('should throw an error when the index is out of range', () => {
      user.localInsert(-1, '1');
      user.localInsert(0, '2');

      expect(user.read()).toEqual('12');

      // currently, the list has only two nodes.
      expect(() => user.localDelete(2)).toThrowError();
    });
  });
});
