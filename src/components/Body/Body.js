
import React, { Component } from 'react'
import Search from '../Search/Search.js'
import Table from '../Table/Table.js'
import API from '../../API/API.js'

class Body extends Component {
    state = {
        employees: [],
        search: '',
        filteredEmployees: [],
        sorting: this.initialsorting,
    };


    get initialsorting() {
        return {
            name: "",
            phone: "",
            email: "",
            city: "",
            state: "",
            street: "",
            postcode: "",
        };
    }

    componentDidMount() {
        API.getUsers()
            .then((res) =>{
                this.setState({
                    employees: res.data.results,
                    filteredEmployees: res.data.results,
                })
            })
            .catch((err) => console.log(err))
    };

    handleInputChange = (event) => {
        const value = event.target.value;
        this.setState({ search: value });
        this.searchEmployees(value.trim())
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
    };


    onSort = (key, primary = 0, secondary = 0) => {
        let sortedEmployees = this.state.filteredEmployees;
        console.log(key)
        if (this.state.sorting[key]) {
            this.setState({
                filteredEmployees: sortedEmployees.reverse(),
                sorting: {
                    ...this.initialsorting,
                    [key]: this.state.sorting[key] === "asc" ? "desc" : "asc",
                },
            });
        } else {

            this.setState({
                filteredEmployees: sortedEmployees,
                sorting: {
                    ...this.initialsorting,
                    [key]: "asc",
                },
            });
        }
    };

    searchEmployees = (input) => {
        if (input) {
            console.log(input)
            this.setState({
                filteredEmployees: this.state.employees.filter((employee) => {
                    console.log(employee)
                    return (
                        employee.name.last.includes(input) ||
                        employee.name.first.includes(input) ||
                        employee.phone.includes(input) ||
                        employee.email.includes(input) ||
                        employee.location.city.includes(input) ||
                        employee.location.state.includes(input)
                    );
                }),
            });
        } else {
            this.setState({ filteredEmployees: this.state.employees });
        }
    };

    render() {
        return (
            <>
                <Search
                    value={this.state.search}
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}
                />
                <div className='container mt-4'>
                <Table
                    state={this.state}
                    onSort={this.onSort}
                    filterEmployees={this.filterEmployees}
                    formatDate={this.formatDate}
                />
            </div>
                </>
        )
    }
}

export default Body;