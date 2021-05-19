// Components/AppRoute.js

import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useAuthState } from '../context'


const AppRoute = ({ component: Component, path, isPrivate, ...rest }) => {

    const {userDetails, token} = useAuthState()
    

    return (
        <Route
            path={path}
            render={props =>(
                isPrivate && !Boolean(token) ? (
                    <Redirect
                        to={{ pathname: "/login" }}
                    />
                ) : (
                        <Component {...props} />
                    )
                
            )}
            {...rest}
        />
    )
}

export default AppRoute