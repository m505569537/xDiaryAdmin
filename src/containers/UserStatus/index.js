import React, { useState } from 'react';
import { Radio, Form } from 'antd';
import { Switch, Route } from 'react-router-dom';

import Login from './Login';
import Register from './Register'

const UserStatus = (props) => {
    const [value, setValue] = useState(props.location.pathname);
    return (
        <div>
            <Form.Item wrapperCol={{ xs: { offset:0 }, sm: { offset: 5 } }}>
                <Radio.Group onChange={e => {
                    setValue(e.target.value);
                    props.history.push(e.target.value);
                }} value={value}>
                    <Radio.Button value='/user/login'>Login</Radio.Button>
                    <Radio.Button value='/user/register'>Register</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Switch>
                <Route path='/user/login' component={Login} />
                <Route path='/user/register' component={Register} />
            </Switch>
        </div>
    )
}

export default UserStatus;