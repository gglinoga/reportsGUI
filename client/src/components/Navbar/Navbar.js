import React, {Component} from "react";

const navStyle = {
    fontFamily: "'Questrial', sans-serif",
    fontWeight: "bolder",
    height: "auto",
    paddingLeft: "10px",
    border: "2px grey solid",
    fontcolor: "#faf7ac"
}

const navLeft = {
    textAlign: "left",
    fontSize: "20px",
    margin: "auto",
       
}

const navCenter = {
    color: "black",
    textAlign: "center",
    fontSize: "32px",
    display: "table",
    margin: "auto"
    
}

const a = {
    color: "black",
}

const navRight = {
    textAlign: "bottom",
    fontSize: "20px",
    textAlign: "right",
    paddingRight: "30px",
    margin: "auto",

}

class Navbar extends Component {

render () {
    return(
        <div>
        <nav className="home">
        <div className="row" style={navStyle}>
        <div className="col-12" style={navCenter}>
                <a href="/"style={a}><i className="fas fa-home"></i>   </a>
        </div>
        {/* <div class="col-4" style={navCenter}>
                <p style={navCenter}><i class="fas fa-book-reader"></i></p>
        </div> */}
        {/* <div class="col-4" style={navRight}>
            <a style={a} ><i class="fas fa-sign-in-alt"></i>    </a>
            <a style={a}>|</a>
            <a href="/user" style={a}>     <i class="fas fa-user"></i>    </a>
            <a style={a}>|</a>
            <a href="/upload" style={a}>     <i class="fas fa-file-upload"></i>     </a>
        </div> */}
        </div>
        </nav>
        </div>
)
    }

}

export default Navbar;
