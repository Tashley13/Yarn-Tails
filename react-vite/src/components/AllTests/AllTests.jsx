import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as testerActions from "../../redux/tester";

const AllTests = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loggedIn=useSelector((state)=> state.session.user)

    useEffect(()=> {
        if (!loggedIn) {
            navigate("/")
        }
    }, [navigate, loggedIn])

    const tests = useSelector((state)=> state.testers.allTests)
    console.log("TESTS: ", tests)

    useEffect(()=> {
        dispatch(testerActions.getAllTests())
    }, [dispatch])

    if (!tests) {
        return <div>No tests yet!</div>
    }

    return (
        <div className="tests-display">
            <ul>
                {tests?.length > 0 ? (
                    tests.map((test, key) => (
                        <div key={key} className="test-display">
                        <div className="review-user_id">
                            Created by: {test.user_id}
                        </div>
                        <div className="pattern_id">
                            Pattern: {test.pattern_id}
                        </div>
                        <div className="rating">
                            Rating: {test.rating} /10
                        </div>
                        <div className="review">
                            {test.review}
                        </div>
                        {/* <div className="image">
                            {test.image}
                        </div> */}
                        </div>
                    ))
                ) : 'No tests!'}
            </ul>
        </div>
    )
}

export default AllTests;
