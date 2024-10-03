import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import * as patternActions from "../../redux/pattern";
import * as testerActions from "../../redux/tester";
// import * as pImagesActions from "../../redux/patternImage";
import { NavLink } from "react-router-dom";

import './AllPatterns.css'


const AllPatterns = () => {
    // const {userId} = useParams();
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    //if user clicks a pattern tile, check if they are logged in
    const loggedIn = useSelector((state) => state.session.user)


    //grab all the patterns
    const patterns = useSelector((state) => state.patterns.allPatterns);
    console.log("PATTERNS: ", patterns)

    const allTests = useSelector((state) => state.testers.allTests)
    // const patterns=Object.values(eachPattern)[0]
    // console.log("TESTS: ", allTests)

    useEffect(() => {
        dispatch(patternActions.getAllPatterns())
        dispatch(testerActions.getAllTests())

        // console.log("HELLO WORLD")
    }, [dispatch])

    // useEffect(() => {
    //     if (!loggedIn) {

    //     }
    // })

    // const createPattern = async () => {
    //     //navigate to create a pattern page
    // }
    // console.log("GOODNIGHT")
    // console.log("123")

    if (!patterns) {
        //insert button that says 'create a pattern', use createPattern
        return <div>No Patterns Yet!</div>
    }

    const calculateReviews = (patternId) => {
        if (!Array.isArray(allTests)) {
            return 'No tests to review'
        }
        const patternTests = allTests.filter(test => test.pattern_id === patternId);
        const testLength = patternTests.length


        const numerator = patternTests.reduce((acc, test) => acc + test.rating, 0);
        const average = (numerator / testLength).toFixed(2)

        return { testLength, average }
    }

    return (
        <div className="patterns-display">
            <ul>
                {patterns?.length > 0 ? (
                    patterns?.map((pattern) => {
                        const { average, testLength } = calculateReviews(pattern.id);
                        return (
                            <div key={pattern.id} className="pattern-display">
                                <div className="left-image">
                                    {!loggedIn && (
                                        <div>{pattern.title}</div>
                                    )}
                                    {loggedIn && (
                                        <NavLink to={`/${pattern.id}/view_pattern`}>

                                            <div className="pattern-title">
                                                {pattern.title}
                                            </div>
                                        </NavLink>)}
                                    <div className="pattern-difficulty">
                                        difficulty: {pattern.difficulty}
                                    </div>
                                    <div className='pattern-username'>
                                        Created by: {pattern.username}
                                    </div>
                                </div>

                                <div className="pattern-image">
                                    {pattern.display && pattern.display.image ? (
                                        <img src={pattern.display.image}/>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <div className="right-image">
                                    <div className="pattern-times">
                                        <ul>Time: {pattern.time}</ul>

                                        <ul>Testing Time: {pattern.time_limit}</ul>
                                    </div>

                                    {testLength > 0 ? (
                                        <div className="tests-for-pattern">
                                            Tests: {testLength}
                                            Rating: {average} / 10 skeins
                                        </div>
                                    ) : (
                                        ''
                                    )
                                    }
                                </div>

                            </div>
                        );
                    })
                ) : ''}
            </ul>
        </div>
    )
}

export default AllPatterns;
