import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as pImageActions from "../../redux/patternImage";
import { useParams } from "react-router-dom";
import './GetPatternImages.css'

const ImagesbyPattern = () => {
    const { patternId } = useParams();
    const pattern_id = Number(patternId);
    const dispatch=useDispatch();
    const loggedIn = useSelector((state)=> state.session.user);

    const patternImages = useSelector((state)=> state.patternImages.images)
    // const patternImage = patternImages.pattern_images
    console.log("IMAGES: ", patternImages)

    useEffect(()=> {
        dispatch(pImageActions.getAllPatternImages(pattern_id))
    }, [dispatch, pattern_id])

    return (
        <div className="pattern-images">
            {patternImages && patternImages.length > 0 ? (
                patternImages.map((image, key)=> (
                    <div key={key} className="image">
                        <img src={image.image} />
                    </div>
                ))
            ): 'no images'}
        </div>
    )

}

export default ImagesbyPattern;
