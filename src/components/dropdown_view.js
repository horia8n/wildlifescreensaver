import React, {Component} from 'react';
import Nomenclature from './nomenclature';
import Viewed from './viewed';
import Filter from './filter';

class DropdownView extends Component {

    pickComponent(data) {
        if (data === 'nomenclature') {
            return <Nomenclature
                data={{rankNames: this.props.data.rankNames}}
                listClick={data => this.props.listClick(data)}
                getChildren={data => this.props.getChildren(data)}
            />
        }
        else if (data === 'filter') {
            return <Filter
                data={{rawData: this.props.data.rawData}}
                listClick={data => this.props.listClick(data)}
            />
        }
        else if (data === 'viewed') {
            return <Viewed
                data={{viewed: this.props.data.viewed}}
                listClick={data => this.props.listClick(data)}
            />
        }
    }

    render() {
        return (
            <div className="listWrap">
                {this.pickComponent(this.props.data.componentPicked)}
            </div>
        );
    }
}

export default DropdownView;