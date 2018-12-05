import React, {Component} from 'react';

class Search extends Component {
    render() {
        return (
            <input className="searchFilter" placeholder="Search by Common Or Scientific Name"
                   onChange={
                       (event) =>
                           this.props.setFilter(event.target.value)
                   }
            />
        );
    }
}

export default Search;