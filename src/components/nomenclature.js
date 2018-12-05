import React, {Component} from 'react';
// import NomenclatureItem from './nomenclature_item';
import TreeNode from './tree_node';

class Nomenclature extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    tree(data) {
        if (!data) {
            return <div className="wait"><img src="img/wait7.gif" alt="wait"/></div>;
        }
        return data.map((item, index) => {
            return (
                <TreeNode
                    item={item}
                    data={{rankNames: this.props.data.rankNames}}
                    listClick={data => this.props.listClick(data)}
                    getChildren={data => this.props.getChildren(data)}
                    key={index}
                />
            );
        });
    }

    render() {
        return (
            <div className="treeWrap">
                {this.tree(this.state.data)}
            </div>
        );
    }

    parent_setitemStatus(itemStatus) {
        this.itemStatus = itemStatus;
    }

    parent_gettitemStatus() {
        return this.itemStatus;
    }

    componentDidMount() {
        this.props.getChildren(0).then(
            data => {
                console.log('$$$$$$$$$ getChildrenData', data);
                this.setState({data: data})
            }
        )
    }
}

export default Nomenclature;