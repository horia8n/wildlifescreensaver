import React, {Component} from 'react';
import _ from 'lodash';
import Search from './search';

class Filter extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filter_term: '',
            filtered_indexes: 'loading',
            orderByColumn: 'LatinName',
            orderByOrder: 'asc'
        };
        // this.site  = 'http://wayagent.localhost/MasterOntario/';
        this.site = 'http://wayagent.com/MasterOntario/';
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({filtered_indexes: this.props.data.rawData});
        }, 10);
    }

    listItems() {
        if (this.state.filtered_indexes === 'loading') {
            return <div className="wait7"><img src="img/wait7.gif" alt="wait"/></div>;
        }
        const listItemsResult = [];
        const refixed_indexes = _.orderBy(this.state.filtered_indexes, [this.state.orderByColumn], [this.state.orderByOrder]);
        refixed_indexes.forEach((item, index) => {
            if (item['Existent'] === '1') {
                listItemsResult.push(
                    <li className="item" onClick={() => this.props.listClick(item['ID'])} key={index}>
                        <div>
                            <span className="CommonName">{item['CommonName']} </span>
                            <span className="LatinName">{item['LatinName']} </span>
                        </div>
                        <div className="filterpictures">
                            <img src={this.site + item.ID + '_0.jpeg'} alt="img"/>
                            <img src={this.site + item.ID + '_1.jpeg'} alt="img"/>
                            <img src={this.site + item.ID + '_2.jpeg'} alt="img"/>
                        </div>
                    </li>
                );
            }
        });
        return (
            <ul className="list">
                {listItemsResult}
            </ul>
        );
    }

    sortChange = (event) => {
        this.setState({orderByColumn: event.target.value});
    };

    orderChange = (event) => {
        this.setState({orderByOrder: event.target.value});
    };

    render() {
        return (
            <div className="filterWrap">
                <div className="filterControls">
                    <Search
                        setFilter={data => {
                            this.setState({filter_term: data});
                            if (data !== '') {
                                const filtered_indexes = _.filter(this.props.data.rawData,
                                    item => item.LatinName.toLowerCase().includes(data.toLowerCase()) === true || item.CommonName.toLowerCase().includes(data.toLowerCase()) === true
                                );
                                this.setState({filtered_indexes: filtered_indexes});
                            } else {
                                this.setState({filtered_indexes: this.props.data.rawData});
                            }
                            console.log('filtered_indexes', this.state.filtered_indexes);
                        }}
                    />
                    <select name="" className="selectFilter" onChange={this.sortChange}>
                        <option value="LatinName">Sort by Latin Name</option>
                        <option value="CommonName">Sort by Common Name</option>
                        <option value="EasyTaxonomy">Sort by Taxonomy</option>
                    </select>
                    <select name="" className="selectFilter" onChange={this.orderChange}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                <div className="filteredContent">
                    {this.listItems()}
                </div>
            </div>
        );
    }
}

export default Filter;