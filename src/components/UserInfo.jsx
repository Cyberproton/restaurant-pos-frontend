import React, { Component } from "react";
import queryString from 'query-string'

export default class UserInfo extends Component {
    state = {
        userId: null,
        user: null
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        console.log(values)
    }
}