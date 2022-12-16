import SignedIn_Menu from "./Menu"
import Footer from "./Footer"
import { connect } from 'react-redux'
import './baselayout.css'


function BaseLayout(props) {

    return (
        <div className="full_site">
            <SignedIn_Menu />
            <div className="props-body">{props.children}</div>
            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuthenticated
    }
}

export default connect(mapStateToProps)(BaseLayout)