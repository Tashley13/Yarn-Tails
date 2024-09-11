import { useState } from "react";
import * as patternImageActions from "../../redux/patternImage";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const AddPatternImages = () => {
    const { patternId } = useParams();
    console.log("ID", patternId)
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    //need to be able to update the pattern images when it is time to add a new one
    // const handleChange = (index, e) => {
    //     const newImages = [...images] //create a variable with all the previous images
    //     newImages[index] = e.target.files[0]; //add the newest image
    //     setImages(newImages); //make sure this state has the newly uploaded image
    // }

    // //need to be able to add another file
    // const addNewImage = () => {
    //     setImages([...images, null]) //null is where the new image will go
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        console.log("FORMDATA :", formData);
        setImageLoading(true);
        await dispatch(patternImageActions.createPatternImage(formData));
    }



    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />



            {/* <button type="button" onClick={addNewImage}>Add Another Image</button> */}
            <button type="submit">
                Submit
            </button>
            {(imageLoading) && <p>Loading...</p>}
        </form>
    )
}


export default AddPatternImages;
