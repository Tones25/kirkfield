import React, {Component} from 'react';
import d3 from 'd3';
import styles from './styles.css';

export default class BarChart extends Component {

	componentDidMount() {		  		
	  	//this.updateChart(this.props);
  	}

  	componentWillUpdate(nextProps) {  		
  		this.updateChart(nextProps);
  	}

  	

	updateChart(props) {
	    var dataSet = props.data;
	    var width = this.props.width;
	    var height = this.props.height;
 
	    
        var radius = Math.min(width, height) / 2;
        var donutWidth = 75;
        var legendRectSize = 18;
        var legendSpacing = 4;

        var color = d3.scaleOrdinal(d3.schemeCategory20b);

        d3.select('svg').remove();

        var svg = d3.select('#chart')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('id', 'pieChart')
          .attr('transform', 'translate(' + (width / 2) +
            ',' + (height / 2) + ')');

        var arc = d3.arc()
          .innerRadius(radius - donutWidth)
          .outerRadius(radius);


        var pie = d3.pie()
          .value(function(d) { return d.count; })
          .sort(null);

        var tooltip = d3.select('#chart')                               // NEW
          .append('div')                                                // NEW
          .attr('className', 'tooltip')
          .attr('id', 'chartStyle');                                    // NEW

        tooltip.append('div')                                           // NEW
          .attr('id', 'label');                                      // NEW

        tooltip.append('div')                                           // NEW
          .attr('id', 'count');                                      // NEW

        tooltip.append('div')                                           // NEW
          .attr('id', 'percent');


        var path = svg.selectAll('path')
          .data(pie(dataSet))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function(d) {
            return color(d.data.label);
          });

        path.on('mouseover', function(d) {

		  var total = d3.sum(dataSet.map(function(d) {
		    return d.count;
		  }));
		  var percent = Math.round(1000 * d.data.count / total) / 10;
		  tooltip.select('#label').html('Type: ' + d.data.label);
		  tooltip.select('#count').html('Count: ' + d.data.count);
		  tooltip.select('#percent').html('Percent: ' + percent + '%');
		  tooltip.style('display', 'block');
		  console.log(d.data.label, ' ', d.data.count, ' ', percent);
		});                                                          // NEW

          path.on('mouseout', function() {                              // NEW
            tooltip.style('display', 'none');                           // NEW
          });                                                           // NEW

        var legend = svg.selectAll('.legend')
		  .data(color.domain())
		  .enter()
		  .append('g')
		  .attr('class', 'legend')
		  .attr('transform', function(d, i) {
		    var height = legendRectSize + legendSpacing;
		    var offset =  height * color.domain().length / 2;
		    var horz = -2 * legendRectSize;
		    var vert = i * height - offset;
		    return 'translate(' + horz + ',' + vert + ')';
		  });

		legend.append('text')
		  .attr('x', legendRectSize + legendSpacing)
		  .attr('y', legendRectSize - legendSpacing)
		  .text(function(d) { return d; });

		legend.append('rect')
		  .attr('width', legendRectSize)
		  .attr('height', legendRectSize)
		  .style('fill', color)
		  .style('stroke', color);

          
	}

	render() {
		

        return (
        	<div id="chart">

        	</div>           
        );
    }
}