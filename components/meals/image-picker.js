'use client';
import { useRef, useState } from 'react';
import classes from './image-picker.module.css'
import Image from 'next/image';

export default function ImagePicker({ label, name }) {
    const [pickedImage, setPickedImage] = useState();
    const imageInput = useRef();

    function handlePickClick(){
        imageInput.current.click();

    }

    function handleImageChange(event){
        // This access the first files
        const file = event.target.files[0];

        if (!file){
            return;
        }
        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };

        // When this runs, it will add a value to onload
        fileReader.readAsDataURL(file);

    }
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && 
                    <Image src={pickedImage} 
                    alt="The image selected by the user" fill></Image>}
                </div>
                
                <input 
                className={classes.input} 
                type="file" 
                id={name} 
                accept="image/png, image/jpeg, image/jpg" 
                name={name}
                ref={imageInput}
                onChange={handleImageChange}
                ></input>
                
                <button 
                className={classes.button} 
                type="button" 
                onClick={handlePickClick}
                >Pick an Image</button>
            </div>

        </div>
    )
}