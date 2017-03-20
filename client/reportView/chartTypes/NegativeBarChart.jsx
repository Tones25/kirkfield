import React, {Component} from 'react';
import Dimensions from 'react-dimensions';

export default class NegativeBarChart extends Component {

	componentDidMount() {		
	  	
	  		  		
	  	this.updateChart(this.props);
  	}

  	componentWillUpdate(nextProps) {  		
  		this.updateChart(nextProps);
  	}

  	

	updateChart(props) {
		var data = this.props.data;
		var margin = {top: 20, right: 30, bottom: 40, left: 30},
		    width = 960 - margin.left - margin.right,
		    height = 500 - margin.top - margin.bottom;

		var x = d3.scale.linear()
			.domain(d3.extent(data, function(d) { return d.varience; }))
		    .range([0, width]);

		var y = d3.scale.ordinal()
			.domain(data.map(function(d) { return d.date; }))
		    .rangeRoundBands([0, height], 0.2);

		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom");

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient("left")
		    .tickSize(0)
		    .tickPadding(6);

		var svg = d3.select("#chart")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var bars = svg.selectAll("rect").data(data);

		bars.enter().append("rect")
		      .attr("class", function(d) { return "bar bar--" + (d.varience < 0 ? "negative" : "positive"); })
		      .attr("x", function(d) { return x(Math.min(0, d.varience)); })
		      .attr("y", function(d) { return y(d.date); })
		      .attr("width", function(d) { return Math.abs(x(d.varience) - x(0)); })
		      .attr("height", y.rangeBand());

		bars.transition()
	    	.duration(1000)
	    	.attr("x", function(d, i) {	    		
	          return x(i);
	        })
	        .attr("y", function(d, i) {
	          return props.height - y(d.qty) - 20;
	        })
	        .attr("width", x.rangeBand())
	        .attr("height", function(d, i) {
	          return y(d.qty)
	        });

		bars.exit()
	        .remove();

		var xAxis =  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis);

		


		var yAxis =  svg.append("g")
		      .attr("class", "y axis")
		      .attr("transform", "translate(" + x(0) + ",0)")
		      .call(yAxis);

		
		}
	

	    

	render() {
		
        return (
        	<svg id="chart" >

        	</svg>           
        );
    }
}
/*
export default Dimensions({
	getWidth: function(element) {
		let parent = element.parentElement;
		let parentStyle = window.getComputedStyle(parent, null);
		let parentLeftPadding = parentStyle.getPropertyValue("padding-left");
		let parentRightPadding = parentStyle.getPropertyValue("padding-right");
		
		parentLeftPadding = parentLeftPadding.substring(0, parentLeftPadding.length - 2);
		parentRightPadding = parentRightPadding.substring(0, parentRightPadding.length - 2);
		
		parentLeftPadding = parseInt(parentLeftPadding);
		parentRightPadding = parseInt(parentRightPadding);
		
		return parent.getBoundingClientRect().width - (parentLeftPadding + parentRightPadding);
	},
	getHeight: function(element) {
		//return window.innerHeight;
		return 400;
	}
})(NegativeBarChart)
*/