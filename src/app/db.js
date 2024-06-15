import Dexie from 'dexie';

export const db = new Dexie('GameData');
db.version(1).stores({
  games: '++id, file, name, save' // Primary key and indexed props
});