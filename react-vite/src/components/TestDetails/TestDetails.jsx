import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as testerActions from "../../redux/tester";
import OpenModalButton from "../OpenModalButton";
import UpdateTestModal from "../UpdateTest";

const TestDetails = () => {
    const { testerId } = useParams();
    // console.log("ID: ", testerId)
    const tester_id = Number(testerId)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loggedIn = useSelector((state)=> state.session.user)

    const test = useSelector((state)=> state.testers.testById)
    // console.log("TEST: ", test)

    useEffect(()=> {
        if(!loggedIn || !test) {
            navigate("/")
        }
    }, [loggedIn, test, navigate])

    useEffect(()=> {
        if (loggedIn) {
            dispatch(testerActions.getTestById(tester_id))
        }
    }, [loggedIn, dispatch, tester_id])

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
            <ul className="update-test">
                <OpenModalButton
                    buttonText="Update your test"

                    modalComponent={<UpdateTestModal test={test}/>}
                />
            </ul>
        </div>


    )
}

export default TestDetails;
