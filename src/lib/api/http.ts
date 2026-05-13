import axios from 'axios';
import { PUBLIC_IOT_API_BASE_URL } from '$env/static/public';

export const http = axios.create({
  baseURL: PUBLIC_IOT_API_BASE_URL || 'http://localhost:3000',
  timeout: 8_000,
  headers: {
    'Content-Type': 'application/json',
  },
});
