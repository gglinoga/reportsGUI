import React, {
    Component
} from "react";
import Datasets from "../datasets/datasets.js";
import Navbar from "../Navbar/Navbar.js";
// import DataVis from "../dataVis/DataVis.js";
import Modal from "../Modal/Modal.js";
import XYFrame from "../dataVis/XYFrame.js";
import DataVis from "../dataVis/DataVis.js";

class Home extends Component {

    state = {
        datasets: [{
                'name': "Mobile OS Market-Share",
                'table': 'mobile_os_usage'
            },
            {
                'name': 'FBI Crime Statistics',
                'table': 'FBICrimeState'
            },
            {
                'name': 'Home Sales, United States',
                'table': 'home_sales'
            },
            {
                'name': 'Theaters',
                'table': 'theaters'
            },
            {
                'name': 'Aegypti',
                'table': 'aegypti'
            }
        ],
        dataVis: "Select a data set",
        table: "n/a",
        show: false,
        data: []
    }

    showModal = () => {
        this.setState({
            ...this.state,
            show: !this.state.show
        })
        console.log(this.state.show);
    }

    handleClick = (name, table) => {
        console.log(name)
        this.setState({
            dataVis: name,
            table: table
        })
        console.log(table)
        console.log(this.state.table)
        // this.showModal();
        fetch(`/api/${table}`, {
            method: 'GET',
           })
           .then(res=>{
               let foo = res.json();
               foo.then(json=> {
                //    console.log(json);
                   this.setState({ data: json})
                   console.log(this.state.data)
               })
           })
           .catch(err => {
               if (err) throw err
           });
    }

    componentWillMount() {
        console.log('will Mount');
    }

    render() {
        return ( <div>
                <Navbar/>
                <Modal showModal = {
                    this.showModal
                }
                show = {
                    this.state.show
                } >
                </Modal> 
                <div className = "row" >
                    <div className = "col-12" >
                        <div className = "d-flex flex-wrap justify-content-center" > {
                            this.state.datasets.map(x => ( <Datasets 
                                name = {x.name}
                                table = {x.table}
                                handleClick = {
                                this.handleClick
                        }
                        // img={table.img}
                        />              
                    ))
                } 
                        </div> 
                    </div> 
                </div> 
                <div className="d-flex flex-wrap justify-content-center">

                <div className="row">
                    <div className="col-12">
                                <h1>{this.state.dataVis}</h1>
                                </div>
                                </div>
                                <br></br>
                                <div className="row">
                                    <div className="col-12">
                                <h2>{this.state.table}</h2>
                                {/* <XYFrame name={this.state.dataVis}>

                                </XYFrame> */}
                                <br></br>
                                <DataVis
                                    name={this.state.dataVis}/>
                            
                            </div>
                        </div>
                </div> 
                </div>
            
    )
}

}

export default Home;