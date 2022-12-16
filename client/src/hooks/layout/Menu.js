import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import './baselayout.css'



function IsAuthMenu() {


    const userId = localStorage.getItem('userid')

    return (
        <div className='header'>
            <div className='left_side'>
                <NavLink to={`/dashboard/${userId}`}>
                    <HomeTwoToneIcon sx={{ m: 2, bgcolor: 'orange', borderRadius: 2 }} />
                </NavLink>
            </div>
            <div className='dashboard-username'>I'm Organized</div>
            <div className='r'>
                <NavLink to='/signout'>
                    <PowerSettingsNewIcon sx={{ m: 2, bgcolor: 'orange', borderRadius: 2 }} />
                </NavLink>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuthenticated
    }
}

export default connect(mapStateToProps)(IsAuthMenu)