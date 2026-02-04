import './App.css'

function App() {

  function getData(){
    fetch("http://localhost:4007/data")
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => console.error(err))
  }

  return (
    <>
      <h2>Welcome to React App</h2>
      <button onClick={getData}>Fetch Data</button>
    </>
  )
}

export default App