// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe('throttledGetDataFromApi', () => {
  const url = 'https://jsonplaceholder.typicode.com';
  test('should create instance with provided base url', async () => {
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: 'Get data from API!' });
    const data = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/posts/1');
    expect(data).toBeCalledWith({
      baseURL: url,
    });
  });

  test('should perform request to correct provided url', async () => {
    const dataGet = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: 'Get data from API!' });

    await throttledGetDataFromApi('/posts/1');
    jest.runAllTimers();

    expect(dataGet).toBeCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: 'Get data from API!' });

    const res = await throttledGetDataFromApi('/api/lib');
    expect(res).toBe('Get data from API!');
  });
});
