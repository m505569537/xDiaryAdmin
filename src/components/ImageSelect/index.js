import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { Icon, message } from 'antd';

import './style.less';

class ImageSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.inputRef = createRef();
        this.labelRef = createRef();
    }

    handleFile = () => {
        let file = this.inputRef.current.files[0];
        if(!file){
            return;
        }
        const suffix = /[jpg | jpeg | png | gif]$/g;
        const name = file.name.toLowerCase();
        if(!suffix.test(name)) {
            message.error('请选择图片文件');
            this.inputRef.current.value = '';
        } else {
            if(window.FileReader) {
                const { getImages, index } = this.props;
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    getImages({ [index]: file });
                    this.labelRef.current.style.backgroundImage = `url(${e.target.result})`;
                    this.labelRef.current.style.display = 'block';
                }
            }
        }
    }

    render() {
        const { index } = this.props;
        return (
            <div className='image-select'>
                <input id={"upload" + index} type='file' style={{ display: 'none' }} onChange={this.handleFile} ref={this.inputRef} />
                <label htmlFor={"upload" + index}>
                    <Icon type="plus" style={{ fontSize: '40px', color: '#999999' }} />
                    <div ref={this.labelRef}></div>
                </label>
            </div>
        )
    }
}

ImageSelect.propTypes = {
    getImages: PropTypes.func.isRequired,
    index: PropTypes.string.isRequired
}

export default ImageSelect;