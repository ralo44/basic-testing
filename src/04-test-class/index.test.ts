// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import * as lodash from 'lodash';

jest.mock('lodash');

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(1000).getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(1000).withdraw(1100)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      getBankAccount(1000).transfer(1100, getBankAccount(1000)),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const fakeAccount = getBankAccount(1000);
    expect(() => fakeAccount.transfer(10, fakeAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const fakeAccount = getBankAccount(1000);
    expect(fakeAccount.deposit(100).getBalance()).toEqual(1100);
  });

  test('should withdraw money', () => {
    const fakeAccount = getBankAccount(1000);
    expect(fakeAccount.withdraw(100).getBalance()).toBe(900);
  });

  test('should transfer money', () => {
    const fakeAccount = getBankAccount(1000);
    const fakeAccount2 = getBankAccount(1000);
    expect(fakeAccount.transfer(100, fakeAccount2).getBalance()).toBe(900);
    expect(fakeAccount2.getBalance()).toBe(1100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockImplementation(() => 1);
    const fakeAccount = getBankAccount(1000);
    const balance = await fakeAccount.fetchBalance();
    expect(typeof balance).toEqual('number');
    jest.spyOn(lodash, 'random').mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fakeAccount = getBankAccount(1000);
    fakeAccount.fetchBalance = async () => 500;
    await fakeAccount.synchronizeBalance();
    const fetchBalance = fakeAccount.getBalance();
    expect(typeof fetchBalance).toBe('number');
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const fakeAccount = getBankAccount(1000);
    fakeAccount.fetchBalance = jest.fn().mockResolvedValue(null);
    expect(fakeAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
