import React, {Component} from 'react';
import Dimensions from 'react-dimensions';

class BarChart extends Component {

	componentDidMount() {				  		
	  	//this.updateChart(this.props);
  	}

  	componentWillUpdate(nextProps) {  		
  		this.updateChart(nextProps);
  	}

  	

	updateChart(props) {
	    var data = props.data;
 
	    var max = _.max(_.pluck(data, "qty"));
  		var yScale = d3.scale.linear()
	      .domain([0, max])
	      .range([0, props.height - 35]);
 
	    var xScale = d3.scale.ordinal()
	      .domain(d3.range(data.length))
	      .rangeRoundBands([0, props.containerWidth], 0.05);
 
	    var svg = d3.select("#" + this.props.id);
 
    	var bars = svg.selectAll("rect").data(data);
    	bars.enter()
	        .append("rect")
	        .attr("fill", "orange")	        
 
	    bars.transition()
	    	.duration(1000)
	    	.attr("x", function(d, i) {	    		
	          return xScale(i);
	        })
	        .attr("y", function(d, i) {
	          return props.height - yScale(d.qty) - 20;
	        })
	        .attr("width", xScale.rangeBand())
	        .attr("height", function(d, i) {
	          return yScale(d.qty)
	        });
 
	    bars.exit()
	        .remove();
 
	    var qtyLabel = svg.selectAll(".qtyLabel").data(data);
	    qtyLabel.enter()
	    	  .append("text")
	    	  .attr("class", "qtyLabel")
	    	  .style("font-weight", "bold")
	    	  .attr("text-anchor", "middle")
 
	    qtyLabel.transition()
	    	.duration(1000)									
			.attr("x", function(d, i) {
				return xScale(i) + xScale.rangeBand()/2;
			})
			.attr("y", function(d, i) {
				return props.height - yScale(d.qty) - 25
			})
			.text(function(d, i) { 	    	  	
				return d.qty; 
			});

		qtyLabel.exit()
	    		.remove();
 
	   	var xLabel = svg.selectAll(".xLabel").data(data);
	    xLabel.enter()
	    	  .append("text")
	    	  .attr("class", "xLabel")
 
	    xLabel.text(function(d, i) { 	    	  	
	    	  	return d.xLabel; 
	    	  })
	    	  .attr("text-anchor", "middle")
	    	  .attr("x", function(d, i) {
	    	  	return xScale(i) + xScale.rangeBand()/2;
	    	  })
	    	  .attr("y", function(d, i) {
	    	  	return props.height - 5; 
	    	  });

	    xLabel.exit()
	    	  .remove();
	}

	render() {
		
        return (
        	<svg id={this.props.id} width={this.props.containerWidth} height={this.props.height}>

        	</svg>           
        );
    }
}

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
})(BarChart)