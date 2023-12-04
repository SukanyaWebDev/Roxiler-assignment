// frontend/src/Home.js
import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import ChartComponent from '../ChartComponent';
import PieChartComponent from '../PieChartComponent';
import './index.css'

const arrayMonths = { "01": "January", "02": "Feb", "03": "March", "04": "April" }
console.log(arrayMonths["01"])

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: '03',
            searchText: '',
            page: 1,
            transactions: [],
            statistics: {},
            pieChartData: {},
            barChartData: {}
        };
        
    }

    componentDidMount() {
        this.loadTransactions();
        this.loadStatistics();
        this.loadBarChartData();
        this.loadPieChartData();
        this.loadCombinedData()

    };

    loadTransactions = async (previous = false) => {
        try {
            const response = await axios.get(`http://localhost:5000/list-transactions?month=${this.state.month}&search_text=${this.state.searchText}&page=${previous ? this.state.page - 1 : this.state.page}`);
            this.setState({ transactions: response.data.transactions });
        } catch (error) {
            console.error(error);
        }
    };

    loadStatistics = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/statistics?month=${this.state.month}`);
            this.setState({ statistics: response.data });
        } catch (error) {
            console.error(error);
        }
    };

    loadBarChartData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/bar-chart?month=${this.state.month}`);
            this.setState({ barChartData: response.data.bar_chart_data });
        } catch (error) {
            console.error(error);
        }
    };

    loadPieChartData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/pie-chart?month=${this.state.month}`);
            this.setState({ pieChartData: response.data.pie_chart_data });
        } catch (error) {
            console.error(error);
        }
    };

    loadCombinedData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/combined-response?month=${this.state.month}`);
            console.log('Combined Response:', response.data);
            this.loadTransactions();

            this.loadStatistics();

            this.loadBarChartData();

            this.loadPieChartData();

        } catch (error) {
            console.error(error);
        }
    };





    render() {
        const { barChartData, pieChartData, transactions, statistics } = this.state
        console.log(pieChartData)

        return (
            <div className="Home">
                <h1 className='mainHe'>Transactions Dashboard</h1>
                <div className='dataTable1'>

                    <div>
                        <label htmlFor="monthDropdown">Select Month:</label>
                        <select id="monthDropdown" value={this.state.month} onChange={(e) => this.setState({ month: e.target.value })}>
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">augest</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="12">November</option>
                            <option value="12">December</option>

                        </select>
                    </div>
                    <input type="text" id="searchInput" placeholder="Search transactions" value={this.state.searchText} onChange={(e) => this.setState({ searchText: e.target.value })} />
                    <button onClick={this.loadCombinedData} className='searchButto'>Search</button>
                </div>
                <table className='dataTable'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>description</th>
                            <th>Price</th>
                            <th>category</th>
                            <th>Image</th>

                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.title}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.price}</td>
                                <td>{transaction.category}</td>
                                <td><img src={transaction.image} alt={transaction.title} className='myImg' /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='dataTable4' style={{ marginTop: "50px" }}>
                    <div className="sContainer">
                        <h1>Statistics:{arrayMonths[this.state.month]}</h1>
                        <div className='disignStyle'>
                            <div>Total Sale Amount: {statistics.totalSaleAmount}</div>
                            <div>Total Sold Items: {statistics.soldItems}</div>
                            <div>Total Not Sold Items: {statistics.notSoldItems}</div>
                        </div>
                    </div>

                    <div id="barChartContainer">
                        <h2>Transactions Bar Chart</h2>
                        <ChartComponent data={barChartData} />


                    </div>

                    <div id="pieChartContainer" >
                        <h2>Transactions Pie Chart</h2>

                        <PieChartComponent data={pieChartData} />
                    </div>


                </div>
            </div>
        );
    }
}

export default Home;
