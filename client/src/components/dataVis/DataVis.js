import React from "react";
import * as d3 from "d3";

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

let data = [4, 8, 15, 16, 23, 4, 14, 1];
console.log('script test')
let x = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, 420]);

d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return x(d) + "px"; })
    .text(function(d) { return d; });
console.log(x);
console.log(data);

const DataVis = (props) => (
    <div>
        <div className='chart'>
        <p>{props.name}</p>
        <p>{props.country}</p>
        </div>
        {/* <h1>chart</h1> */}
        {/* <div className="chart" style={style.datavis}> */}

            {/* <p>{props.name}</p> */}

        {/* //  <h1>DataVis</h1>
        //  <p>{props.name}</p>
        //  <p>{props.table}</p>
        //  </div> */}
    {/* </div> */}
    </div>
)

export default DataVis;