'use server';
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidText(text){
    return !text || text.trim() === '' ;
}

    // Form submissions
    // Triggers when form is submitted
   export async function shareMeal(formData){

        // Creating form object
        const meal = {
            title: formData.get('title'),
            summary: formData.get('summary'),
            instructions: formData.get('instructions'),
            image: formData.get('image'),
            creator: formData.get('name'),
            creator_email: formData.get('email')
        }
        
        // Validating user input
        if (isInvalidText(meal.title) || 
        isInvalidText(meal.summary) || 
        isInvalidText(meal.instructions) || 
        isInvalidText(meal.creator) || 
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image || meal.image.size === 0
        ) {
            throw new Error('Invalid input');
        }
        
        await saveMeal(meal);
        redirect('/meals');
    }
