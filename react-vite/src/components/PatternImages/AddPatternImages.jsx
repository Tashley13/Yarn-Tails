import { useState } from "react";
import * as patternImageActions from "../../redux/patternImage";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const AddPatternImages = () => {
    const { patternId } = useParams();
    // console.log("ID", patternId)
    const pattern_id = Number(patternId);

    const loggedIn = useSelector((state)=> state.session.user)
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("pattern_id", pattern_id);
        formData.append("user_id", Number(loggedIn.id));
        console.log("FORMDATA :", formData.get('image'));
        setImageLoading(true);
        await dispatch(patternImageActions.createPatternImage(formData));
        setImageLoading(false);
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
