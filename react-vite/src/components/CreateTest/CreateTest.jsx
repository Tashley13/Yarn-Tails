import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as testerActions from "../../redux/tester";
import * as patternActions from "../../redux/pattern";

const CreateTest = () => {
    const { patternId } = useParams();
    // console.log("PATTERNID: ", patternId)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pattern_id = Number(patternId)

    const [rating, setRating] = useState('');
    // const [image, setImage] = useState('');
    const [review, setReview] = useState('');
    const [errors, setErrors] = useState({});
    // const { closeModal } = useModal();

    const loggedIn = useSelector((state) => state.session.user)
    const pattern = useSelector((state)=> state.patterns.patternById)
    // console.log("PATTERN: ", pattern)

    useEffect(()=> {
        if (loggedIn) {
            dispatch(patternActions.viewUserPattern(pattern_id))
        }
    }, [loggedIn, dispatch, pattern_id])

    useEffect(() => {
        if (!loggedIn) {
            navigate("/")
        }
    }, [loggedIn, navigate])

    const updateRating = (e) => setRating(e.target.value);
    const updateImage = (e) => setImage(e.target.value);
    const updateReview = (e) => setReview(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!rating) errors.rating = "Rating is required";
        // if (!image) errors.image = "Image is required";
        if (!review) errors.review = "Review is required";

        if (Object.keys(errors).length) {
            setErrors(errors);
            return;
        }
        setErrors({})

        const newTest = {
            patternId,
            rating,
            // image,
            review
        }

        const createdTest = await dispatch(testerActions.createTestByPatternId(patternId, newTest))


        // console.log("CREATED", createdTest)

        if (createdTest && createdTest.id) {
            navigate(`/test/${createdTest.id}`)
        }

    }

    return (
        <div>
        <section className="create-test-form">
            <div className="tester-form-header">
            <h1>Create a test</h1>
            <form className="create-test" onSubmit={handleSubmit}>
                <div className="rating">
                    Rating:
                    <label>
                        <input
                        type='number'
                        placeholder="rating"
                        value={rating}
                        min="0"
                        max="10"
                        onChange={updateRating}
                        />
                    </label>
                    {errors.rating && <p>{errors.rating}</p>}
                </div>
                {/* <div className="test-image">
                    Image:
                    <label>
                        <input
                            type="url"
                            value={image}
                            onChange={updateImage}
                        />
                        {errors.image && <p>{errors.image}</p>}
                    </label>
                </div> */}
                <div className="review">
                    <label>
                        <textarea
                            value={review}
                            placeholder="Leave your thoughts here!"
                            onChange={updateReview}
                        />
                    </label>
                </div>
                <button type="submit">Create your Test</button>
            </form>
            </div>
        </section>
        <div className="pattern-to-test">
            {pattern.pattern}
        </div>
        </div>
    )
}

export default CreateTest;
