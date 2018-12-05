import React, {Component} from 'react';
import axios from "axios";
import './App.css'
import Left from './item';
import Right from './item';
import Dropdown from './dropdown';

class App extends Component {

    constructor() {
        super();
        this.state = {
            rawData: [],
            showList: false,
            list: [],
            listInitLength: 0,
            viewed: [],
            data: null,
            left: null,
            leftInd: -1,
            nextManualAction: 'leftNext',
            right: null,
            rightInd: 0,
            nomenclatureID: '0',
            nomenclatureData: 'nomenclatureData',
            appAutoPlay: true,
            rankNames: null
        };
        this.fulltime = 10;
        this.t = this.fulltime;
        this.movetime = 10;
        this.auto_on = true;
        this.site = 'http://wayagent.com/ctn'
    }

    componentDidMount() {
        this.getList()
    }

    timer = () => {
        if (this.auto_on) {
            this.t = this.t - 1;
            console.log(this.t);
            if (this.t <= 0) {
                this.t = this.fulltime;
                this.buttonPrevNextClick('');
            }
            const _this = this;
            setTimeout(function () {
                _this.timer();
            }, 1000);
        }
    };

    randomNr = (key_length) => {
        return Math.floor((Math.random() * key_length));
    };

    getList = () => {
        const that = this;
        axios.get(this.site + '/rssGetList.php')
            .then(response => {
                let list = [];
                response.data.list.forEach(item => {
                    if (item['Existent'] === '1') {
                        list.push(item);
                    }
                });
                this.setState({
                        rawData: response.data.list,
                        list: list,
                        listInitLength: list.length,
                        rankNames: response.data.rankNames
                    },
                    () => {
                        this.buttonPrevNextClick('leftNext');
                        that.timer();
                    }
                );
            });
    };

    getItem = (key) => {
        axios.get(this.site + '/rssGetItem.php?Key=' + key)
            .then(response => {
                this.setState({
                    data: response.data,
                    left: response.data['ID'],
                    right: response.data.relevantTaxKeys[0],
                    rightInd: 0
                });
            });
    };

    getChildren = async (id) => {
        const res = await axios.get(this.site + '/rssGetChildren.php?id=' + id);
        return await res.data;
    };

