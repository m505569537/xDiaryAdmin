import React from 'react';

import './style.less';

const obj = {
    'articles': '编辑文章',
    'imgs': '上传图片'
}

const TagLink = (props) => {

    return (
        <div className='taglink'>
            <div className='tag' style={{ background: `rgb(${props.color.join(',')})`, color: 'white', boxShadow: `3px 3px 8px 2px rgba(${props.color.join(',')},.6)` }}><i className={props.icon} /></div>
            <p>{ props.title }</p>
            <p>{ props.num }</p>
            <hr/>
            <span><a style={{ color: `rgb(${props.color.join(',')})` }} onClick={() => props.changeStatus(props.link)}>{ obj[props.link] }</a></span>
        </div>
    )
}

export default TagLink;