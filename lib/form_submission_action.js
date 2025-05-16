'use server';
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text){
    return !text || text.trim() === '' ;
}

    // Form submissions
    // Triggers when form is submitted
   export async function shareMeal(prevState, formData){

        // Creating form object
        const meal = {
            title: formData.get('title'),
            summary: formData.get('summary'),
            instructions: formData.get('instructions'),
            image: formData.get('image'),
            creator: formData.get('name'),
            creator_email: formData.get('email')
        }
        
        // If user input is empty... do this
        if (isInvalidText(meal.title) || 
        isInvalidText(meal.summary) || 
        isInvalidText(meal.instructions) || 
        isInvalidText(meal.creator) || 
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image || meal.image.size === 0
        ) {
            return{
                message: 'Invalid input.'
            };
        }
        
        await saveMeal(meal);
        // Revalidates the cache that belongs to a certain route path
        // Helps with displaying newly submitted items to the DB
        revalidatePath('/meals');
        redirect('/meals');
    }
