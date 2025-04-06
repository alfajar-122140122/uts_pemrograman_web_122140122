import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.alquran.cloud/v1',
});

export const getRandomVerse = async () => {
  try {
    const randomSurah = Math.floor(Math.random() * 114) + 1;
    const surahResponse = await api.get(`/surah/${randomSurah}`);
    const numberOfAyahs = surahResponse.data.data.numberOfAyahs;
    const randomAyah = Math.floor(Math.random() * numberOfAyahs) + 1;
    const response = await api.get(`/ayah/${randomSurah}:${randomAyah}/editions/quran-uthmani,id.indonesian`);
    return response.data;
  } catch (error) {
    console.error('Error fetching random verse:', error);
    throw error;
  }
};

export const getSurah = async (surahNumber) => {
  try {
    const response = await api.get(`/surah/${surahNumber}/editions/quran-uthmani,id.indonesian`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching surah ${surahNumber}:`, error);
    throw error;
  }
};

export const searchVerses = async (query) => {
  try {
    const response = await api.get(`/search/${query}/all/id.indonesian`);
    return response.data;
  } catch (error) {
    console.error('Error searching verses:', error);
    throw error;
  }
};