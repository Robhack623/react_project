import SignedIn_Menu from "./IsAuthMenu"
import Footer from "./Footer"
import NotAuthMenu from "./NotAuthMenu"
import { connect } from 'react-redux'
import './baselayout.css'


function BaseLayout(props) {

    return (
        <div className="full_site">
            {/* {props.isAuth ? null:<NotAuthMenu />}
            {props.isAuth ? <SignedIn_Menu />: null} */}
            <SignedIn_Menu />
            {props.children}
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