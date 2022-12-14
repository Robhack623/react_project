
import {NavLink} from 'react-router-dom'


function NotAuthMenu() {
    return (
        <div>
            <NavLink to='/login'>Sign In</NavLink>
        </div>
    )
}



export default NotAuthMenu