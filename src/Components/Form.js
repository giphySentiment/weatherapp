import Results from "./Results";
import Error from "./Error";
import { useState, useEffect } from "react";

const Form = () => {

    const [submit, setSubmit] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [showError, setShowError] = useState(false);
    const [data, setData] = useState({});



// API call fetch request (useEffect)
    useEffect(() => {
        fetch(`http://api.weatherapi.com/v1/current.json?key=4c227d8ad9bb4627b56172215220711&q=${userInput}&aqi=no`)
            .then(response => response.json())
            .then(data => 
                console.log(data),
                setData(data))
            .catch((error) => {
                setShowError(!showError)
            })
        console.log(data)
    },[submit])

//this function tracks user input and stores it in state, attach this function to onChange event of the input in form
const trackInputChange = (e) => {
    setUserInput(e.target.value)
}

//attach this function to onClick of button in form.js return
const handleButtonClick = (event) => {
    setSubmit(!submit)
    event.preventDefault()
}

    
    return (
        <>
            <form action="submit">
                <label htmlFor="input">enter a city:</label>
                <input onChange={trackInputChange} type="text" />
                <button onClick={handleButtonClick}>submit</button>
            </form>
            {
                submit
                    ? <Results
                        data={data}
                        userInput={userInput} />
      
                    : null
            }

            {
                showError
                    ? <Error
                        data={data}
                        userInput={userInput}/>
                    : null
            }
        </>
        
        

    )
}

export default Form;