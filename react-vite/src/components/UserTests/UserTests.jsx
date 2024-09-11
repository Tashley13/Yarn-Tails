import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import * as testerActions from "../../redux/tester";
import OpenModalButton from "../OpenModalButton";
// import UpdateTest from "../UpdateTest";


const UserTests = () => {
    const { userId } = useParams();
    // console.log("USERID: ", typeof userId)
    const user_id = Number(userId)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loggedIn = useSelector((state) => state.session.user)

    const userTests = useSelector((state) => state.testers.allTests)
    // console.log("TESTS: ", userTests)

    useEffect(() => {
        if (!loggedIn) {
            navigate("/")
        }

    }, [loggedIn, navigate])

    useEffect(() => {
        if (loggedIn) {
            dispatch(testerActions.getUserTests(user_id))
        }
    }, [dispatch, user_id, loggedIn])


    if (!userTests || userTests.length ===0) {
        return <div>No tests to view!</div>
    }

    return (
        <div className="user-tests-display">
            <ul>
                {userTests?.length > 0 ? (
                    userTests.map((test, key) => (
                        <div key={key} className="user-tests">
                            <NavLink to={`/test/${test.id}`}>
                            <div className="pattern_id">
                                Pattern: {test.pattern_id}
                            </div>
                            </NavLink>
                            <div className="rating">
                                Rating: {test.rating} /10
                            </div>
                            <div className="review">
                                {test.review}
                            </div>
                            <div className="image">
                                {test.image}
                            </div>
                         <div className="edit-test">
                            <button type="submit" onClick={()=> {
                                navigate(`/test/${test.id}/edit`)
                            }}>
                                Edit Test
                            </button>
                        </div>
                        </div>
                    ))
                ) : 'No tests!'}
            </ul>
        </div>
    )
}

export default UserTests;
