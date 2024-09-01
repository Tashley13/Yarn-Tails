import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as patternActions from "../../redux/pattern";

const CreatePattern = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [tileImage, setTileImage] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [time, setTime] = useState('');
    const [timeLimit, setTimeLimit] = useState('');
    const [description, setDescription] = useState('');
    const [instrument, setInstrument] = useState('');
    const [instrumentSize, setInstrumentSize] = useState('');
    const [yarnWeight, setYarnWeight] = useState('');
    const [yardage, setYardage] = useState('');
    const [pattern, setPattern] = useState('');
    const [errors, setErrors] = useState({});

    const loggedIn = useSelector((state) => state.session.user)

    useEffect(()=> {
        if (!loggedIn) {
            navigate('/');
        }
    }, [loggedIn, navigate])

    const updateTitle = (e) => setTitle(e.target.value);
    const updateTileImage = (e) => setTileImage(e.target.value);
    const updateDifficulty = (e) => setDifficulty(e.target.value);
    const updateTime = (e) => setTime(e.target.value);
    const updateTimeLimit = (e) => setTimeLimit(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateInstrument = (e) => setInstrument(e.target.value);
    const updateInstrumentSize = (e) => setInstrumentSize(e.target.value);
    const updateYarnWeight = (e) => setYarnWeight(e.target.value);
    const updateYardage = (e) => setYardage(e.target.value);
    const updatePattern = (e) => setPattern(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {} // push errors to
        //check to make sure the fields are filled in
        if (!title) errors.title = 'Title is required';
        if (!tileImage) errors.tileImage = 'Tile image is required';
        if (!difficulty) errors.difficulty = 'Difficulty is required';
        if (!time) errors.time = 'Time is required';
        if (!timeLimit) errors.timeLimit = "Time limit is required";
        if (description.length < 20) errors.description = "Description needs to be greater than 20 characters";
        if (!instrument) errors.instrument = "Instrument is required";
        if (!instrumentSize) errors.instrumentSize = "Instrument size is required";
        if (!yarnWeight) errors.yarnWeight = "Yarn weight is required";
        if (yardage < 0 || yardage > 9999) errors.yardage = "Yardage must be greater than 0 and less than 10,000";
        if (pattern.length < 40) errors.pattern = "Pattern needs to be more than 40 characters";

        //look to see if errors has any length of keys, if so set errors, return, and clear errors
        if (Object.keys(errors).length) {
            setErrors(errors);
            return;
        }
        setErrors({})

        //create newPattern object to dispatch
        //need to match backend create route
        const newPattern = {
            title,
            tile_image: tileImage,
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
        const createdPattern = await dispatch(patternActions.createUserPattern(newPattern))


        if (createdPattern) {
            navigate(`/${createdPattern.id}/view_pattern`)
        }
    }


    return (
        <section className="create-pattern-form">
            <div className="pattern-form-header">
                <h1>Create New Pattern</h1>
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
                    <div className="tile_image">
                        Display Image:
                        <label>
                            <input
                                type="url"
                                value={tileImage}
                                onChange={updateTileImage}
                            />
                            {errors.tileImage && <p>{errors.tileImage}</p>}
                        </label>
                    </div>
                    <div className="difficulty">
                        Select difficulty:
                        <label
                            htmlFor="beginner">
                            <input
                                type="radio"
                                id="beginner"
                                name="difficulty"
                                value="beginner"
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
                            <option >
                                one day (24 hours)
                            </option>
                            <option >
                                two days (48 hours)
                            </option>
                            <option >
                                three days (72 hours)
                            </option>
                            <option >
                                four days (96 hours)
                            </option>
                            <option >
                                five days (120 hours)
                            </option>
                            <option >
                                six days (144 hours)
                            </option>
                            <option >
                                one week (7 days)
                            </option>
                            <option >
                                two weeks (14 days)
                            </option>
                            <option >
                                three weeks (21 days)
                            </option>
                            <option >
                                four weeks (28 days)
                            </option>
                            <option >
                                five weeks (35 days)
                            </option>
                            <option >
                                six weeks (42 days)
                            </option>
                            <option >
                                one month (30 days)
                            </option>
                            <option >
                                two months (60 days)
                            </option>
                            <option >
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
                                straight needles
                            </option>
                            <option>
                                circular needles
                            </option>
                            <option>
                                double pointed needles
                            </option>
                            <option>
                                crochet hook
                            </option>
                            <option>
                                inline crochet hook
                            </option>
                            <option>
                                tapered crochet hook
                            </option>
                            <option>
                                tunisian crochet hook
                            </option>
                            <option>
                                knook crochet hook
                            </option>
                            <option>
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
                                1.5mm
                            </option>

                            <option>
                                1.75mm
                            </option>

                            <option>
                                2.0mm
                            </option>

                            <option>
                                2.25mm
                            </option>

                            <option>
                                2.75mm
                            </option>

                            <option>
                                3.0mm
                            </option>

                            <option>
                                3.25mm
                            </option>

                            <option>
                                3.5mm
                            </option>

                            <option>
                                3.75mm
                            </option>

                            <option>
                                4mm
                            </option>

                            <option>
                                4.25mm
                            </option>

                            <option>
                                4.5mm
                            </option>

                            <option>
                                5.0mm
                            </option>

                            <option>
                                5.25mm
                            </option>

                            <option>
                                5.5mm
                            </option>

                            <option>
                                6.0mm
                            </option>

                            <option>
                                6.5mm
                            </option>

                            <option>
                                7.0mm
                            </option>

                            <option>
                                7.5mm
                            </option>

                            <option>
                                8.0mm
                            </option>

                            <option>
                                9.0mm
                            </option>

                            <option>
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
                                0
                            </option>

                            <option>
                                1
                            </option>

                            <option>
                                2
                            </option>

                            <option>
                                3
                            </option>

                            <option>
                                4
                            </option>

                            <option>
                                5
                            </option>

                            <option>
                                6
                            </option>

                            <option>
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
                    <button type="submit">Create Pattern</button>
                </form>
            </div>
        </section>
    )
}



export default CreatePattern;
