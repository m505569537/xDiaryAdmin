import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Select, message, Row, Col } from 'antd';
import { getLabels, sendArticles } from '../../services/api';
import Cookie from 'js-cookie';

const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;
const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 4 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};

const WriteArticle = (props) => {
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const [ selectArr, setSelectArr ] = useState('');
    const [ type, setType ] = useState(0);
    const sendArticle = () => {
        if(!title || !content) {
            message.error('请输入内容');
            return;
        }
        const user_id = Cookie.get('token');
        const params = {
            title,
            content,
            type,
            user_id
        }
        sendArticles(params).then(res => {
            const result = res.data;
            if(result.errcode == 0) {
                message.success(result.message);
                setTitle('');
                setContent('');
                setType(0);
                props.getUserPublishs();
            } else {
                message.error(result.message);
            }
        })
    }

    useEffect(() => {
        getLabels().then(res => setSelectArr(res.data.data));
    },[])

    return (
        <div>
            <Form {...formItemLayout}>
                <FormItem label='title'>
                    <Row>
                        <Col span={19}>
                            <Input onChange={e => setTitle(e.target.value)} value={title} />
                        </Col>
                        <Col span={4} offset={1}>
                            {
                                selectArr&&selectArr.length > 0 ? <Select className='select' onChange={value => setType(value)} value={type}>
                                {
                                    selectArr.map((item, index) => <Option key={item} value={index}>{item}</Option>)
                                }
                                </Select> : null
                            }
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label='content'>
                    <TextArea onChange={e => setContent(e.target.value)} value={content} rows={4} />
                </FormItem>
                <FormItem wrapperCol={{ offset: 4 }}>
                    <Button onClick={sendArticle}>submit</Button>
                </FormItem>
            </Form>
        </div>
    )
}

export default WriteArticle;