import { useState } from 'react'

function FetchData() {
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(false)

  async function getData() {
    try {
      setLoader(true)
      const response = await fetch('http://localhost:4008/data')
      const jsondata = await response.json()
      setData(jsondata.msg)
    } catch (error) {
      console.log(error)
    } finally {
      setLoader(false)
    }
  }

  function cartData(dataitem) {
    alert(dataitem.title)
  }

  return (
    <div>
      <h2>Welcome to React</h2>

      {loader && <h3>Data is loading...</h3>}

      {data.map((ele) => (
        <div
          key={ele.id}
          style={{ border: '2px solid black', margin: '10px', padding: '10px' }}
        >
          <img src={ele.image} alt={ele.title} height={200} width={200} />
          <h3>{ele.id}: {ele.title}</h3>
          <button onClick={() => cartData(ele)}>Add to Cart</button>
        </div>
      ))}

      <button onClick={getData}>Fetch Data</button>
    </div>
  )
}

export default FetchData