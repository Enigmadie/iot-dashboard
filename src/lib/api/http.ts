import axios from 'axios';
import { env } from '$env/dynamic/public';

export const http = axios.create({
  baseURL: env.PUBLIC_IOT_API_BASE_URL || 'http://localhost:3000',
  timeout: 8_000,
  headers: {
    'Content-Type': 'application/json',
  },
});
