import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import Cookie from 'js-cookie';

import { getRegister } from '../../../services/api';

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
function Register (props) {
    const [ email, setEmail ] = useState('');
    const [ uid, setUid ] = useState('');
    const [ psd, setPsd ] = useState('');
    const [ psd2, setPsd2 ] = useState('');

    const submit = async () => {
        if(psd !== psd2) {
            message.error('请确认密码');
            setPsd('');
            setPsd2('');
            return;
        }
        const params = {
            email,
            uid,
            psd
        }
        
        try {
            const res = await getRegister(params);
            if(res.data.errcode == 0) {
                props.history.push('/home');
            } else {
                message.warning(res.data.message);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        const token = Cookie.get('token');
        if(token) {
            props.history.push('/home');
        }
    });

    return (
        <Form { ...formItemLayout }>
            <FormItem
                label='email'
            >
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormItem>
            <FormItem
                label='id'
            >
                <Input value={uid} onChange={(e) => setUid(e.target.value)} />
            </FormItem>
            <FormItem
                label='psd'
            >
                <Input type="password" value={psd} onChange={(e) => setPsd(e.target.value)} />
            </FormItem>
            <FormItem
                label='psd2'
            >
                <Input type="password" value={psd2} onChange={(e) => setPsd2(e.target.value)} />
            </FormItem>
            <FormItem wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 5 } }}>
                <Button type='primary' onClick={submit}>注册</Button>
            </FormItem>
        </Form>
    );
}

export default Form.create()(withRouter(Register));