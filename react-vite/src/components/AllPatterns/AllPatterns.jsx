import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as patternActions from "../../redux/pattern";
import { NavLink } from "react-router-dom";

import './AllPatterns.css'


const AllPatterns = () => {
    // const {userId} = useParams();
    const dispatch= useDispatch();
    const navigate= useNavigate();

    //if user clicks a pattern tile, check if they are logged in
    const loggedIn= useSelector((state)=>state.session.user)


    //grab all the patterns
    const patterns=useSelector((state) => state.patterns.allPatterns);
    // const patterns=Object.values(eachPattern)[0]
    // console.log("PATTERNS: ", patterns)

    useEffect(()=> {
        dispatch(patternActions.getAllPatterns())
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

    return (
        <div className="patterns-display">
           <ul>
            {patterns?.length > 0 ? (
                patterns.map((pattern, key) => (
                    <div key={key} className="pattern-display">
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
                        <div className="pattern-times">
                            <ul>Time: {pattern.time}</ul>

                            <ul>Testing Time: {pattern.time_limit}</ul>
                        </div>
                        <div className="pattern-image">
                            {pattern.tile_image}
                        </div>
                    </div>

                ))
            ): ''}
           </ul>
        </div>
    )
}

export default AllPatterns;
