import React, {Component} from 'react';
import {connect} from 'react-redux';
import ItemPropertiesDisplay from './item-properties-display';


class ItemModsDisplay extends Component {
    formatAffixData() {
      var A = this.props.currentAffixs.slice();
      var arr = [];
      var i;
      var n = A.length;
      for (i=0;i<n;i++) {
        var j;
        var m = A[i].length
        for (j=0;j<m;j++) {
          var modValue = Object.assign({}, A[i][j]);
          if (modValue.affix==="Life Regen") {
            modValue.value /= 100;
          }
          arr.push(modValue);
        }
      }
      var result = [];
      arr.forEach(function (a) {
        if (!this[a.text]) {
          this[a.text] = { affix: a.affix, text: a.text, value: 0 };
          result.push(this[a.text]);
        }
        this[a.text].value += a.value;
      }, Object.create(null));
      console.log(result);
      return result.map((affix) => {
          return (
              <div id='affix' className="tooltipText">
                  {affix.text[0]}{affix.value}{affix.text[1]}
              </div>
          );
      });
    }

    render() {
        if (!this.props.currentAffixs) {
            return (<div>No Mods</div>);
        }
        return (
          <div className='itemStatsContainer'>
              <ItemPropertiesDisplay />
              <div className="itemImageDiv"><img src={require("../../assets/BodyDEX/AssassinsGarb.png")} alt='BodyDEX'/></div>
              <div className="affixContainer">{this.formatAffixData()}</div>
          </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        currentAffixs: state.currentAffixs
    };
}
export default connect(mapStateToProps)(ItemModsDisplay);
