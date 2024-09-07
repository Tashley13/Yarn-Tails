import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as testerActions from "../../redux/tester";

const UserTests = () => {
    const { userId } = useParams();
    // console.log("USERID: ", typeof userId)
    const user_id=Number(userId)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loggedIn = useSelector((state)=> state.session.user)

    const userTests = useSelector((state)=> state.testers.allTests)
    console.log("TESTS: ", userTests)

    useEffect(()=> {
        if (!loggedIn) {
            navigate("/")
        }
        if (!userTests) {
            <div>You have no tests!</div>
        }
    }, [loggedIn, navigate, userTests])

    useEffect(()=> {
        if (loggedIn) {
            dispatch(testerActions.getUserTests(user_id))
        }
    }, [dispatch, user_id, loggedIn])

    if (!userTests) {
        return <div>No tests to view!</div>
    }

    return (
        <div className="user-tests-display">
            <ul>
                {userTests?.length > 0 ? (
                    userTests.map((test, key) => (
                    <div key={key} className="user-tests">
                        <div className="pattern_id">
                            Pattern: {test.pattern_id}
                        </div>
                        <div className="rating">
                            Rating: {test.rating} /10
                        </div>
                        <div className="review">
                            {test.review}
                        </div>
                        <div className="image">
                            {test.image}
                        </div>
                    </div>
                    ))
                ) : 'No tests!'}
            </ul>
        </div>
    )
}

export default UserTests;
