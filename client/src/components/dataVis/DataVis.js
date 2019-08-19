import React from "react";
import * as d3 from "d3";
import dc from "dc";
import crossfilter from 'crossfilter';
import fs from 'fs';
import { xyDownloadMapping } from "semiotic/lib/downloadDataMapping";

const style = {
    datavis: {
        // width: "80vw",
        // height: "50vh",
        // padding: "30px",
        // fontFamily: "'Questrial', sans-serif",
        // color: "black",
        // margin: "20px, 30px, 20px",
        // backgroundColor: "#d3d3d3",
        // borderRadius: "10px",
        // boxShadow: "5px 5px 5px grey",
        // textAlign: "center",
        // fontSize: "24px",
        // display: "inline-block",
        // zIndex: 50000
        font: "10px sans-serif",
        backgroundColor: "steelblue",
        textAlign: "right",
        padding: "3px",
        margin: "1px",
        color: "white",
      
    }
}
let sample = [1,2,3,4,5];
let dataset = []
let states = []
let causes = []
let years = []
let stateDeath = [];
let causeDeath = [];
let yearDeath = [];

function State(state, deaths) {
    this.stateName = state;
    this.deaths = deaths
}

function Cause(cause, deaths) {
    this.causeName = cause;
    this.deaths = deaths
}

function Year(year, deaths) {
    this.year = year;
    this.deaths = deaths;
}

let deathByState = (x) =>{
    stateDeath=[];
    for (let i =0; i<x.length; i++){
        let newState = new State(x[i], 0)
        stateDeath.push({"state": newState.stateName, "deaths": 0});
        for (let j=0;j<dataset.length;j++){
            if(stateDeath[i].state===dataset[j].State){
                let a = parseInt(dataset[j].Deaths)
                let b = parseInt(stateDeath[i].deaths)
                let c = a + b;
                stateDeath[i].deaths=c;
            }
        }
    }
    stateDeath.sort();
    console.log(stateDeath);
}

let deathByCause = (x) => {
    causeDeath=[];
    for (let i=0; i<x.length; i++){
        let newCause = new Cause(x[i], 0)
        causeDeath.push({ 'cause': newCause.causeName, "deaths": 0 });
        for (let j=0;j<dataset.length; j++){
            if(causeDeath[i].cause===dataset[j].Cause){
                let a = parseInt(dataset[j].Deaths)
                let b = parseInt(causeDeath[i].deaths)
                let c = a + b;
                causeDeath[i].deaths = c;
            }
        }
    }
    console.log(causeDeath);
}

let deathByYear = (x) => {
    yearDeath=[];
    for (let i=0; i<x.length; i++){
      let newYear = new Year(x[i], 0)
      yearDeath.push({"year": newYear.year, "deaths": 0})
      for (let j=0; j<dataset.length; j++){
        if (yearDeath[i].year ===dataset[j].Year){
            let a = parseInt(dataset[j].Deaths)
            let b = parseInt(yearDeath[i].deaths)
            let c = a + b;
            yearDeath[i].deaths=c;
        }
    }
    }
    yearDeath.sort();
    console.log(yearDeath);
}

