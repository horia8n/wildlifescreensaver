import React, {Component} from 'react';

class NomenclatureItem extends Component {

    constructor(props) {

        super(props);

        this.state = {
            data: null
        };

        this.parent = 0;
        this.itemStatus = [];
        this.itemStatusTemp = [];
        this.localPics = 'http://wayagent.com/MasterOntario/';
    }

    content() {
        if (this.props.data.data === null) {
            return '';
        }
        return this.props.data.data.map(item => {
                if (typeof this.itemStatus[item['ID']] === 'undefined') {
                    this.itemStatus[item['ID']] = 0;
                }
                return (
                    <div
                        key={item['ID']}
                        className={'rankID' + item['rank_id'] + ' treeItem treeItem' + item['ID']}
                        onClick={() => {
                            this.props.getChildren(item['ID']).then(
                                data => {
                                    this.setState({data: data});
                                }
                            )
                        }}
                    >
                        <div>{item['CommonName']} <span>{item['LatinName']} Rank</span></div>
                        <div className="rankID10 treepictures">
                            <img src={this.localPics + item['ID'] + '_0.jpeg'}/>
                            <img src={this.localPics + item['ID'] + '_1.jpeg'}/>
                            <img src={this.localPics + item['ID'] + '_2.jpeg'}/>
                        </div>
                        <div className="rankID10 treeItem 202422">
                            <NomenclatureItem
                                data={{parent: 0, data: this.state.data}}
                                getChildren={data => this.props.getChildren(data)}
                                close={() => {
                                    console.log('close**********');
                                    this.setState({data: null});
                                }}
                            />
                        </div>
                    </div>

                );
            }
        );
    }

    parent_setitemStatus(itemStatus) {
        this.itemStatus = itemStatus;
    }

    parent_gettitemStatus() {
        return this.itemStatus;
    }

    render() {
        return (
            <div className="rankID0 treeItem 0">
                {this.content()}
            </div>
        );
    }

}

export default NomenclatureItem;