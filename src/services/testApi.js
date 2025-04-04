import { getRandomVerse, getSurah, searchVerses } from './api.js';

const testApi = async () => {
  try {
    console.log('Testing getRandomVerse...');
    const randomVerse = await getRandomVerse();
    console.log('Random Verse:', randomVerse);

    console.log('Testing getSurah...');
    const surah = await getSurah(1); 
    console.log('Surah 1:', surah);

    console.log('Testing searchVerses...');
    const searchResults = await searchVerses('mercy'); 
    console.log('Search Results:', searchResults);
  } catch (error) {
    console.error('Error during API testing:', error);
  }
};

testApi();