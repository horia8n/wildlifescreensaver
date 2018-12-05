import React, {Component} from 'react';
import DropdownView from './dropdown_view';

class Dropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {componentPicked: 'nomenclature'};
    }

    highlightButton = (tab) => {
        for (let i in document.getElementsByClassName("listTopButtons")) {
            document.getElementsByClassName("listTopButtons")[i].style.borderColor = '#666';
            document.getElementsByClassName("listTopButtons")[i].style.color = '#666';
        }
        document.getElementById(tab).style.borderColor = '#aaa';
        document.getElementById(tab).style.color = '#ccc';
        setTimeout(this.setState({componentPicked: tab}), 100);
    };

    componentDidMount(){
        this.highlightButton('nomenclature');
    }

    render() {
        return (
            <div className="dropdownDiv" id="dropdownDiv">
                <div className="listTopDiv">
                    <div
                        className="listTopButtons"
                        id="nomenclature"
                        onClick={() => this.highlightButton('nomenclature')}
                    >
                        Nomenclature
                    </div>
                    <div
                        className="listTopButtons"
                        id="filter"
                        onClick={() => this.highlightButton('filter')}
                    >
                        Filter
                    </div>
                    <div
                        className="listTopButtons"
                        id="viewed"
                        onClick={() => this.highlightButton('viewed')}
                    >
                        Viewed
                    </div>
                </div>
                <DropdownView
                    data={{
                        componentPicked: this.state.componentPicked,
                        nomenclatureData: this.props.data.nomenclatureData,
                        viewed: this.props.data.viewed,
                        rawData: this.props.data.rawData,
                        rankNames: this.props.data.rankNames,
                    }}
                    listClick={data => this.props.listClick(data)}
                    getChildren={data => this.props.getChildren(data)}
                />
            </div>
        );
    }
}

export default Dropdown;