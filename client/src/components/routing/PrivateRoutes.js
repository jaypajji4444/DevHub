import React from 'react'
import {Redirect,Route} from "react-router-dom"
import PropTypes from "prop-types"
import {connect} from "react-redux"

const PrivateRoutes=({component:Component,auth:{isAuthenticated,loading},...rest})=>{   
   return (
    <Route {...rest} // Rest is any custopm props passed in
    render={props=>isAuthenticated?<Component {...props} />:<Redirect to="/login" />}
    />
    )
}

PrivateRoutes.propTypes={
    auth:PropTypes.object.isRequired
}

const mapStateToProps=(state)=>{
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps)(PrivateRoutes)
