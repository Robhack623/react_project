import {NavLink} from 'react-router-dom'
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import './baselayout.css'

function Footer() {
    return (
        <div className='footer'>
            <HomeTwoToneIcon sx={{ m: 2, bgcolor: 'orange', borderRadius: 2 }}/>
        </div>
    )
}


export default Footer