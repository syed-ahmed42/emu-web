


export const getParameters = (searchParams) => {
    let dg = searchParams.get('dg');
    let g = searchParams.get('g');
    if (dg)
    {
        return {key: 'dg', value: dg}
    }
    else if (g)
    {
        return {key: 'g', value: g}
    }
    return null;
}



export const getGameObject = async (dbObj, searchParams) => {
    let myGame = null;
    let dbParamObj = getParameters(searchParams);
    
    let dbStoreName = dbParamObj?.key;
    let dbGameId = Number(dbParamObj?.value);

    console.log("These are the numbers: " + dbStoreName + "" + dbGameId)

    if (dbStoreName?.localeCompare('dg') === 0)
    {
        myGame = await dbObj.defaultGames.get(dbGameId);
    }
    else if (dbStoreName?.localeCompare('g') === 0)
    {
        myGame = await dbObj.games.get(dbGameId);
    }
    console.log('This is the game ' + myGame.file.name)
    return myGame;
}