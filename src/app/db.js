import Dexie from 'dexie';

export const db = new Dexie('GameData');
db.version(1).stores({
  games: '++id, file, name, save, type', // Primary key and indexed props
  defaultGames: '++id, file, name, save, defaultGame, type' // Primary key and indexed props
});

db.on("populate", function() {
    // Init your DB with some default statuses:
    //Default NES games
    db.defaultGames.add({file: {name: 'sp_gulls.nes'}, name: "sp_gulls", save: 'saveState', defaultGame: true, type: 'nes'});
    db.defaultGames.add({file: {name: 'bobli.nes'}, name: "bobli", save: 'saveState', defaultGame: true, type: 'nes'});
    db.defaultGames.add({file: {name: 'twin_d.nes'}, name: "twin_d", save: 'saveState', defaultGame: true, type: 'nes'});

    //Default SNES games
    db.defaultGames.add({file: {name: 'su_cook.sfc'}, name: "su_cook", save: 'saveState', defaultGame: true, type: 'snes'});
    db.defaultGames.add({file: {name: 'su_boss.sfc'}, name: "su_boss", save: 'saveState', defaultGame: true, type: 'snes'});
    db.defaultGames.add({file: {name: 'nek.sfc'}, name: "nek", save: 'saveState', defaultGame: true, type: 'snes'});
});