import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as testerActions from "../../redux/tester";

function UpdateTestModal({test}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [rating, setRating] = useState(test.rating);
    const [image, setImage] = useState(test.image);
    const [review, setReview] = useState(test.review);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateTest = {
            ...test,
            rating,
            image,
            review
        }

        try {
            await dispatch(testerActions.updateUserTest(updateTest));
            closeModal();
        } catch (error) {
            console.error("ERROR: ", error)
        }
    }

    return (
        <div className="update-tester-form-header">
            <h1>Create a test</h1>
            <form className="update-test" onSubmit={handleSubmit}>
                <div className="rating">
                    Rating:
                    <label>
                        <input
                        type='number'
                        value={rating}
                        min="0"
                        max="10"
                        onChange={(e)=>setRating(e.target.value)}
                        />
                    </label>
                    {/* {errors.rating && <p>{errors.rating}</p>} */}
                </div>
                <div className="test-image">
                    Image:
                    <label>
                        <input
                            type="url"
                            value={image}
                            onChange={(e)=>setImage(e.target.value)}
                        />
                        {/* {errors.image && <p>{errors.image}</p>} */}
                    </label>
                </div>
                <div className="review">
                    <label>
                        <textarea
                            value={review}
                            onChange={(e)=>setReview(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Update your Test</button>
            </form>
            </div>
    )
}

export default UpdateTestModal;
