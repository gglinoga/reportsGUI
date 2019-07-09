import React from "react";

const style ={
    card: {
        width: "275px",
        height: "225px",
        padding: "30px",
        fontFamily: "'Questrial', sans-serif",
        color: "black",
        margin: "20px 30px 20px", 
        backgroundColor: "#d2d2d2",
        // backgroundImage: "linear-gradient(to bottom, blue, red)",
        // border: "grey 2px solid",
        borderRadius: "10px",
        boxShadow: "5px 5px 5px grey",
        textAlign: "center", 
        fontSize: "24px",
        display: "inline-block"
    },

}

const Datasets = props => (
    <div id="card" style={style.card}>
        <p>{props.name}</p>
        {/* <img src={props.img} style = {style.img}></img> */}
    </div>
)

export default Datasets;