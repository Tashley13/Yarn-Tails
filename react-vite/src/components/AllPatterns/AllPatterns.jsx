import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as patternActions from "../../redux/pattern";
import * as testerActions from "../../redux/tester";
import { NavLink } from "react-router-dom";

import './AllPatterns.css'


const AllPatterns = () => {
    // const {userId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //if user clicks a pattern tile, check if they are logged in
    const loggedIn = useSelector((state) => state.session.user)


    //grab all the patterns
    const patterns = useSelector((state) => state.patterns.allPatterns);

    const allTests = useSelector((state) => state.testers.allTests)
    // const patterns=Object.values(eachPattern)[0]
    console.log("PATTERNS: ", allTests)

    useEffect(() => {
        dispatch(patternActions.getAllPatterns())
        dispatch(testerActions.getAllTests())
        // console.log("HELLO WORLD")
    }, [dispatch])

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
                    patterns.map((pattern) => {
                        const { average, testLength } = calculateReviews(pattern.id);
                        return (
                            <div key={pattern.id} className="pattern-display">
                                <div className="left-image">
                                    <NavLink to={`/${pattern.id}/view_pattern`}>
                                        <div className="pattern-title">
                                            {pattern.title}
                                        </div>
                                    </NavLink>
                                    <div className="pattern-difficulty">
                                        difficulty: {pattern.difficulty}
                                    </div>
                                    <div className='pattern-username'>
                                    Created by: {pattern.username}
                                </div>
                                </div>

                                <div className="pattern-image">
                                    {pattern.tile_image}
                                </div>
                                <div className="right-image">
                                <div className="pattern-times">
                                    <ul>Time: {pattern.time}</ul>

                                    <ul>Testing Time: {pattern.time_limit}</ul>
                                </div>

                                <div className="tests-for-pattern">
                                    Tests: {testLength}
                                    Rating: {average} / 10 skeins
                                </div>
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
