import { Test } from '@nestjs/testing';
import { UserRepository } from './user.respository';
import { ConflictException } from '@nestjs/common';

const mockCredentialsDto = {
  username: 'TestUser',
  password: 'TestPassword1234',
};
describe('UserRepository', () => {
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
    let save;

    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });
    it('succesfully signs up the user', () => {
      save.mockResolvedValue(undefined);

      expect(userRepository.signUp(mockCredentialsDto)).resolves.not.toThrow();
    });
    it('thows a conflict exception as username already exists', () => {
      save.mockRejectedValue({ code: '23505' });

      expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
