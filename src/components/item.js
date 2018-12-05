import React from 'react';

const Item = (props) => {
    if (typeof props.data.ID === 'undefined' || props.data.data == null) {
        return <div className="wait"><span></span><img src="img/wait7.gif" alt="wait"/></div>;
    }
    else {
        const taxonomyItems = props.data.data.taxonomyItems;
        const item = taxonomyItems[props.data.ID];
        const latinNameArr = item['LatinName'].split(' ');
        let eolmap;
        if (latinNameArr.length > 2) {
            eolmap = 'url("http://www.discoverlife.org/mp/20m?map=' + latinNameArr[0] + ' ' + latinNameArr[latinNameArr.length - 1] + '")';
        }
        else {
            eolmap = 'url("http://www.discoverlife.org/mp/20m?map=' + item['LatinName'].replace(' ', '+') + '")';
        }
        const tree = item['relevantTreeArray'].map(parent => {
            if (!parent['CommonName'] || parent['rank_name'] === 'Genus') {
                return parent['LatinName'] + ' ' + parent['rank_name'];
            }
            return parent['CommonName'] + ' ' + parent['rank_name'];
        });
        let pictures;
        if (item['wildfoodPics'] != null && item['wildfoodPics'] !== '[]') {
            pictures = [];
            const eol = item['wildfoodPics'].concat(JSON.parse(item['googlePics']));
            for (let i = 0; i < 9; i++) {
                const picSRC = eol[i];
                const className = 'detImg detImg' + i;
                const pic = (
                    <div className="detailsPicReadDivWrap" key={i}>
                        <div className="detailsPicReadDiv">
                            <span className="detailsPicReadHelper"></span>
                            <img className={className} src={picSRC} alt="img"/>
                        </div>
                    </div>
                );
                pictures.push(pic);
            }
        }
        else if (item['googlePics'] !== null && item['googlePics'] !== '[]') {
            pictures = [];
            const eol = JSON.parse(item['googlePics']);
            for (let i = 0; i < 9; i++) {
                const picSRC = eol[i];
                const className = 'detImg detImg' + i;
                const pic = (
                    <div className="detailsPicReadDivWrap" key={i}>
                        <div className="detailsPicReadDiv">
                            <span className="detailsPicReadHelper"></span>
                            <img className={className} src={picSRC} alt="img"/>
                        </div>
                    </div>
                );
                pictures.push(pic);
            }
        }
        else {
            pictures = [];
            for (let i = 0; i < 4; i++) {
                const picSRC = 'http://wayagent.com/MasterOntario/' + props.data['ID'] + '_' + i + '.jpeg';
                const className = 'detImg detImg' + i;
                const pic = (
                    <div className="detailsPicReadDivWrap">
                        <div className="detailsPicReadDiv" key={i}>
                            <span className="detailsPicReadHelper"></span>
                            <img className={className} src={picSRC} alt="img"/>
                        </div>
                    </div>
                );
                pictures.push(pic);
            }
        }
        let controls;
        let displayIndex;
        let displayLength;
        if (props.data.window === 'left') {
            displayIndex = props.data.leftInd;
            displayLength = props.data.listInitLength;
        } else {
            displayIndex = props.data.rightInd + 1;
            displayLength = props.data.data.relevantTaxKeys.length;
        }
        controls = (
            <div>
                <img
                    className="button"
                    onClick={() => props.buttonPrevNextClick(props.data.window + 'Prev')}
                    src="img/left.png"
                    alt="img"
                />
                <span>&nbsp;&nbsp;</span>
                <span>{displayIndex}</span>
                <span>&nbsp;/&nbsp;</span>
                <span>{displayLength}</span>
                <span>&nbsp;&nbsp;</span>
                <img
                    className="button"
                    onClick={() => props.buttonPrevNextClick(props.data.window + 'Next')}
                    src="img/right.png"
                    alt="img"
                />
            </div>
        );
        return (
            <div className="itemDisp">
                <div className="names">
                    <div className="commonName" key="0">{item.CommonName}</div>
                    <div className="latinName" key="1">{item.LatinName}</div>
                </div>
                <div className="controls">{controls}</div>
                <div className="tree" key="2">{tree.join(' - ')}</div>
                <div className="pictures">{pictures}</div>
                <div className="mapWrap">
                    <div className="map" style={{backgroundImage: eolmap}}></div>
                </div>
            </div>
        );
    }
};

export default Item;