import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Header = () => {

    let token = sessionStorage.getItem('token');
    const navigate = useNavigate();

useEffect(() => {
    navigate('/');
}, [token])

    return (
        
            token ? (<div>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
<div className="container-fluid">
    <NavLink className="navbar-brand" to='/'>Quotes App</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
            <NavLink className="nav-link active" to='/quotes/add'>Add Quote</NavLink>
        </li>

        <li className="nav-item">
            <NavLink className="nav-link active ml-auto" onClick={() => {
                
                sessionStorage.clear() 
                //navigate('/')
            }}>Logout</NavLink>
        </li>
    </ul>
    </div>
</div>
</nav>
</div>) : ('')
        



    )
}

export default Header;