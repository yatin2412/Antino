import { useState } from "react"

const App = () => {
  const [value,setValue] = useState({})
  const Trial = async () =>{
    console.log("called function")
    const response = await fetch("https://dog.ceo/api/breeds/image/random")
    const data = await response.json()
    setValue(data.message)
    console.log(data)
    return(
        {data}
    )
  }
  return (
    <div className="App">
      <button onClick={Trial}>Click to get dog </button>
      <img src={value} alt=""></img>      
    </div>
  );
}

export default App;
