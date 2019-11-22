import React from 'react';
import ReactDOM from 'react-dom';
import { Icon, message, Button, Row, Col, Form } from 'antd';
import Cookie from 'js-cookie';

import ImageSelect from '../../components/ImageSelect';
import { sendImages } from '../../services/api';
import './style.less';

const FormItem = Form.Item;

class AddImages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imgs: {}
        };
        this.inputRef = React.createRef();
        this.labelRef = React.createRef();
        this.containerRef = React.createRef();
    }

    sendImages = () => {
        const { imgs } = this.state;
        if(JSON.stringify(imgs) == '{}'){
            message.error('请选择图片');
            return;
        }
        const token = Cookie.get('token');
        let params = new FormData();
        const imgsProp = Object.keys(imgs);
        // 虽然都会图片文件，但是也不能写在一个数组里面，要分成一条一条的，后端才能读出来
        imgsProp.forEach(item => params.append('img', imgs[item]));
        params.append('user_id', token);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        sendImages(params, config).then(res => {
            const result = res.data;
            if(result.errcode == 0){
                message.success(result.message);
                this.setState({
                    imgs: {}
                },() => {
                    const children = this.containerRef.current.childNodes;
                    for(let i = children.length - 1; i >= 0 ; i--) {
                        this.containerRef.current.removeChild(children[i]);
                    }
                    let div = document.createElement('div');
                    div.style.display = 'inline-block';
                    this.containerRef.current.appendChild(div);
                    ReactDOM.render(<ImageSelect getImages={this.getImages} index='0' />, div)
                    this.props.getUserPublishs();
                })
            } else {
                message.error(result.message);
            }
        })
    }

    getImages = (img) => {
        const { imgs } = this.state;
        if(Object.keys(imgs).indexOf(Object.keys(img)[0]) !== -1){
            this.setState({
                imgs: { ...imgs, ...img }
            })
        } else {
            this.setState({
                imgs: { ...imgs, ...img }
            },() => {
                const { imgs } = this.state;
                const num = Object.keys(imgs).length;
                if(num < 5 && this.containerRef.current) {
                    let div = document.createElement('div');
                    div.style.display = 'inline-block';
                    div.style.marginLeft = '20px';
                    this.containerRef.current.appendChild(div);
                    ReactDOM.render(<ImageSelect getImages={this.getImages} index={num + ''} />, div)
                }
            })
        }
    }   


    render() {
        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 4 } },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
        };
        return (
            <div className='addimages'>
                <Form {...formItemLayout}>
                    <FormItem label="选择图片">
                        <div className='img-select-container' ref={this.containerRef}>
                            <div style={{ display: 'inline-block' }}>
                                <ImageSelect getImages={this.getImages} index='0' />
                            </div>
                        </div>
                    </FormItem>
                    <FormItem wrapperCol={{ xs: { offset: 0 }, sm: { offset: 4 } }}>
                        <Button type='primary' onClick={this.sendImages}>上传</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default AddImages;