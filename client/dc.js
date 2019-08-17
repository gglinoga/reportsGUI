const fs = require('fs');

let content;
fs.readFile('./data.json', function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;
})
console.log(content);

// function load() {
//     let myData = JSON.parse(data);
//     alert(myData[0].year)
// }

// load();
// let myData = JSON.parse();
// console.log(myData)

// document.addEventListener("DOMContentLoaded", function(e) {
// fetch(api)
//     .then((res)=> { 
//         return res.json(); })
//     .then((data)=> {
//         console.log(data)
//         let parsedData = parseData(data);
//         drawChart(parsedData);
//     })
//     .catch((err)=> {console.log(err);})
// });

// function parseData(data) {
//     let arr = [];
//     for (let i in data.bpi) {
//         arr.push({
//             date: new Date(i), //date
//             value: +data.bpi[i] //convert string to num
//         });
//     }
//     return arr;
// }


// function drawChart(data) {
//     var svgWidth = 600, svgHeight = 400;
//     var margin = { top: 20, right: 20, bottom: 30, left: 50 };
//     var width = svgWidth - margin.left - margin.right;
//     var height = svgHeight - margin.top - margin.bottom;
    
//     var svg = d3.select('svg')
//         .attr("width", svgWidth)
//         .attr("height", svgHeight);
        
//     var g = svg.append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
//     var x = d3.scaleTime()
//         .rangeRound([0, width]);
    
//     var y = d3.scaleLinear()
//         .rangeRound([height, 0]);
    
//     var line = d3.line()
//         .x(function(d) { return x(d.date)})
//         .y(function(d) { return y(d.value)})
//         x.domain(d3.extent(data, function(d) { return d.date }));
//         y.domain(d3.extent(data, function(d) { return d.value }));
    
//     g.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x))
//         .select(".domain")
//         .remove();
    
//     g.append("g")
//         .call(d3.axisLeft(y))
//         .append("text")
//         .attr("fill", "#000")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 6)
//         .attr("dy", "0.71em")
//         .attr("text-anchor", "end")
//         .text("Price ($)");
    
//     g.append("path")
//         .datum(data)
//         .attr("fill", "none")
//         .attr("stroke", "steelblue")
//         .attr("stroke-linejoin", "round")
//         .attr("stroke-linecap", "round")
//         .attr("stroke-width", 1.5)
//         .attr("d", line);
//     }
    
    