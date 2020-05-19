class FriendsList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.announceFriendShip(name);
  }

  announceFriendShip(name) {
    console.log(`${name} is a now a friend!`);
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name);

    if (idx === -1) {
      throw new Error('Friend not found!!');
    }

    this.friends.splice(idx, 1);
  }
}

describe('FriendsList', () => {
  let friendList;

  beforeEach(() => {
    friendList = new FriendsList();
  });
  it('Initializes friends list', () => {
    expect(friendList.friends.length).toEqual(0);
  });

  it('adds a friend to the list', () => {
    friendList.addFriend('Usman');
    expect(friendList.friends.length).toEqual(1);
  });

  it('Announces Friendship', () => {
    friendList.announceFriendShip = jest.fn();
    expect(friendList.announceFriendShip).not.toHaveBeenCalled();
    friendList.addFriend('Usman');
    expect(friendList.announceFriendShip).toHaveBeenCalledWith('Usman');
  });

  describe('removeFriend', () => {
    it('removes a friend from the list', () => {
      friendList.addFriend('Usman');
      expect(friendList.friends[0]).toEqual('Usman');
      friendList.removeFriend('Usman');
      expect(friendList.friends[0]).toBeUndefined();
    });

    it('Throws an error if friend does not exists', () => {
      expect(() => friendList.removeFriend('Usman')).toThrow(
        Error('Friend not found!!'),
      );
    });
  });
});
