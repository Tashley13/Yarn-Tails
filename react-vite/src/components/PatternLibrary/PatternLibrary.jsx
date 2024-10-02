import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as testerActions from "../../redux/tester";

import './PatternLibrary.css'


const PatternLibrary = () => {
    const { userId } = useParams();
    const user_id = Number(userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loggedIn = useSelector((state) => state.session.user)
    const tests = useSelector((state) => state.testers.allTests)
    console.log("TESTS: ", tests)

    useEffect(() => {
        dispatch(testerActions.getUserTests(user_id))
    }, [dispatch, user_id])

    useEffect(() => {
        if (!loggedIn) {
            navigate('/')
        }
    }, [loggedIn, navigate])

    //since all tests are already pulled, separate them into two variables
    const inProgressTests = tests.filter(test => test.test_progress == 'InProgress');
    const completeTests = tests.filter(test => test.test_progress == 'Complete');

    return (
        <div className="pattern-library">
            <div className="inProgress">
                <h2>In Progress</h2>
                {inProgressTests?.length > 0 ? (
                    inProgressTests.map(test => (
                        <div key={test.id} className="progress-tests">
                            <p>Pattern: {test.pattern_title}</p>
                        </div>
                    ))
                ) : (
                    <p>No tests in progress.</p>
                )}
            </div>
            <div className="complete">
                <h2>Complete</h2>
                {completeTests?.length > 0 ? (
                    completeTests.map(test => (
                        <div key={test.id} className="complete-tests">
                            <p>Pattern: {test.pattern_title}</p>
                        </div>
                    ))
                ) : (
                    <p>No tests have been completed.</p>
                )}
            </div>
        </div>
    )
}

export default PatternLibrary;
