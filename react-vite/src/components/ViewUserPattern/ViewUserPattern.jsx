import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as patternActions from "../../redux/pattern";
import PatternMaterials from "../PatternMaterials/PatternMaterials";

const ViewUserpattern = () => {
    const { patternId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pattern_id = Number(patternId);

    const loggedIn = useSelector((state) => state.session.user)

    const pattern = useSelector((state) => state.patterns.patternById)
    // console.log("PATTERN: ", pattern)

    useEffect(() => {
        if (!loggedIn || !pattern) {
            navigate(``)
        }
    }, [loggedIn, navigate, pattern])

    useEffect(() => {
        if (loggedIn) {
            dispatch(patternActions.viewUserPattern(pattern_id))
            dispatch(patternActions.getUserPatterns(pattern.user_id))
        }
    }, [dispatch, loggedIn, pattern_id, pattern.user_id])

    //insert view pattern button, eventually check to see if part of tester checkout

    //format date function
    const dateFormat = (created_at) => {
        if (created_at) {
            return created_at.slice(0,-12)
        }
    }

    return (
        <div className="pattern-details">
            <div className="pattern-title">
                {pattern.title}
            </div>
            <div className="pattern-tile-image">
                {pattern.tile_image}
            </div>
            <div className="pattern-images">
                insert images from patternimages table
            </div>
            <div className="pattern-creation">
                <ul>Created by: {pattern.user_id}</ul>
                <ul>Created on: {dateFormat(pattern.created_at)}</ul>
            </div>
            <div className="pattern-info">
                <ul>
                    {pattern.difficulty}
                </ul>
                <ul>
                    {pattern.time}
                </ul>
                <ul>
                    {pattern.time_limit}
                </ul>
            </div>
            <div className="pattern-description">
                {pattern.description}
            </div>
            <div className="materials">
                <PatternMaterials />
            </div>
        </div>
    )
}

export default ViewUserpattern;
