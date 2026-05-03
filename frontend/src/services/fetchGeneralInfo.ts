import { GeneralInfo } from '../types/generalInfo';

export const fetchGeneralInfo = async (): Promise<GeneralInfo> => {
  const res = await fetch('http://localhost:5000/mvstCoffee/generalInfo');
  if (!res.ok) throw new Error('Failed to fetch coffee page');
  return res.json();
};