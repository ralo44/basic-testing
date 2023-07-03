// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

const callback = jest.fn();
const time = 300;
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, time);
    expect(setTimeout).toHaveBeenCalledWith(callback, time);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, time);
    jest.advanceTimersByTime(time);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, time);
    expect(setInterval).toHaveBeenCalledWith(callback, time);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, time);
    jest.advanceTimersByTime(time * 2);
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spyJoin = jest.spyOn(path, 'join');
    await readFileAsynchronously('./index.ts');
    expect(spyJoin).toHaveBeenCalledWith(__dirname, './index.ts');
  });

  test('should return null if file does not exist', async () => {
    const findPath = await readFileAsynchronously('indexjs');
    expect(findPath).toBe(null);
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
