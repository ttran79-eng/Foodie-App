'use server';
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

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

        // Test 
        await saveMeal(meal);
        redirect('/meals');
    }
