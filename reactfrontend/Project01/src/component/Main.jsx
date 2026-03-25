import { Link } from 'react-router-dom'
import {} from 'react-router-dom'
function Main() {
  return (
    <div>
      <h2>Welcome to Student Registration App</h2>

      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/fetch">Fetch Data</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Main