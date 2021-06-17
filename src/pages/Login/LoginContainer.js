import React, {useState} from 'react';
import {withRouter} from "react-router-dom";

import {LoginTemplate} from "./LoginTemplate";


export const _LoginContainer = (props) => {

    const [ inputs, setInputs ]= useState({
        username: '',
        password: ''
    })

    const login = ({username, password}) => {
        const {location} = props;
        // const params = searchParamsToObject(location.search);
        // AuthStore.login({body:{username, password}, nextUrl: params.next});
    };

    const onSubmit = (e) => {
        const {username, password} = this;
        login({ username, password });
    };

    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            onSubmit(e);
        }
    };

    const onChange = (e) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    return <LoginTemplate inputs={inputs} onChange={onChange} onKeyPress={onKeyPress} onSubmit={onSubmit}/>
}

export const LoginContainer = withRouter(_LoginContainer);
