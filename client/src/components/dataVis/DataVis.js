import React from "react";

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

    }
}

const DataVis = props => (
    <div style={style.datavis}>
        <h1>DataVis</h1>
        <p>{props.name}</p>
        <p>{props.table}</p>
    </div>
)

export default DataVis;