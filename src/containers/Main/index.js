import React, { Component } from 'react';
import { withRouter, Switch, Route, Link } from 'react-router-dom';
import { Form, Row, Col } from 'antd';
import Cookie from 'js-cookie';

import WriteArticle from '../WriteArticle';
import AddImages from '../AddImages';
import TagLink from '../../components/TagLink';
import { getUser, getUserPublish } from '../../services/api';
import './style.less';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 0,
            title:'',
            content: '',
            user: {},
            userP: {},
            status: ''
        };
        this.inputRef = React.createRef();
        this.labelRef = React.createRef();
    }

    componentDidMount() {
        const token = Cookie.get('token');
        if(!token) {
            this.props.history.push('/user/login');
        } else {
            const params = {
                _id: token
            };
            getUser(params).then(res => {
                if(res.data.errcode == 0) {
                    this.setState({
                        user: res.data.data
                    })
                } else {
                    Cookie.remove('token');
                    this.props.history.push('/user/login');
                }
            });
            this.getUserPublishs();
        }
    }

    getUserPublishs = () => {
        const token = Cookie.get('token');
        getUserPublish({ user_id: token }).then(res => {
            if(res.data.errcode == 0) {
                this.setState({
                    userP: res.data.data
                })
            }
        });
    } 
    
    handleExit = () => {
        if(Cookie.get('token')){
            Cookie.remove('token');
        }
        this.props.history.push('/user/login');
    }

    handleStatus = (value) => {
        this.setState({
            status: value
        });
    }

    render() {
        const { user, userP, status } = this.state;
        const obj = {
            'articles': {
                label: '编辑文章',
                color: [43, 188, 79]
            },
            'imgs': {
                label: '添加图片',
                color: [147, 42, 173]
            }
        }
        const options = [
            { title: '文章数', num: userP.articles || 0, color: [43, 188, 79], link: 'articles', icon: 'iconfont icon-article' },
            { title: '图片数', num: userP.images || 0, color: [147, 42, 173], link: 'imgs', icon: 'iconfont icon-PageImg' },
            { title: '11', num: 0, color: [255, 0, 0], link: '#' },
            { title: '22', num: 0, color: [0, 0, 255], link: '#' }
        ];
        return (
            <div className='main'>
                <div className="user">
                    {
                        user ? <div><p>{ user.uid }</p>
                        <div style={{ borderRadius: '5px' }}>
                            <p><Link to='/wisedomain'>智者领域</Link></p>
                            <p><a onClick={this.handleExit}>退出</a></p>
                        </div></div> : <a onClick={this.handleExit}>登录</a>
                    }
                </div>

                <Row gutter={32}>
                    {
                        options.map(item => <Col className="gutter-row" key={item.title} span={6}><TagLink {...item} changeStatus={this.handleStatus} /></Col>)
                    }
                </Row>

                {}
                {
                    status ? <div className="container">
                        <div className='subtitle' style={{ background: `rgb(${obj[status].color.join(',')})`, boxShadow: `2px 3px 8px 1px rgba(${obj[status].color.join(',')}, .6)` }}>{ obj[status].label }</div>
                        {
                            status == 'articles' ? <WriteArticle getUserPublishs={this.getUserPublishs} /> : null
                        }
                        {
                            status == 'imgs' ? <AddImages getUserPublishs={this.getUserPublishs} /> : null
                        }
                    </div> : null
                }
            </div>
        );
    }
}

export default Form.create()(withRouter(Main));