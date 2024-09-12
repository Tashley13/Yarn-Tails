import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as testerActions from "../../redux/tester";
import OpenModalButton from "../OpenModalButton";
// import UpdateTestModal from "../UpdateTest";
import DeleteTestModal from "../DeleteTest/DeleteTestModal";

const TestDetails = () => {
    const { testerId } = useParams();
    // console.log("ID: ", testerId)
    const tester_id = Number(testerId)
    // console.log("TESTID: ", tester_id)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loggedIn = useSelector((state) => state.session.user)

    const test = useSelector((state) => state.testers.testById)
    // console.log("TEST: ", test)

    useEffect(() => {
        if (!loggedIn) {
            navigate("/")
        }
    }, [loggedIn, navigate])

    //make sure the test is being watched for updates
    useEffect(() => {
        if (loggedIn) {
            dispatch(testerActions.getTestById(tester_id))
        }
    }, [loggedIn, dispatch, tester_id])


    const handleDeleteTest = async (testerId) => {
        dispatch(testerActions.deleteUserTest(testerId));
        navigate(`/tests/${loggedIn.id}`)

    }

    if (!test || test.length === 0) {
        return <div>No tests to view!</div>
    }

    return (
        <div className="test-details">
            <div className="test_user">
                Created by: {test.user_id}
            </div>
            <div className="pattern_id">
                Pattern: {test.pattern_id}
            </div>
            <div className="rating">
                Rating: {test.rating}/10
            </div>
            <div className="review">
                {test.review}
            </div>
            <div className="image">
                {test.image}
            </div>
            {loggedIn.id == test.user_id && (
                <ul>
                    <div className="edit-test">
                <button type="submit" onClick={() => {
                    navigate(`/test/${test.id}/edit`)
                }}>
                    Edit Test
                </button>
            </div>
            <div className="delete-test">
                <button type="submit" onClick={() => {
                    handleDeleteTest(test.id)
                }}>
                    Delete Test
                </button>
            </div>
                </ul>
            )}
        </div>


    )
}

export default TestDetails;
