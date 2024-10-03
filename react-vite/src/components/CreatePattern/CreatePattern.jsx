import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import * as patternActions from "../../redux/pattern";
// import AddPatternImages from "../PatternImages";


const CreatePattern = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [title, setTitle] = useState('');
    // const [tileImage, setTileImage] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [time, setTime] = useState('');
    const [timeLimit, setTimeLimit] = useState('');
    const [description, setDescription] = useState('');
    const [instrument, setInstrument] = useState('');
    const [instrumentSize, setInstrumentSize] = useState('');
    const [yarnWeight, setYarnWeight] = useState('');
    const [yardage, setYardage] = useState('');
    const [pattern, setPattern] = useState('');
    const [confirmPattern, setConfirmPattern] = useState(false);
    // const [newPatternId, setNewPatternId] = useState(null);
    //create a use state to store the new patterns id to pass into the pattern images
    const [errors, setErrors] = useState({});

    const loggedIn = useSelector((state) => state.session.user)
    const allPatterns = useSelector((state) => state.patterns.allPatterns)
    // console.log("ALL: ", allPatterns)

    useEffect(() => {
        if (!loggedIn) {
            navigate('/');
        }
    }, [loggedIn, navigate])

    useEffect(() => {
        dispatch(patternActions.getAllPatterns())
    }, [dispatch])

    const updateTitle = (e) => setTitle(e.target.value);
    // const updateTileImage = (e) => setTileImage(e.target.value);
    const updateDifficulty = (e) => setDifficulty(e.target.value);
    const updateTime = (e) => setTime(e.target.value);
    const updateTimeLimit = (e) => setTimeLimit(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateInstrument = (e) => setInstrument(e.target.value);
    const updateInstrumentSize = (e) => setInstrumentSize(e.target.value);
    const updateYarnWeight = (e) => setYarnWeight(e.target.value);
    const updateYardage = (e) => setYardage(e.target.value);
    const updatePattern = (e) => setPattern(e.target.value);

    const handleAddImages = () => {
        setConfirmPattern(true);
    }

    const continueEditingPattern = () => {
        setConfirmPattern(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {} // push errors to
        //check to make sure the fields are filled in
        if (!title) errors.title = 'Title is required';
        // if (!tileImage) errors.tileImage = 'Tile image is required';
        if (!difficulty) errors.difficulty = 'Difficulty is required';
        if (time.length < 3) errors.time = 'Time needs to be more specifc';
        if (!timeLimit || timeLimit == 'select one') errors.timeLimit = "Time limit is required";
        if (description.length < 20) errors.description = "Description needs to be greater than 20 characters";
        if (!instrument || instrument == 'select one') errors.instrument = "Instrument is required";
        if (!instrumentSize || instrumentSize == 'select one') errors.instrumentSize = "Instrument size is required";
        if (!yarnWeight || yarnWeight == 'select one') errors.yarnWeight = "Yarn weight is required";
        if (yardage < 1 || yardage > 9999) errors.yardage = "Yardage must be greater than 0 and less than 10,000";
        if (pattern.length < 40) errors.pattern = "Pattern needs to be more than 40 characters";


        const sameTitle = allPatterns?.some(pattern => {
            return pattern.title==title;
        })

        if (sameTitle) errors.title = 'This title already exists'

        const sameDescripiton = allPatterns?.some(pattern => {
            return pattern.description == description;
        })

        if (sameDescripiton) errors.description = "This description already exists"
        //look to see if errors has any length of keys, if so set errors, return, and clear errors
        //look for same patterns, lowercased
        const samePattern = allPatterns?.some(p => {
            console.log("P", p)

                return p.pattern == pattern;
            })
            // console.log("PATTERNCHECK: ",samePattern)

        if (samePattern) errors.pattern = "A pattern exactly like this already exists"


        if (Object.keys(errors).length) {
            setErrors(errors);
            return;
        }

        setErrors({})

        //create newPattern object to dispatch
        //need to match backend create route
        const newPattern = {
            title,
            // tile_image: tileImage,
            difficulty,
            time,
            time_limit: timeLimit,
            description,
            materials_instrument: instrument,
            materials_instrument_size: instrumentSize,
            materials_yarn_weight: yarnWeight,
            materials_yardage: yardage,
            pattern
        }
        console.log("NEW PATTERN: ", newPattern)
        const createdPattern = await dispatch(patternActions.createUserPattern(newPattern));
        setConfirmPattern(false);
        // console.log("CREATED: ", Object.values(createdPattern))
        // if (Object.values(createdPattern) == 'pattern already exists') {
        //     errors.pattern = "This pattern already exists"
        // }

        if (createdPattern && createdPattern.id) {
            // setNewPatternId(createdPattern.id) //set the new patternId as the newly created pattern id
            navigate(`/pimages/${createdPattern.id}/newImages`)
        }
    }

    return (
        <section className="create-pattern-form">
            <div className="pattern-form-header">
                <h1>Create Your Pattern</h1>
                <form className="create-pattern" onSubmit={handleSubmit}>
                    <div className="title">
                        Title:
                        <label>
                            <input
                                type="text"
                                placeholder="enter title here"
                                value={title}
                                onChange={updateTitle}
                            />
                        </label>
                        {errors.title && <p>{errors.title}</p>}
                    </div>
                    {/* <div className="tile_image">
                        Display Image:
                        <label>
                            <input
                                type="text"
                                value={tileImage}
                                onChange={updateTileImage}
                            />
                            {errors.tileImage && <p>{errors.tileImage}</p>}
                        </label>
                    </div> */}
                    <div className="difficulty">
                        Select difficulty:
                        <label
                            htmlFor="beginner">
                            <input
                                type="radio"
                                id="beginner"
                                name="difficulty"
                                value="beginner"
                                checked={difficulty === 'beginner'}
                                onChange={updateDifficulty}

                            />
                            beginner
                        </label>
                        <label
                            htmlFor="easy">
                            <input
                                type="radio"
                                id="easy"
                                name="difficulty"
                                value="easy"
                                checked={difficulty === 'easy'}
                                onChange={updateDifficulty}
                            />
                            easy
                        </label>
                        <label
                            htmlFor="intermediate">
                            <input
                                type="radio"
                                id="intermediate"
                                name="difficulty"
                                value="intermediate"
                                checked={difficulty === 'intermediate'}
                                onChange={updateDifficulty}
                            />

                            intermediate
                        </label>
                        <label
                            htmlFor="experienced">
                            <input
                                type="radio"
                                id="experienced"
                                name="difficulty"
                                value="experienced"
                                checked={difficulty === 'experienced'}
                                onChange={updateDifficulty}
                            />

                            experienced
                        </label>
                        {errors.difficulty && <p>{errors.difficulty}</p>}
                    </div>
                    <div className="time">
                        How much time (in hours, days, weeks) did it take you to complete your project?
                        <label>
                            <input
                                type="text"
                                placeholder="4 hours, 2 days, 3 weeks, etc."
                                value={time}
                                onChange={updateTime}
                            />
                        </label>
                        {errors.time && <p>{errors.time}</p>}
                    </div>
                    <div className="time-limit">
                        Select your time limit for testers:
                        <select
                            value={timeLimit}
                            onChange={updateTimeLimit}
                        >
                            <option>
                                select one
                            </option>
                            <option value="one day (24 hours)">
                                one day (24 hours)
                            </option>
                            <option value="two days (48 hours)">
                                two days (48 hours)
                            </option>
                            <option value="three days (72 hours)">
                                three days (72 hours)
                            </option>
                            <option value="four days (96 hours)">
                                four days (96 hours)
                            </option>
                            <option value="five days (120 hours)">
                                five days (120 hours)
                            </option>
                            <option value=" six days (144 hours)">
                                six days (144 hours)
                            </option>
                            <option value="one week (7 days)">
                                one week (7 days)
                            </option>
                            <option value="two weeks (14 days)">
                                two weeks (14 days)
                            </option>
                            <option value="three weeks (21 days)">
                                three weeks (21 days)
                            </option>
                            <option value="four weeks (28 days)">
                                four weeks (28 days)
                            </option>
                            <option value="five weeks (35 days)">
                                five weeks (35 days)
                            </option>
                            <option value="six weeks (42 days)">
                                six weeks (42 days)
                            </option>
                            <option value="one month (30 days)">
                                one month (30 days)
                            </option>
                            <option value="two months (60 days)">
                                two months (60 days)
                            </option>
                            <option value="three months (90 days)">
                                three months (90 days)
                            </option>
                        </select>
                        {errors.timeLimit && <p>{errors.timeLimit}</p>}
                    </div>
                    <div className="description">
                        Description:
                        <label>
                            <input
                                type="text"
                                placeholder="description of project"
                                value={description}
                                onChange={updateDescription}
                            />
                        </label>
                        {errors.description && <p>{errors.description}</p>}
                    </div>
                    <div className="instrument">
                        What instrument did you use?
                        <select
                            value={instrument}
                            onChange={updateInstrument}
                        >
                            <option>
                                select one
                            </option>
                            <option value="knitting needles">
                                knitting needles
                            </option>
                            <option value="straight needles">
                                straight needles
                            </option>
                            <option value="circular needles">
                                circular needles
                            </option>
                            <option value="double pointed needles">
                                double pointed needles
                            </option>
                            <option value="crochet hook">
                                crochet hook
                            </option>
                            <option value="inline crochet hook">
                                inline crochet hook
                            </option>
                            <option value="tapered crochet hook">
                                tapered crochet hook
                            </option>
                            <option value="tunisian crochet hook">
                                tunisian crochet hook
                            </option>
                            <option value="knook crochet hook">
                                knook crochet hook
                            </option>
                            <option value="hands">
                                hands
                            </option>
                        </select>
                        {errors.instrument && <p>{errors.instrument}</p>}
                    </div>
                    <div className="instrument-size">
                        Select your instrument size (convert to mm)
                        <select
                            value={instrumentSize}
                            onChange={updateInstrumentSize}
                        >
                            <option>
                                select one
                            </option>
                            <option value="1.5mm">
                                1.5mm
                            </option>

                            <option value="1.75mm">
                                1.75mm
                            </option>

                            <option value="2.0mm">
                                2.0mm
                            </option>

                            <option value="2.25mm">
                                2.25mm
                            </option>

                            <option value="2.75mm">
                                2.75mm
                            </option>

                            <option value="3.0mm">
                                3.0mm
                            </option>

                            <option value="3.25mm">
                                3.25mm
                            </option>

                            <option value="3.5mm">
                                3.5mm
                            </option>

                            <option value="3.75mm">
                                3.75mm
                            </option>

                            <option value="4.0mm">
                                4.0mm
                            </option>

                            <option value="4.25mm">
                                4.25mm
                            </option>

                            <option value="4.5mm">
                                4.5mm
                            </option>

                            <option value="5.0mm">
                                5.0mm
                            </option>

                            <option value="5.25mm">
                                5.25mm
                            </option>

                            <option value="5.5mm">
                                5.5mm
                            </option>

                            <option value="6.0mm">
                                6.0mm
                            </option>

                            <option value="6.5mm">
                                6.5mm
                            </option>

                            <option value="7.0mm">
                                7.0mm
                            </option>

                            <option value="7.5mm">
                                7.5mm
                            </option>

                            <option value="8.0mm">
                                8.0mm
                            </option>

                            <option value="9.0mm">
                                9.0mm
                            </option>

                            <option value="10.0mm">
                                10.0mm
                            </option>
                        </select>
                        {errors.instrumentSize && <p>{errors.instrumentSize}</p>}
                    </div>
                    <div className="yarn-weight">
                        Select the yarn weight you used for your project
                        <select
                            value={yarnWeight}
                            onChange={updateYarnWeight}
                        >
                            <option>
                                select one
                            </option>
                            <option value="0">
                                0
                            </option>

                            <option value="1">
                                1
                            </option>

                            <option value="2">
                                2
                            </option>

                            <option value="3">
                                3
                            </option>

                            <option value="4">
                                4
                            </option>

                            <option value="5">
                                5
                            </option>

                            <option value="6">
                                6
                            </option>

                            <option value="7">
                                7
                            </option>
                        </select>
                        {errors.yarnWeight && <p>{errors.yarnWeight}</p>}
                    </div>
                    <div className="yardage">
                        Approximately how many yards of yarn did you use?
                        <label>
                            <input
                                type="number"
                                placeholder="550"
                                value={yardage}
                                min="0"
                                max="9999"
                                onChange={updateYardage}
                            />
                        </label>
                        {errors.yardage && <p>{errors.yardage}</p>}
                    </div>
                    <div className="written-pattern">
                        <label>
                            {/* <input
                        type="textarea"
                        value={pattern}
                        placeholder="write your pattern here!"
                        size="100"
                        onChange={updatePattern}
                    /> */}
                            <textarea
                                value={pattern}
                                placeholder="Bring your pattern to life!"
                                onChange={updatePattern}
                            />
                        </label>
                        {errors.pattern && <p>{errors.pattern}</p>}
                    </div>
                    {/* <div className="addImages">
                        <AddPatternImages patternId={pattern.id} />
                    </div> */}
                    <button onClick={()=>handleAddImages}>Add Images</button>
                    {confirmPattern && Object.keys(errors).length == 0 && (
                        <div>
                            <p>Does your pattern look correct?</p>
                            <button onClick={handleSubmit}>Yes, time to add images</button>
                            <button onClick={continueEditingPattern}>No, I need to change something</button>
                        </div>
                    )}
                </form>
            </div>

        </section>


    )
    // send the useState patternId through to AddPatternImages
}



export default CreatePattern;
