import React from "react";
import * as d3 from "d3";
import dc from "dc";
import crossfilter from 'crossfilter';
import fs from 'fs';
import { xyDownloadMapping } from "semiotic/lib/downloadDataMapping";
import states from './states/us-states.json';

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
        width: "100%",
        height: '100%',
      
    }
}
let sample = [1,2,3,4,5];
let dataset = []
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
    let data
    
//     dataset = [{
//         year: 2001,
//         state: "California"
//     },
//     {
//         year: 2002,
//         state: "Washington"
//     },
//     {
//         year: 2002,
//         state: "California"
//     }
// ]

    console.log(dataset);
   
    dataset = dataset.filter((x)=> {
        return !x.Cause.includes('All causes');
    })

    console.log(dataset);

    let datasetCF = crossfilter(dataset)
    var count = datasetCF.groupAll().reduceCount().value();
    console.log(count)

    let barChart = dc.barChart('#line');
    let pieChart = dc.pieChart('#pie');
    let countChart = dc.dataCount('#count');
    let gridChart = dc.dataGrid('#grid');
    let mapChart
    
    let deathsCount = datasetCF.groupAll().reduceSum((d)=>{return d.Deaths}).value();
    console.log(deathsCount);
    console.log(datasetCF.groupAll().reduceCount().value())

    let deathsDimension = datasetCF.dimension((d)=>{
        return d.Deaths
    })


    let deathsGroup = deathsDimension.group().reduceCount();

    let stateDimension = datasetCF.dimension((d)=> {
        return d.State
    })

    let stateGroup = stateDimension.group().reduceCount();

    let yearDimension = datasetCF.dimension((d) => {
        return d.Year
    });

    console.log(yearDimension);

    let yearGroup = yearDimension.group().reduceCount();

    let causeDimension = datasetCF.dimension((d)=> {
        return d.Cause;
    })

    let causeGroup = causeDimension.group().reduceCount();

    let deathsByYear = yearDimension.group().reduceSum((d) => {
        return  d.Deaths;
    })

    let deathsByCause = causeDimension.group().reduceSum((d) => {
        return d.Deaths;
    })

    let deathsByState = stateDimension.group().reduceSum((d)=> {
        return d.Deaths;
    })

    // console.log(causeGroup);
    d3.json('/states/us-states.json', function(error, jsonData){
        console.log('jsonData')
        console.log(jsonData)
        var centre = d3.geoCentroid(jsonData);
        var projection = d3.geoMercator().center(centre).scale(500).translate([200,100]);

        mapChart = dc.geoChoroplethChart('#map')
        .width(400)
        .height(400)
        .dimension(stateDimension)
        .projection(projection)
        .group(deathsByState)
        .overlayGeoJson(jsonData.features, 'State', (d)=> { return d.properties.name })
        .colors(d3.scaleQuantize().range(["#E2F2FF","#C4E4FF","#9ED2FF","#81C5FF","#6BBAFF","#51AEFF","#36A2FF","#1E96FF","#0089FF","#0061B5"]))
        .colorDomain([0,200])
        .colorCalculator(function(d){ return d ? mapChart.colors()(d) : '#ccc'; });
    })

   
    barChart
   .width(600)
   .height(400)
   .x(d3.scaleLinear().domain([10,100]))
   .yAxisLabel("")
   .xAxisLabel("Year")
   .elasticY(true)
   .elasticX(true)
   .dimension(yearDimension)
   .group(deathsByYear);

   pieChart
   .width(600)
   .height(400)
   .dimension(causeDimension)
   .group(deathsByCause)

   countChart
   .dimension(datasetCF)
   .group(datasetCF.groupAll());

   gridChart
   .dimension(yearDimension)
   .section(deathsByYear)
   .size(100)
   .htmlSection (function(d) { 
      return 'Year: ' + d.Year +
      '; Deaths: ' + d.Deaths
   })
   .html (function(d) { return d.Cause; })
   .sortBy(function (d) {
      return d.Cause;
   })
   .order(d3.ascending);

   console.log('render');
   barChart.render()
   pieChart.render()
   countChart.render()
//    mapChart.render()
//    gridChart.render()




//     var svgWidth = 500, svgHeight = 500, barPadding = 5;
//     var barWidth = (svgWidth / data.length);

//     var svg = d3.select('svg')
//         .attr('width', svgWidth)
//         .attr('height', svgHeight)


//     let sf = (200/10000000);

//     var barChart = svg.selectAll('rect')
//         .data(data)
//         .enter()
//         .append('rect')
//         .attr('y', (d) => {
//             return svgHeight-(sf*d.deaths)
//         })
//         .attr('height', (d) => {
//             return d.deaths
//         })
//         .attr('width', barWidth - barPadding)   
//         .attr('class', 'bar')
//         .attr('transform', (d, i) =>{
//             var translate = [barWidth * i, 0];
//             return "translate(" + translate +")";
//         });


//     var text = svg.selectAll('text')
//         .data(data)
//         .enter()
//         .append("text")
//         .text((d)=>{
//             return d.cause
//         })
//         .attr('y', 350)
//         .attr('x', -330)
//         .attr('fill', '#FFFFFF')
//         .classed('rotation', true)
//         .attr('transform', (d,i)=>{
//             return 'translate( '+(barWidth*i)+'),'+'rotate(-45)';})

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

let clickHandler = () => {
    console.log('reset');
    // dc.filterAll()
    // dc.renderAll()
}

class DataVis extends React.Component {
    render() {

        dataset = this.props.chartData

        if (!dataset[0]){
            // console.log('no dataset')
        }
        else {
            if(dataset[0].State){
                console.log('US Cause of Death');
                // extractDeaths(dataset);
                // deathByState(dataset);
                renderGraphs();
            }
            // if(dataset[0].country){
            //     console.log('Aegypti');
            // }
        }
        
        
        return(
            <div >
                <svg className="bar-chart"></svg>
                <div id='line'></div>
                <div id='pie'></div>
                <div id='map'></div>
                <div id = "count" className = "dc-data-count" style = {{float: 'right'}}>
               <span className = "filter-count"></span> selected out of <span
                  className = "total-count"></span> <div >Reset All</div>
            </div>

                
            </div>
        )
    }
}

export default DataVis;