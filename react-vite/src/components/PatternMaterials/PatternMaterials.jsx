import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as patternActions from "../../redux/pattern";

import './PatternMaterials.css'

const PatternMaterials = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user_id = Number(userId)
    // console.log("USERID: ",typeof user_id)
    const loggedIn = useSelector((state) => state.session.user)

    const patterns = useSelector((state) => state.patterns.allPatterns)
    // const patterns = Object.values(eachPattern)[0]
    // console.log("PATTERN", patterns)

    useEffect(() => {
        if (!loggedIn) {
            navigate(``)
        }
    }, [loggedIn, navigate])

    useEffect(() => {
        if (loggedIn) {
            dispatch(patternActions.getUserPatterns(user_id))
        }
    }, [dispatch, user_id, loggedIn])


    //return create a pattern button as well
    if (!patterns) {
        return <div>You have no patterns!</div>
    }

    return (
        <div className='user-material-display'>
            <ul>
                {patterns?.length > 0 ? (
                    patterns.map((pattern, key) => (
                        <div key={key} className='user-materials'>
                            <div className='user-instrument'>
                                {pattern.materials_instrument}
                            </div>
                            <div className="user-instrument_size">
                                {pattern.materials_instrument_size}
                            </div>
                            <div className="user-yarn_weight">
                                {pattern.materials_yarn_weight}
                            </div>
                            <div className="user-yardage">
                                {pattern.materials_yardage}
                            </div>

                        </div>
                    ))
                ) : ''}
            </ul>
        </div>
    )
}

export default PatternMaterials;
