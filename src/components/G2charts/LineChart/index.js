import React, { Component } from 'react';
import PropTypes from 'prop-types';
import G2 from '@antv/g2';


class LineChart extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.chart = {};
    }

    componentDidMount () {
        const { list, chartBase, source, tooltip, legend, xyField, colorField  } = this.props.options;
        this.chart = new G2.Chart(chartBase || {
            container: 'chart',
            forceFit: true,
            height: 500,
            padding: 70
        });
        this.chart.source(list, source || {});
        this.chart.tooltip(tooltip || {});
        this.chart.legend(legend ||  {});
        this.chart.line().position(xyField).color(colorField);
        this.chart.render();
    }

    componentWillReceiveProps (newProps) {
        console.log('111',newProps);
        this.chart.changeData(newProps.options.list);
    }

    render() {
        const { options } = this.props;
        return (
            <div id={options.chartBase ? options.chartBase.container : 'chart'}></div>
        );
    }
}

LineChart.propTypes = {
    options: PropTypes.object.isRequired
};

export default LineChart;