import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import Cookie from 'js-cookie';

import { getLogin } from '../../../services/api';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
    }
}

const Login = (props) => {
    const [ email, setEmail ] = useState('');
    const [ psd, setPsd ] = useState('');
    const submit = async () => {
        const params = {
            email,
            psd
        };
        const res = await getLogin(params);
        if(res.data.errcode == 0) {
            props.history.push('/home');
        } else {
            message.error(res.data.message);
        }
    }

    useEffect(() => {
        const token = Cookie.get('token');
        if(token) {
            props.history.push('/home');
        }
    });

    return (
        <Form {...formItemLayout}>
            <FormItem label='email'>
                <Input value={email} onChange={e => setEmail(e.target.value)} />
            </FormItem>
            <FormItem label='psd'>
                <Input type='password' value={psd} onChange={e => setPsd(e.target.value)} />
            </FormItem>
            <FormItem wrapperCol={{ xs: { offset: 0 }, sm: { offset: 5 } }}>
                <Button type="primary" onClick={submit}>登录</Button>
            </FormItem>
        </Form>
    )
}      

export default Form.create()(withRouter(Login));