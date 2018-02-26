import settings from '../settings';
import axios from 'axios';

const {apiBaseURL} = settings;

export function analyzeKeywords(url) {
  return axios.post(`${apiBaseURL}/keywords`, {url})
}