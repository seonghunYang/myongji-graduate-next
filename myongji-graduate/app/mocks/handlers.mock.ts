import { HttpResponse, http, delay } from 'msw';
import { API_PATH } from '../business/api-path';
import { revenue } from './data.mock';

export const handlers = [
  http.get('/revenue', async () => {
    await delay(5000);
    console.log(revenue)
    return HttpResponse.json(revenue);
  })
]