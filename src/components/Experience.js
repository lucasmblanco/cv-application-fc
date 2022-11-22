import React, {useState} from "react"; 

const Experience = ({data, dataNumber, onInput, deleteFunc}) => {

    const [experience, setExperience] = useState({
        id: data.id,
        name: '', 
        position: '', 
        task: '', 
        from: '',
        to: '', 
    }); 

    const onChange = (e) => {
        const {name, value} = e.target
        setExperience(prevState => (
            {
                ...prevState, 
                [name]: value
            }
        ));
        onInput(dataNumber, e.target); 
    }

    return(
        <div key={data.id} className="experience-form-container">
                        <label>
                            Company 
                            <input type="text" id="name" name="name" value={experience.name} onChange={onChange}></input>
                        </label>
                        <label>
                            Position
                            <input type="text" id="position" name="position" value={experience.position}onChange={onChange}></input>
                        </label>
                        <label>
                            From
                            <input className="date" type="date" id="from" name="from"  value={experience.from} onChange={onChange}></input>
                        </label>
                        <label>
                            To
                            <input className="date" type="date" id="to" name="to" value={experience.to} onChange={onChange}></input>
                        </label>
                        <label>
                            Task
                            <input type="text" id="task" name="task" value={experience.task}onChange={onChange}></input>
                        </label>
                        <div className="container-button-delete">
                            <button onClick={deleteFunc} data-number={dataNumber} className="experience-field">Delete</button>
                        </div>
                        
                    </div>
    )
}

export default Experience