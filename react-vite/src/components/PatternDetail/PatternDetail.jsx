import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as patternActions from "../../redux/pattern";
import * as pImageActions from "../../redux/patternImage";
import PatternMaterials from "../PatternMaterials/PatternMaterials";
import CreateTestModal from "../CreateTest";
import OpenModalButton from "../OpenModalButton";

const PatternDetail = () => {
    const { patternId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pattern_id = Number(patternId);

    const loggedIn = useSelector((state) => state.session.user)

    const pattern = useSelector((state) => state.patterns.patternById)
    const patternImages = useSelector((state) => state.patternImages.images)
    console.log("PATTERN: ", pattern)

    useEffect(() => {
        if (!loggedIn) {
            navigate(`/ `)
        }
    }, [loggedIn, navigate, pattern])

    useEffect(() => {
        if (loggedIn) {
            dispatch(patternActions.viewUserPattern(pattern_id))
            dispatch(pImageActions.getAllPatternImages(pattern_id))
            // dispatch(patternActions.getUserPatterns(pattern.user_id))
        }
    }, [dispatch, loggedIn, pattern_id])

    // const createTestOnClick = () => {

    // }

    return (
        <div className="pattern-details">
            <div className="pattern-title">
                <h1>{pattern.title}</h1>
            </div>
            <div className="pattern-images">
                {patternImages && patternImages.length > 0 ? (
                    patternImages.map((image, index) => (
                        <div key={index} className="image">
                            <img src={image.image}/>
                        </div>
                    ))

                ): ''}
            </div>
            {/* <div className="pattern-creation">
                <ul>Created by: {pattern.user_id}</ul>
                <ul>Created on: {pattern.created_at.slice(0,-12)}</ul>
            </div> */}
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
            <div className="materials">
                <h3>Materials:</h3>
                <p>Instrument: {pattern.materials_instrument}</p>
                <p>Size: {pattern.materials_instrument_size}</p>
                <p>Yardage: {pattern.materials_yardage}</p>
                <p>Yarn weight: {pattern.materials_yarn_weight}</p>
            </div>
            <div className="pattern-only">
                <h3>Pattern:</h3>
                {pattern.pattern}
            </div>
            {/* <div className="materials">
                <PatternMaterials />
            </div> */}

                {/* <ul className="create_test">
                    <OpenModalButton
                        buttonText="Test this pattern?"

                        modalComponent={<CreateTestModal patternId={pattern.id}/>}
                    />
                </ul> */}

        </div>
    )

}

export default PatternDetail;
