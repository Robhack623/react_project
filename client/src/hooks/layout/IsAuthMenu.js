import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import './baselayout.css'
import { Avatar } from '@mui/material';

function IsAuthMenu() {

    const username = localStorage.getItem('username')

    return (
        <div className='header'>
            <div className='left_side'><HomeTwoToneIcon sx={{ m: 2, bgcolor: 'orange', borderRadius: 2 }}/></div>
            <div className='dashboard-username'>Welcome, {username}!</div>
            <div className='r'><PowerSettingsNewIcon sx={{ m: 2, bgcolor: 'orange', borderRadius: 2 }}/></div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuthenticated
    }
}

export default connect(mapStateToProps) (IsAuthMenu)