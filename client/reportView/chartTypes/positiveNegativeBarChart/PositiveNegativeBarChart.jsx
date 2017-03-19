import React, {Component} from 'react';
import Dimensions from 'react-dimensions';
import styles from './styles.css';


export default class PositiveNegativeBarChart extends Component {

	componentDidMount() {		
	  	
	  		  		
	  	this.updateChart(this.props);
  	}

  	componentWillUpdate(nextProps) {  		
  		
  		this.updateChart(nextProps);

  	}

  	

	updateChart(props) {	
		console.log(props.data);
		var dataset = props.data;
		
		//Set width and height as fixed variables
		var w = 520;
		var h = 500;
		var padding = 25;

		//Scale function for axes and radius
		var yScale = d3.scale.linear()
						.domain(d3.extent(dataset, function(d){return d.varience;}))
						.range([w+padding,padding]);

		var xScale = d3.scale.ordinal()
						.domain(dataset.map(function(d){ return d.date;}))
						.rangeRoundBands([padding,h+padding],.5);

		//To format axis as a percent
		var formatPercent = d3.format("%1");

		//Create y axis
		var yAxis = d3.svg.axis().scale(yScale).orient("left");

		//Define key function
		var key = function(d){return d.date};

		//Define tooltip for hover-over info windows
		var div = d3.select("body").append("div")   
  							.attr("class", "tooltip")               
  							.style("opacity", 0);

  		d3.selectAll("svg").remove();

		//Create svg element
		var svg = d3.select("#chart-container").append("svg")
				.attr("width", w).attr("height", h)
				.attr("id", "chart")
				.attr("viewBox", "0 0 "+w+ " "+h)
				.attr("preserveAspectRatio", "xMinYMin");
		
		//Resizing function to maintain aspect ratio (uses jquery)
		var aspect = w / h;
		var chart = $("#chart");
			$(window).on("resize", function() {
			    var targetWidth = $("body").width();
			   	
	    		if(targetWidth<w){
	    			chart.attr("width", targetWidth); 
	    			chart.attr("height", targetWidth / aspect); 			
	    		}
	    		else{
	    			chart.attr("width", w);  
	    			chart.attr("height", w / aspect);	
	    		}

			});


		//Initialize state of chart according to drop down menu
		var state = d3.selectAll("option");

		//Create barchart
		svg.selectAll("rect")
			.data(dataset, key)
			.enter()
		  	.append("rect")
		    .attr("class", function(d){return d.varience < 0 ? "negative" : "positive";})
		    .attr({
		    	x: function(d){
		    		return xScale(d.date);
		    	},
		    	y: function(d){
		    		return yScale(Math.max(0, d.varience)); 
		    	},
		    	width: xScale.rangeBand(),
		    	height: function(d){
		    		return Math.abs(yScale(d.varience) - yScale(0)); 
		    	}
		    })
		    .on('mouseover', function(d){
							d3.select(this)
							    .style("opacity", 0.2)
							    .style("stroke", "black")
					
					
					var info = div
							    .style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
							    .text(d.date);


					info.append("p")
						.text("Estimate: $" + d.estimate);
					info.append("p")
						.text("Actual: $" + d.actual);
					info.append("p")
						.text("Varience: $" + d.varience.toFixed(2));




						})
        				.on('mouseout', function(d){
        					d3.select(this)
							.style({'stroke-opacity':0.5,'stroke':'#a8a8a8'})
							.style("opacity",1);

							div
	    						.style("opacity", 0);
        				});


        


        
		//Add y-axis
		svg.append("g")
				.attr("class", "y axis")
				.attr("transform", "translate(40,0)")
				.call(yAxis);

		
		

		
		
	}
	

	    

	render() {
		
        return (
        	<div>
        		<h1>Job Cost Differences For {this.props.currentEmployee}</h1>
	        	<div id="chart-container" >

	        	</div>           
        	</div>
        );
    }
}