    buttonPrevNextClick = (nextManualAction) => {
        let random;
        const viewed = this.state.viewed;
        const list = this.state.list;
        if (nextManualAction === 'leftPrev') {
            if (this.state.leftInd > 0) {
                this.setState({left: undefined, right: undefined});
                this.setState({nextManualAction: '', leftInd: this.state.leftInd - 1, rightInd: 0},
                    () => {
                        this.getItem(this.state.viewed[this.state.leftInd]['ID']);
                    });
            }
        }
        else if (nextManualAction === 'leftNext') {
            this.setState({left: undefined, right: undefined});
            if (this.state.leftInd < this.state.viewed.length - 1) {
                this.setState({nextManualAction: '', leftInd: this.state.leftInd + 1, rightInd: 0},
                    () => {
                        this.getItem(this.state.viewed[this.state.leftInd]['ID']);
                    }
                );
            }
            else if (list.length === 0 && viewed.length > 0) {
                window.location.reload();
            }
            else {
                random = this.randomNr(this.state.list.length);
                viewed.push(list[random]);
                list.splice(random, 1);
                this.setState({nextManualAction: '', list, viewed, leftInd: this.state.leftInd + 1, rightInd: 0},
                    () => {
                        this.getItem(viewed[this.state.leftInd]['ID']);
                    }
                );
            }
        }
        else if (nextManualAction === 'rightPrev') {
            this.setState({right: undefined}, () => {
                setTimeout(() => {
                    const rightInd = (this.state.rightInd > 0) ? this.state.rightInd - 1 : this.state.data.relevantTaxKeys.length - 1;
                    this.setState({
                        right: this.state.data.relevantTaxKeys[rightInd],
                        rightInd: rightInd,
                        nextManualAction: ''
                    });
                }, 0);
            });
        }
        else if (nextManualAction === 'rightNext') {
            this.setState({right: undefined}, () => {
                setTimeout(() => {
                    const rightInd = (this.state.rightInd < this.state.data.relevantTaxKeys.length) ? this.state.rightInd + 1 : 0;
                    this.setState({
                        right: this.state.data.relevantTaxKeys[rightInd],
                        rightInd: rightInd,
                        nextManualAction: ''
                    });
                }, 0);
            });
        }
        else if (this.state.nextManualAction === '') {
            if (this.state.rightInd < this.state.data.relevantTaxKeys.length - 1) {
                this.setState({right: undefined}, () => {
                    setTimeout(() => {
                        this.setState({
                            right: this.state.data.relevantTaxKeys[this.state.rightInd + 1],
                            rightInd: this.state.rightInd + 1
                        });
                    }, 500);
                });
            }
            else if (list.length === 0 && viewed.length > 0) {
                window.location.reload();
            }
            else {
                this.setState({left: undefined, right: undefined});
                if (this.state.leftInd < this.state.viewed.length - 1) {
                    this.setState({nextManualAction: '', leftInd: this.state.leftInd + 1, rightInd: 0},
                        () => {
                            this.getItem(this.state.viewed[this.state.leftInd]['ID']);
                        }
                    );
                } else {
                    random = this.randomNr(list.length);
                    viewed.push(list[random]);
                    list.splice(random, 1);
                    this.setState({list, viewed, leftInd: this.state.leftInd + 1, rightInd: 0},
                        () => {
                            this.getItem(viewed[this.state.leftInd]['ID']);
                        }
                    );
                }
            }
        }

    };

    listClick = (data) => {
        this.setState({left: undefined, right: undefined});
        this.getItem(data, -1);
        this.setState({
            rightInd: 0
        });
    };

    onActivity = (e) => {
        if (this.t !== 0) {
            this.t = this.movetime;
        }
    };

    render() {
        return (
            <div className="App" onMouseMove={this.onActivity} onClick={this.onActivity}>
                <div className="header">
                    {this.state.list.length > 0 ? <div
                        className="listButton"
                        onClick={() => {
                            if (this.state.showList) {
                                document.getElementById("dropdownDiv").style.animation = 'scaleOut .3s ease-in-out forwards';
                                setTimeout(() => {
                                    this.setState({showList: false});
                                }, 300);
                            } else {
                                this.setState({showList: true}, () => {
                                    document.getElementById("dropdownDiv").style.animation = 'scaleIn .3s ease-in-out forwards';
                                });

                            }
                        }}
                    >
                        List
                    </div> : null}
                </div>
                {this.state.showList ? <Dropdown
                    data={{
                        viewed: this.state.viewed,
                        rawData: this.state.rawData,
                        rankNames: this.state.rankNames,
                        nomenclatureData: null
                    }}
                    listClick={data => this.listClick(data)}
                    getChildren={data => this.getChildren(data)}
                /> : null}
                <div className="disp">
                    <div className="half">
                        <Left
                            data={{
                                window: 'left',
                                leftInd: this.state.leftInd + 1,
                                ID: this.state.left,
                                data: this.state.data,
                                viewed_length: this.state.viewed.length,
                                list_length: this.state.list.length,
                                listInitLength: this.state.listInitLength
                            }}
                            buttonPrevNextClick={this.buttonPrevNextClick}
                        />
                    </div>
                    <div className="half">
                        <Right
                            data={{
                                window: 'right',
                                rightInd: this.state.rightInd,
                                ID: this.state.right,
                                data: this.state.data
                            }}
                            buttonPrevNextClick={this.buttonPrevNextClick}
                        />
                    </div>
                </div>
            </div>
        );
    }

}

export default App;