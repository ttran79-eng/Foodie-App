// Write the code that reachces out to the database to use for our meals page.js

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

import fs from 'node:fs';

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

export async function saveMeal(meal){
    // Creates a slug for the db using the title of the meal
    meal.slug = slugify(meal.title, {lower: true});
    // Clean and sanitize instructions to prevent malicious inputs
    meal.instructions = xss(meal.instructions);

    // Image should be stored on the file system not DB
    // Grab the extension of the image
    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    // Will use this value to write to the image path in the database
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error){
            throw new Error('Saving image failed...');
        }
    });

    meal.image = `/images/${fileName}`;
    db.prepare(`
        INSERT INTO MEALS
        (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
         @title,
         @summary,
         @instructions,
         @creator,
         @creator_email,
         @image,
         @slug
         )
        `).run(meal);
}
