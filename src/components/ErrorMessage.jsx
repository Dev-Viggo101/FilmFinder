import warning from '../assets/warning.png'

function ErrorMessage({error}) {
  return (
    <div>

      <img src={warning} alt="Error warning image" style={{width:'50px', height:'50px'}}/>

      <h2>Something Went Wrong!</h2>

      <p>Error: {error}</p>

    </div>
  )
}

export default ErrorMessage