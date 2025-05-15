// Write the code that reachces out to the database to use for our meals page.js

import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals(){
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // throw new Error('Loading meals failed');
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug){
    return(
        db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
    )
}