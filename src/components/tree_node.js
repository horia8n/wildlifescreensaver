import React, {Component} from "react";

class TreeNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            colapsed: false
        };
        // this.localPics = 'http://wayagent.localhost/MasterOntario/';
        this.localPics = "http://wayagent.com/MasterOntario/";
    }

    tree(data) {
        if (!data) {
            return null;
        }
        if (data === 'loading') {
            return <div className="wait7"><img src="img/wait7.gif" alt="wait"/></div>;
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

    htmlContent(item) {
        let titlePart;
        if (item.Existent === "0") {
            if (item.rank_id === "180") {
                titlePart = (
                    <div>
                        <span className="CommonName">{item.LatinName + " "}</span>
                        <span>{this.props.data.rankNames[item.kingdom_id][item.rank_id] + " "}</span>
                        <span className="existentNumber">{"( " + item.existentNumber + " )"}</span>
                    </div>
                );
            }
            else {
                titlePart = (
                    <div>
                        <span className="CommonName">{item.CommonName + " "}</span>
                        <span>{this.props.data.rankNames[item.kingdom_id][item.rank_id] + " "}</span>
                        <span className="LatinName">{item.LatinName + " "}</span>
                        <span className="existentNumber">{"( " + item.existentNumber + " )"}</span>
                    </div>
                );
            }
        }
        else if (item.Existent === "1") {
            titlePart = (
                <div>
                    <span className="CommonName">{item.CommonName + " "}</span>
                    <span>{this.props.data.rankNames[item.kingdom_id][item.rank_id] + " "}</span>
                    <span className="LatinName">{item.LatinName + " "}</span>
                </div>
            );
        }
        let picturesPart;
        if (item.rank_id > 140 && item.Existent === "0") {
            picturesPart = null;
        }
        else {
            picturesPart = (
                <div
                    className={"rankID" + this.props.item["rank_id"] + " treepictures"}
                >
                    <img src={this.localPics + item.ID + "_0.jpeg"} alt="img"/>
                    <img src={this.localPics + item.ID + "_1.jpeg"} alt="img"/>
                    <img src={this.localPics + item.ID + "_2.jpeg"} alt="img"/>
                </div>
            );
        }
        return (
            <div>
                {titlePart}
                {picturesPart}
            </div>
        );
    }

    render() {
        let existent = "";
        if (this.props.item["Existent"] === "1") {
            existent = " existent";
        }
        return (
            <div
                key={this.props.item.ID}
                className={"rankID" + this.props.item["rank_id"] + " treeItem" + existent}
            >
                <a
                    className={"rankID" + this.props.item["rank_id"] + " nodeDisplay"}
                    onClick={() => {
                        console.log('props: ', this.props);
                        if (this.props.item.Existent !== "1") {
                            if (this.state.data === null) {
                                this.setState({data: 'loading'});
                                this.props.getChildren(this.props.item.ID).then(data => {
                                    console.log("$$$$$$$$$ getChildrenData", data);
                                    this.setState({data: data});
                                });
                            } else {
                                this.setState({data: null});
                            }
                        } else {
                            this.props.listClick(this.props.item.ID);
                        }
                    }}
                >
                    {this.htmlContent(this.props.item)}
                </a>
                <div className={"rankID" + this.props.item["rank_id"] + " nodeContent"}>
                    {this.tree(this.state.data)}
                </div>
            </div>
        );
    }
}

export default TreeNode;
