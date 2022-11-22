import React, {useState} from "react"; 

const Education = ({data, dataNumber, onInput, deleteFunc}) => {

    const [institution, setInstitution] = useState({
        id: data.id,
        name: '', 
        title: '', 
        from: '',
        to: '', 
    })

    const onChange = (e) => {
        const {name, value} = e.target
        setInstitution(prevState => (
            {
                ...prevState, 
                [name]: value
            }
        ));
        onInput(dataNumber, e.target); 
    }

    return(
        <div key={data.id} className="education-form-container">
            <label >
                Institution
                <input type='text' name='name' value={institution.name} onChange={onChange}></input>
            </label>
            <label>
                Title
                <input type='text' name='title' value={institution.title} onChange={onChange}></input>
            </label>
            <label>
                From
                <input className="date" type="date"  name="from"  value={institution.from} onChange={onChange}></input>
            </label>
            <label>
                To
                <input className="date" type="date"  name="to"  value={institution.to} onChange={onChange}></input>
            </label>
            <div className="container-button-delete">
                <button onClick={deleteFunc} data-number={dataNumber} className="education-field">Delete</button>
            </div>
           
        </div>
    )
}

export default Education