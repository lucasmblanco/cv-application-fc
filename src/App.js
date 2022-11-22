import "./reset.scss"; 
import './App.scss';
import "./assets/Overview.scss"; 
import './App.css';
import React, { useState } from "react"; 
import Education from './components/Education';
import Experience from './components/Experience'; 
import Overview from './components/Overview';
import NewWindow from 'react-new-window'

function App() {


    const [inputField, setInputField] = useState({
      fullname: '',
      email: '',
      phone: '', 
      education: [
        {
          id: Math.random().toString(16).slice(2), 
          name: '',
          title: '',
          from: '',
          to: '',
        },
      ],
      experience: [
        {
          id: Math.random().toString(16).slice(2), 
          name: '',
          position: '',
          task: '', 
          from: '',
          to: 'Present',
        }
      ], 
      show: false,
    })


    const changeInput = (e) => {

      const {name, value} = e.target;
      setInputField( prevState => (
        { ...prevState,
          [name]: value
        }
      ) )
    }

    const addEducationField = (e) => {
      e.preventDefault(); 
      setInputField(prevState => (
        {
          ...prevState, 
          education: inputField.education.concat({
            id: Math.random().toString(16).slice(2), 
            name: '',
            title: '',
            from: '',
            to: '',
          })
        }
      ))
    }

    const addExperienceField = (e) => {
      e.preventDefault(); 
      setInputField(prevState => (
        {
          ...prevState, 
          experience: inputField.experience.concat({
            id: Math.random().toString(16).slice(2),
            name: '',
            position: '',
            task: '',
            from: '',
            to: 'Present',
           }),
        }
      ))
    }


    

    const recieveDataFromChild = (index, target) => {
      const {name, value} = target; 
      let newEducation = [...inputField.education]; 
      let institution = {...newEducation[index]}; 
      institution[name] = value;
      newEducation[index] = institution; 
      setInputField(prevState => ({
        ...prevState, 
        education: newEducation
      }))
    }

    const recieveDataFromChildExperience = (index, target) => {
      const {name, value} = target; 
      let newExperience = [...inputField.experience]; 
      let institution = {...newExperience[index]}; 
      institution[name] = value;
      newExperience[index] = institution; 
      setInputField(prevState => ({
        ...prevState, 
        experience: newExperience
      }))
    }

    

    const submitForm = (e) => {
      e.preventDefault();
      setInputField(prevState => ({
        ...prevState,
        show:true, 
      }))
    }

    const deleteTask = (e) => {
      e.preventDefault(); 
      if(e.target.classList.contains("education-field")){
        setInputField(prevState => (
          {
            ...prevState,
            education: inputField.education.filter((_, index) => {
              return index !== Number(e.target.dataset.number)
             })
          }
        ))
      } else {
        setInputField(prevState => (
          {
            ...prevState,
            experience: inputField.experience.filter((_, index) => {
              return index !== Number(e.target.dataset.number)
             })
          }
        ))
      }
    } 

  return (
    <div>
      <div className='title'>
        <h1>CURRICULUM GENERATOR </h1>
      </div>
      <div className='form-container'>
      <form onSubmit={submitForm}>
        <fieldset className='basic-information'>
        <legend>Basic Information</legend>
        <label> FullName
          <input type='text' name='fullname' value={inputField.fullname} onChange={changeInput} ></input>
        </label>
        <label> Email
          <input type='email' name='email' value={inputField.email} onChange={changeInput} ></input>
        </label>
        <label>
            Phone Number
            <input type="tel" name="phone" value={inputField.phone}  onChange={changeInput} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></input>
        </label>
        </fieldset>
    <fieldset className='education-field'>
      <legend>Education</legend>
      <p>Having a degree demonstrates an ability to learn. Although not required, you may include it if you wish to share.</p>
      <div className="button-container">
        <button onClick={addEducationField}>ADD</button>
      </div>
      {
          inputField.education.map((element,index) => {
            return <Education key={element.id} data={element} dataNumber={index} onInput={recieveDataFromChild} deleteFunc={deleteTask}/>
          })
        }
    </fieldset>
        
        <fieldset className='experience-field'>
          <legend>Experience</legend>
          <p>Employers love practical experience. Show them what skills you bring to the table.</p>
          <div className="button-container">
            <button onClick={addExperienceField}>ADD</button>
          </div>
          {
          inputField.experience.map((element,index) => {
            return <Experience key={element.id} data={element} dataNumber={index} onInput={recieveDataFromChildExperience} deleteFunc={deleteTask}/>
          })
        }

        </fieldset>
        <div className="container-submit-button">
          <button type="submit" >GENERATE</button>
        </div>
      </form>
      </div>
      { 
        inputField.show ?  <NewWindow title={inputField.fullname}  features={{  width: '1000', height: '1000' }}> 
                              <Overview formData={inputField} /> 
                            </NewWindow> : null
      }
    </div>
    
  );
}

export default App;