let renderGraphs = () => {

    // let data = [100, 200, 300]
    let data = [{year: 2000, deaths: 100},
                {year: 2001, deaths: 200},
                {year: 2002, deaths: 300}    
    ]

    data=yearDeath
    console.log(data);


    var svgWidth = 500, svgHeight = 500, barPadding = 5;
    var barWidth = (svgWidth / data.length);

    var svg = d3.select('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)


    let scaleFactor = 

    var barChart = svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('y', (d) => {
            return (svgHeight-d.deaths)
        })
        .attr('height', (d) => {
            return d.deaths
        })
        .attr('width', barWidth - barPadding)
        .attr('class', 'bar')
        .attr('transform', (d, i) =>{
            var translate = [barWidth * i, 0];
            return "translate(" + translate +")";
        });

    var text = svg.selectAll('text')
        .data(data)
        .enter()
        .append("text")
        .text((d)=>{
            return d.deaths
        })
        .attr('y', (d, i)=>{
            return svgHeight-d.deaths-2;
        })
        .attr('x', (d, i)=> {
            return barWidth*i;
        })
        .attr('fill', '#A64C38')


    // console.log('renderGraphs');
    // let data = yearDeath;

    // console.log(data);

    // let data = yearDeath;
    // var svgWidth = 500, svgHeight = 300, barPadding = 5;
    // var barWidth = (svgWidth / data.length);

    
    // var svg = d3.select('svg');
    // svg.size();

    // var rects = svg.selectAll('rect')
    //     .data(data);

    // var newRects = rects.enter();

    // var maxCount = d3.max(data, (d, i)=> {
    //     return d.deaths;
    // })


    // var x = d3.scaleLinear()
    //     .range([0, 300])
    //     .domain([0, maxCount]);
    // var y = d3.scaleBand()
    //     .rangeRound([0, 50])
    //     .domain(data.map((d, i)=> {
    //         return d.year
    //     }))
  
    // newRects.append('rect')
    //     .attr('x', x(0))
    //     .attr('y', (d, i)=> {
    //         return y(d.year)
    //     })
    //     .attr('height', y.rangeRound([0, 50]))
    //     .attr('width', (d, i) => {
    //         return x(d.deaths);
    //     });




    // var yScale = d3.scaleLinear()
    //     .domain([0, d3.max(data.deaths)])
    //     .range([0, svgHeight]);
            
    // var barChart = svg.selectAll("rect")
    //     .data(data)
    //     .enter()
    //     .append("rect")
    //     .attr("y", function(d) {
    //          return svgHeight - yScale(d) 
    //     })
    //     .attr("height", function(d) { 
    //         return yScale(d); 
    //     })
    //     .attr("width", barWidth - barPadding)
    //     .attr("transform", function (d, i) {
    //         var translate = [barWidth * i, 0]; 
    //         return "translate("+ translate +")";
    //     });


}

let extractDeaths = (x) => {
    for(let i = 0; i<x.length; i++){
        if (states.indexOf(x[i].State)===-1){
         states.push(x[i].State);
        }
        if (causes.indexOf(x[i].Cause)===-1){
            causes.push(x[i].Cause);
           }
        if (years.indexOf(x[i].Year)===-1){
        years.push(x[i].Year);
        }
    }
    deathByState(states);
    deathByCause(causes);
    deathByYear(years)
    renderGraphs();
    // if (states){
    // states.map(deathByState(dataset))
    // };

}

class DataVis extends React.Component {
    render() {

        let data;
        dataset = this.props.chartData

        if (!dataset[0]){
            console.log('no dataset')
        }
        else {
            if(dataset[0].State){
                console.log('US Cause of Death');
                extractDeaths(dataset);
                // deathByState(dataset);
            }
            if(dataset[0].country){
                console.log('Aegypti');
            }
        }


        if (data) {
        data = yearDeath;
        console.log('data');
    

        var svgWidth = 500, svgHeight = 300, barPadding = 5;
        var barWidth = (svgWidth / data.length);
    
        
        var svg = d3.select('svg')
            .attr("width", svgWidth)
            .attr("height", svgHeight);
            
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data.deaths)])
            .range([0, svgHeight]);
                
        var barChart = svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("y", function(d) {
                 return svgHeight - yScale(d) 
            })
            .attr("height", function(d) { 
                return yScale(d); 
            })
            .attr("width", barWidth - barPadding)
            .attr("transform", function (d, i) {
                var translate = [barWidth * i, 0]; 
                return "translate("+ translate +")";
            });
        
        }
        
        
        return(
            <div >
                <h1>DataVis</h1>
                <svg className="bar-chart"></svg>
                
            </div>
        )
    }
}

export default DataVis;