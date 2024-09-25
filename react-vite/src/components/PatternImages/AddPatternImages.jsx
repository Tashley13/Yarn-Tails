import { useState } from "react";
import * as patternImageActions from "../../redux/patternImage";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const AddPatternImages = () => {
    const { patternId } = useParams();
    // console.log("ID", patternId)
    const pattern_id = Number(patternId);

    const loggedIn = useSelector((state) => state.session.user)
    const dispatch = useDispatch();
    const [images, setImages] = useState([{ image: null, isDisplay: false }]);
    const [imageLoading, setImageLoading] = useState(false);

    const handleImageChange = (index, field, val) => {
        const updatedImages = images.map((image, i) =>
            i === index ? { ...image, [field]: val } : image
        );
        setImages(updatedImages)
    }

    const handleDisplayChange = (index) => {
        const updatedImages = images.map((image, i) =>
            i === index ? { ...image, isDisplay: true } : { ...image, isDisplay: false }
        )
        setImages(updatedImages)
    }

    const addImage = () => {
        setImages([...images, { image: null, isDisplay: false }])
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setImageLoading(true);
        for (let imageData of images) {
            const formData = new FormData();
            formData.append("image", imageData.image);
            formData.append("pattern_id", pattern_id);
            formData.append("user_id", Number(loggedIn.id));
            formData.append('display_image', imageData.isDisplay ? true:false);
            // console.log("FORMDATA :", formData.get('image'));

            await dispatch(patternImageActions.createPatternImage(formData));
        }
        setImageLoading(false);
    }



    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
            {images.map((imageData, index) => (
                <div key={index}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(index, "image", e.target.files[0])}
                    />
                    <label>
                        Display Image:
                        <input
                            type="checkbox"
                            checked={imageData.isDisplay}
                            onChange={() => handleDisplayChange(index)}
                        />
                    </label>
                </div>
            ))}
            <button type="button" onClick={addImage}>
                Add Another Image</button>
            <button type="submit">
                Submit
            </button>
            {(imageLoading) && <p>Loading...</p>}
        </form>
    )
}


export default AddPatternImages;
