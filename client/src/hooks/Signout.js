
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Signout(props) {

    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem('jwt')
        localStorage.removeItem('username')
        localStorage.remoteItem('userid')
        props.onSignout()
        navigate('/signin')
    })



    return(
        <></>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        onSignout: () => dispatch({type: 'ON_SIGNOUT'})
    }
}

export default connect(null, mapDispatchToProps)(Signout)