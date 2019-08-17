import React, {
    Component
} from "react";
import Datasets from "../datasets/datasets.js";
import Navbar from "../Navbar/Navbar.js";
// import Modal from "../Modal/Modal.js";
import XYFrame from "../dataVis/XYFrame.js";
import DataVis from "../dataVis/DataVis.js";

class Home extends Component {

    state = {
        datasets: [
            // {
            //     'name': "Mobile OS Market-Share",
            //     'table': 'mobile_os_usage'
            // },
            // {
            //     'name': 'FBI Crime Statistics',
            //     'table': 'FBICrimeState'
            // },
            // {
            //     'name': 'Home Sales, United States',
            //     'table': 'home_sales'
            // },
            // {
            //     'name': 'Theaters',
            //     'table': 'theaters'
            // },
            {
                'name': 'Aegypti',
                'table': 'aegypti'
            },
            {
                'name': 'Cause of Death',
                'table': 'death'
            }
        ],
        dataVis: "Select a data set",
        table: "n/a",
        show: false,
        data: []
    }

    // showModal = () => {
    //     this.setState({
    //         ...this.state,
    //         show: !this.state.show
    //     })
    //     console.log(this.state.show);mdoal
    // }

    handleClick = (name, table) => {
        console.log(name)
        this.setState({
            dataVis: name,
            table: table
        })
        console.log(table)
        // console.log(this.state.table)
        // this.showModal();
        fetch(`/api/${table}`, {
            method: 'GET',
           })
           .then(res=>{
               let foo = res.json();
               foo.then(json=> {
                //    console.log(json);
                   this.setState({ data: json})
                //    console.log(this.state.data)
               })
           })
           .catch(err => {
               if (err) throw err
           });
        //    window.location.replace('/chart');
    }

    componentWillMount() {
        console.log('will Mount');
    }

    render() {
        return ( <div>
                <Navbar/>
                {/* <Modal showModal = {
                    this.showModal
                }
                show = {
                    this.state.show
                } >
                </Modal>  */}
                <div className = "row" >
                    <div className = "col-12" >
                        <div className = "d-flex flex-wrap justify-content-center" ></div> {
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
                
                <div className="d-flex flex-wrap justify-content-center">

                <div className="row">
                    <div className="col-12">
                                {/* {this.state.data.map(x => ( <DataVis
                                    name = {x.VECTOR}
                                    country = {x.COUNTRY}
                                    />))
                                    } */}
                        <DataVis 

                        chartData= {this.state.data}
                        
                        />

                </div> 
                </div>
                </div>
                </div>
            
    )
}

}

export default Home;