import React, { Component } from "react";
import Datasets from "../datasets/datasets.js";
import Navbar from "../Navbar/Navbar.js";
// import DataVis from "../dataVis/DataVis.js";
import Modal from "../Modal/Modal.js";

class Home extends Component {

    state = {
        datasets: [
            {
                'name': "Mobile OS Market-Share", 
                'table': 'mobile_os_usage'}, 
            {
                'name': 'FBI Crime Statistics',
                'table': 'FBICrimeState'}, 
            {
                'name': 'Home Sales, United States',
                'table': 'home_sales'
            }],
        dataVis: "Select a data set",
        show: false
    }

    showModal = () => {
        this.setState({
            ...this.state,
            show: !this.state.show
        })
        console.log(this.state.show);
    }

    handleClick = (name) => {
        console.log(name)
        this.setState({
            dataVis: name
        })
        this.showModal();
    }

    componentWillMount() {
        console.log('will Mount');
    }

    render() {
        return(
            <div>
                <Navbar />
                <Modal
                    showModal={this.showModal}
                    show={this.state.show}>
                </Modal>
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex flex-wrap justify-content-center">
                                {this.state.datasets.map(table => (
                                    <Datasets 
                                        name={table.name}
                                        handleClick={this.handleClick}
                                        // img={table.img}
                                    />              
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-12">
                            <div className="d-flex flex-wrap justify-content-center">
                                <DataVis
                                name={this.state.dataVis}
                                /> 
                            </div>
                        </div>
                    </div> */}
            </div>
    )
}

}

export default Home;