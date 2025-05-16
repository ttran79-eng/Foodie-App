// localhost:3000/meals/xyz...
// will direct to this page
import classes from './page.module.css';
import Image from 'next/image';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';


// Slug pages get access to params which contains and object key value
// Params.mealSlug is the identifier to fetch details 
export async function generateMetadata({ params }){
    const meal = getMeal(params.mealSlug);

        if (!meal){
        notFound();
    }
    
    return(
        {
            title: meal.title,
            description: meal.summary,
        }
    )
}
export default function MealsDetailPage({params}){
    const meal = getMeal(params.mealSlug)

// Error handling when a meal is not found in the database
    if (!meal){
        notFound();
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br />');
    
    return(
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill></Image>
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                    __html: meal.instructions,
                }}></p>
            </main>
        </>
    )
}