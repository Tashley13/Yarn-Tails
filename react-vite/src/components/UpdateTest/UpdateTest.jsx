import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as testerActions from "../../redux/tester";

const UpdateTest = () => {
    const { testerId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const test_id = Number(testerId)
    // console.log("TEST: ", testerId)

    const [rating, setRating] = useState('');
    // const [image, setImage] = useState('');
    const [review, setReview] = useState('');

    useEffect(()=> {
        if (test_id) {
            dispatch(testerActions.getTestById(test_id))
        }
    }, [dispatch, test_id])

    const loggedIn = useSelector((state)=> state.session.user)

    const test = useSelector((state)=> state.testers.testById)

    useEffect(()=> {
        if (!loggedIn) {
            navigate("/")
        }
    }, [loggedIn, navigate])

    useEffect(()=> {
        if (test) {
            setRating(test.rating || '');
            // setImage(test.image || '');
            setReview(test.review || '');
        }
    }, [test])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateTest = {
            ...test,
            rating,
            // image,
            review
        }

       const editedTest = await dispatch(testerActions.updateUserTest(updateTest))

       if (editedTest) {
        navigate(`/test/${editedTest.id}`)
       }
    }

    return (
        <div className="update-tester-form-header">
            <h1>Update your test</h1>
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
                {/* <div className="test-image">
                    Image:
                    <label>
                        <input
                            type="url"
                            value={image}
                            onChange={(e)=>setImage(e.target.value)}
                        />
                        {errors.image && <p>{errors.image}</p>}
                    </label>
                </div> */}
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

export default UpdateTest;
