import React from "react";
import PropTypes from "prop-types";
import DataVis from "../dataVis/DataVis.js";

const backdropStyle  = {
    // position: "fixed",
    // top: 20,
    // bottom: 0,
    // left: 0,
    // right: 0,
    // backgroundColor: "white",
    // padding: 50,
    // overflowY: "auto",
    // opacity: .8
}

const modalStyle = {
    // backgroundColor: "#fff",
    // borderRadius: 5,
    // // maxWidth: 1000,
    // minHeight: 475,
    // margin: '0 auto',
    // padding: 30,
    // position: "relative",
    // zIndex: 1000,
    // textAlign: "center"

    backgroundColor: "gray",
	position: "fixed",
	top: "50%",
	left: "50%",
	width: "80vw",
	height: "80vh",
	zIndex: 2000,
	// visibility: "hidden",
	// backfaceVisibility: "hidden",
	transform: "translateX(-50%) translateY(-50%)"
}

const footerStyle = {
    bottom: 20,
    align: "right"
    
}

const style = {
    btn: {
        backgroundColor: "mediumblue",
        color: "white",
        borderRadius: "20px"    
}
// }
}

export default class Modal extends React.Component {
    // onClose = (e) => {
    //     console.log('close');
    //     this.props.onClose && this.props.onClose(e);
    //     // console.log(this);
    // }

    render() {
        if(!this.props.show) {
            return null;
        }
        return(
            <div style={backdropStyle}>  
                <div style={modalStyle}>
                    <DataVis/>
                    {this.props.children}
                    <div className="text-center" style={footerStyle}>

                    <button style={style.btn} onClick={()=>this.props.showModal()}>
                        Close
                    </button>
                    </div>

                </div>
            </div>
        )
    }
}


Modal.propTypes = {
    onClose: PropTypes.func.isRequired
}