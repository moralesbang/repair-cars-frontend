import ROUTES from 'constants/routes';

import {create} from 'apisauce';

const api = create({
  baseURL: 'https://app-garage-back.herokuapp.com',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiMock = create({
  baseURL: 'https://private-2860b4-garageappapi.apiary-mock.com',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.addAsyncResponseTransform(async (response) => {
  if (!response.ok && response.config?.url !== ROUTES.LOGIN) {
    const mockedResponse = await apiMock.any({
      method: response.config.method,
      url: response.config?.url,
    });

    response.data = mockedResponse.data;
    response.duration = mockedResponse.duration;
    response.problem = mockedResponse.problem;
    response.ok = mockedResponse.ok;
    response.status = mockedResponse.status;
    response.headers = mockedResponse.headers;
    response.config = mockedResponse.config;
  }
});

export default api;
