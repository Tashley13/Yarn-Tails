import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTestsByPatternId } from "../../redux/tester";

const PatternTests = () => {
    const { patternId } = useParams();
    // console.log("ID: ", typeof patternId)
    const pattern_id = Number(patternId);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loggedIn = useSelector((state) => state.session.user)

    const tests = useSelector((state) => state.testers.allTests)
    console.log("TESTS: ", tests)

    useEffect(() => {
        if (!loggedIn) {
            navigate("/")
        }
    }, [navigate, loggedIn])

    useEffect(() => {
        if (loggedIn) {
            dispatch(getTestsByPatternId(pattern_id))
        }
    }, [dispatch, loggedIn, pattern_id])

    if (!tests) {
        return <div>No tests for this pattern!</div>
    }

    return (
        <div className="pattern-tests-display">
            <ul>
                {tests?.length > 0 ? (
                    tests.map((test, key)=> (
                        <div key={key} className="pattern-tests">
                            <div className="user_id">
                                Test by: {test.user_id}
                            </div>
                            <div className="rating">
                                Rating: {test.rating}
                            </div>
                            <div className="review">
                                {test.review}
                            </div>
                            {/* <div className="image">
                                {test.image}
                            </div> */}
                        </div>
                    ))
                ): 'No tests for this pattern yet!'}
            </ul>
        </div>
    )
}

export default PatternTests;
