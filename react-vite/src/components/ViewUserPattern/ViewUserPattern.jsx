import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { useState } from "react";
import * as patternActions from "../../redux/pattern";
import * as testerActions from "../../redux/tester";
// import PatternMaterials from "../PatternMaterials/PatternMaterials";
// import CreateTestModal from "../CreateTest";
// import OpenModalButton from "../OpenModalButton";
// import ConfirmationModal from "./ConfirmationModal";


const ViewUserpattern = () => {
    const { patternId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pattern_id = Number(patternId);
    const [showDelete, setShowDelete] = useState(false);
    const [showTest, setShowTest] = useState(false);

    const loggedIn = useSelector((state) => state.session.user)
    const pattern = useSelector((state) => state.patterns.patternById)
    const patternTests = useSelector((state) => state.testers.allTests)
    const tests = patternTests?.testers
    // console.log("PATTERN: ", pattern);
    // console.log("TESTS: ", tests);

    // if (pattern.user_id !== loggedIn.id) {
    //     return <div>
    //         No patterns, create one now!
    //         <button type="submit" onClick={(() => navigate('/'))}>
    //             Create Pattern
    //         </button>
    //     </div>
    // }

    useEffect(() => {
        if (!loggedIn) {
            navigate("/")
        }
    }, [loggedIn, navigate, patternId])


    useEffect(() => {
        if (loggedIn) {
            dispatch(patternActions.viewUserPattern(pattern_id))

            dispatch(testerActions.getTestsByPatternId(pattern_id))
            if (pattern?.user_id) {
                dispatch(patternActions.getUserPatterns(pattern.user_id))
            }
        }
    }, [dispatch, loggedIn, pattern_id, pattern?.user_id])



    const handleDeletePattern = () => {
        setShowDelete(true);
    }


    const confirmDelete = () => {
        dispatch(patternActions.deleteUserPattern(pattern_id))
        setShowDelete(false);
        navigate(`/patterns/${loggedIn?.id}`)
    }

    const cancelDelete = () => {
        setShowDelete(false)
    }

    const handleTestPattern = () => {
        setShowTest(true);
    }

    const confirmPatternTest = () => {
        const newTest= {
            rating: '',
            review: '',
            test_progress: 'InProgress'
        };
        dispatch(testerActions.createTestByPatternId(pattern_id, newTest))
        setShowTest(false);
        navigate(`/`)
    }

    const handleNoTest = () => {
        setShowTest(false);
    }

    const editPatternButton = async () => {
        navigate(`/${pattern_id}/edit`)
    }

    //insert view pattern button, eventually check to see if part of tester checkout

    //format date function
    const dateFormat = (created_at) => {
        return created_at ? created_at.slice(0, -12) : '';

    }


    const calculateReviews = (patternId) => {
        if (!tests || tests.length === 0) {
            return { testLength: 0, average: null, reviews: [] };
        }
        else {
            const patternTests = tests.filter(test => test.pattern_id === patternId);
            const testLength = patternTests.length

            if (patternTests.length === 0) {
                return { testLength: 0, average: null, reviews: [] }
            }

            const numerator = patternTests.reduce((acc, test) => acc + test.rating, 0);
            const average = (numerator / testLength).toFixed(2)
            // console.log("TESTS: ", patternTests)
            return { testLength, average, reviews: patternTests }
        }
    }

    const { testLength, average, reviews } = calculateReviews(pattern_id)

    const alreadyTested = tests?.some(test => test.user_id == loggedIn?.id && test.pattern_id == pattern_id)

    // if (!pattern) {
    //     return <div> Loading...</div>
    // }


    // console.log('test length ', testLength)
    //check if pattern exists before returning jsx
    return pattern ? (
        <div className="pattern-details">
            <div className="pattern-title">
                {pattern.title}
            </div>
            {/* <div className="pattern-tile-image">
                {pattern.tile_image}
            </div> */}
            {/* <div className="pattern-images">
                insert images from patternimages table
            </div> */}
            <div className="pattern-creation">
                <ul>Created by: {pattern.user_id}</ul>
                <ul>Created on: {dateFormat(pattern.created_at)}</ul>
            </div>
            <div className="pattern-info">
                <ul>
                    {pattern.difficulty}
                </ul>
                <ul>
                    time: {pattern.time}
                </ul>
                <ul>
                    time limit: {pattern.time_limit}
                </ul>
            </div>
            <div className="pattern-description">
                {pattern.description}

            </div>
            <div className="Materials">
                <h1>Materials</h1>
                <p>Instrument: {pattern.materials_instrument}</p>
                <p>Instrument size: {pattern.materials_instrument_size}</p>
                <p>Yarn weight: {pattern.materials_yarn_weight}</p>
                <p>Yardage: {pattern.materials_yardage}</p>
            </div>

            {loggedIn?.id == pattern.user_id && (
                 <div>
                 <h1>Pattern</h1>
                 {pattern.pattern}</div>
            )}
            <h1> Test Reviews</h1>
            <p>
                {reviews.length > 0 ? (
                    <div className="test-reviews">
                        Total tests: {testLength}
                        Average score: {average} / 10 skeins
                    </div>
                ) : (
                    ''
                )}
            </p>

            {reviews?.length > 0 ? (
                reviews.map((test, index) => (
                    <div key={index} className="tests">
                        <p>Rating: {test.rating} / 10 skeins</p>
                        <p>{test.review}
                            {test.user_id === loggedIn?.id && (
                                <button onClick={() => {
                                    navigate(`/test/${test.id}/edit`)
                                }}>Edit Test</button>
                            )}   </p>
                    </div>
                ))

            ) : 'No tests for this pattern yet!'}
            {loggedIn?.id !== pattern.user_id && !alreadyTested && (
                <ul>
                    <div className="test-pattern">
                    <button type="submit" onClick={handleTestPattern}>
                        Test Pattern
                    </button>
                </div>
                {showTest && (
                    <div>
                        <p>Do you wish to test this pattern?</p>
                        <button onClick={confirmPatternTest}>Yes, create Test</button>
                        <button onClick={handleNoTest}>No, I do not want to test this pattern</button>
                    </div>
                )}
                </ul>
            )
            }
            {/* <div className="materials">
                <PatternMaterials />
            </div> */}
            {loggedIn?.id == pattern.user_id && (
                <ul>
                    <div className="edit-pattern">
                        <button type="submit" onClick={() => (
                            editPatternButton(pattern.id)
                        )}>
                            Edit Pattern
                        </button>
                    </div>
                    <div className="delete-pattern">
                        <button type="submit" onClick={handleDeletePattern}>
                            Delete Pattern
                        </button>
                    </div>
                    {showDelete && (
                        <div>
                            <p>Do you wish to delete your pattern?</p>
                            <button onClick={confirmDelete}>Yes, delete</button>
                            <button onClick={cancelDelete}>No, do not delete</button>
                        </div>
                    )}
                </ul>
            )
            }

        </div>
    ) : null
}



// {deletePopUp &&  (
//     <ConfirmationModal
//     message="Confirm pattern deletion"
//     onConfirm={deletePatternConfirm}
//     onCancel={cancelDeletePattern}
//     />
// )}
export default ViewUserpattern;
