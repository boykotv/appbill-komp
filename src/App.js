import React, { Component } from 'react';
import './App.css';
//import { delay } from './delay';

class App extends Component {

  state = {
    data: {
      modified_tariff: {},
      modified_data: {},
      old_data: {
                  hot_water: 569,
                  cold_water: 748,
                  gas: 110,
                  light11: 0,
                  light12: 0,
      },
      new_data: {
                  hot_water: 576,
                  cold_water: 751,
                  gas: 114,
                  light11: 100,
                  light12: 4,
      },
      tariffs: {
                  tv: 75,
                  house: 8.41,
                  domophone: 0,
                  hot_water: 87.33,
                  cold_water: 9.95,
                  stocks: 6.07,
                  gas: 8.548,
                  light1: 0.75,
                  light2: 1.4,
                  warm: 42.026,
      },        
    },
    info: {
                  house: 35.43,
                  warm: 34.5,
    },
    diff: {},
    results: {},
    isDataFetching: false,
    isDataChanged: false,
  };

  _setDataFetchingState = (state) => {
    this.setState({
      isDataFetching: state,
    });
  }

  componentDidMount = () => {
    this.setState(this.CalcBill(Object.assign({}, this.state)));
  }

  findValue = (par1, par2) => {
    return (typeof(par1) !== 'undefined') ? par1 : par2;
  } 

  handleTariffsChange = (event) => {
    
    var stateCopy = Object.assign({}, this.state);
    stateCopy.data.modified_tariff[event.target.name] = event.target.value;
    stateCopy.isDataChanged = true;
    
    this._setDataFetchingState(true);
    this.setState(this.CalcBill(stateCopy));   
    this._setDataFetchingState(false);
  }

  handleDataChange = (event) => {
    var stateCopy = Object.assign({}, this.state);
    stateCopy.data.modified_data[event.target.name] = event.target.value;
    stateCopy.isDataChanged = true;

    this._setDataFetchingState(true);
    this.setState(this.CalcBill(stateCopy));
    this._setDataFetchingState(false);
  }

  CalcBill = (stateCopy) => {
    const { old_data, new_data, modified_data, tariffs, modified_tariff } = stateCopy.data;
    const { info } = stateCopy;

    var diff = {};
    diff.hot_water = this.findValue(modified_data.hot_water, new_data.hot_water) - old_data.hot_water;
    diff.cold_water = this.findValue(modified_data.cold_water, new_data.cold_water) - old_data.cold_water;
    diff.gas = this.findValue(modified_data.gas, new_data.gas) - old_data.gas;
    diff.light11 = this.findValue(modified_data.light11, new_data.light11) - old_data.light11;
    diff.light12 = this.findValue(modified_data.light12, new_data.light12) - old_data.light12;
    stateCopy.diff = diff;

    var results = {};
    results.tv = Number((this.findValue(modified_tariff.tv, tariffs.tv)).toFixed(2));
    results.domophone = Number((this.findValue(modified_tariff.domophone, tariffs.domophone)).toFixed(2));
    results.house = Number((this.findValue(modified_tariff.house, tariffs.house) * info.house).toFixed(2));
    results.warm = Number((this.findValue(modified_tariff.warm, tariffs.warm) * info.warm).toFixed(2));
    results.hot_water = Number((this.findValue(modified_tariff.hot_water, tariffs.hot_water) * diff.hot_water).toFixed(2));
    results.cold_water = Number((this.findValue(modified_tariff.cold_water, tariffs.cold_water) * diff.cold_water
                        + this.findValue(modified_tariff.stocks, tariffs.stocks) * diff.cold_water
                        + this.findValue(modified_tariff.stocks, tariffs.stocks) * diff.hot_water).toFixed(2));
    results.gas = Number((this.findValue(modified_tariff.gas, tariffs.gas) * diff.gas).toFixed(2));
    results.light11 = Number(((diff.light11 <= 100) ? 
                       diff.light11 * this.findValue(modified_tariff.light1, tariffs.light1) :
                       100 * this.findValue(modified_tariff.light1, tariffs.light1) + (diff.light11 - 100) * this.findValue(modified_tariff.light2, tariffs.light2)).toFixed(2));
    results.light12 = Number(((diff.light12 <= 100) ? 
                       0.5 * diff.light12 * this.findValue(modified_tariff.light1, tariffs.light1) :
                       0.5 * 100 * this.findValue(modified_tariff.light1, tariffs.light1) + (diff.light12 - 100) * this.findValue(modified_tariff.light2, tariffs.light2)).toFixed(2));
    results.totall = Number((results.tv + results.domophone + results.house + results.warm + results.hot_water
                    + results.cold_water + results.gas + results.light11 + results.light12).toFixed(2));

    stateCopy.results = results;
    
    return stateCopy;
  }

  render() {
    const { old_data, new_data, tariffs, modified_tariff, modified_data } = this.state.data;
    const { diff, results, info, isDataChanged } = this.state;
  
    return (

    <div className = "container">
      <div className = "row">
				<div className = "col-md-6">	
					<div className = "alert alert-success" id = "success-alert">
						<strong>{ isDataChanged ? 'need save' : null }</strong>
					</div>	

          <form id = "form">	

            <div id = "options" className = "pull-right">
              <select name = "years" className = "years selectpicker">
                <option value = "2018">2018</option>
                <option value = "2019">2019</option>
                <option value = "2020">2020</option>
              </select>
              <select name = "months" className = "months selectpicker">
                <option value = "1">январь</option>
                <option value = "2">февраль</option>
                <option value = "3">март</option>
                <option value = "4">апрель</option>
                <option value = "5">май</option>
                <option value = "6">июнь</option>
                <option value = "7">июль</option>
                <option value = "8">август</option>
                <option value = "9">сентябрь</option>
                <option value = "10">октябрь</option>
                <option value = "11">ноябрь</option>
                <option value = "12">декабрь</option>
              </select>			
            </div>	
								
								
            <table className = "table table-striped">
              <tbody>
                <tr>
                  <th></th>
                  <th>было</th>
                  <th></th>
                  <th>стало</th>
                  <th>всего</th>
                  <th></th>
                  <th>сумма</th>
                </tr>	
                <tr>
                  <th>Кабельное ТВ</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    { results.tv }
                  </td>
                </tr>
                <tr>
                  <th>Домофон</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    { results.domophone }
                  </td>
                </tr>
                <tr>
                  <th>Содержание дома</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{info.house}</td>
                  <td></td>
                  <td>
                    { results.house }
                  </td>
                </tr>
                <tr>
                  <th>Отопление</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{ info.warm }</td>
                  <td></td>
                  <td>
                    { results.warm }
                  </td>
                </tr>	
                <tr>
                  <th>
                    <a href = "http://teploseti.zp.ua/ru/abonent/" target = "_blank" rel = "noopener noreferrer">Горячая вода</a>
                  </th>
                  <td>
                    { old_data.hot_water }
                  </td>
                  <td>-</td>
                  <td className = "has-success">
                    <input 
                      type = "text" 
                      className = "form-control" 
                      value = { this.findValue(modified_data.hot_water, new_data.hot_water) }
                      name = "hot_water"
                      onChange = { this.handleDataChange } 
                    />
                  </td>
                  <td>
                    { diff.hot_water }
                  </td>
                  <td></td>
                  <td>
                    { results.hot_water }
                  </td>
                </tr>	
                <tr>
                  <th>
                    <a href = "http://www.vodokanal.zp.ua/entry" target = "_blank" rel = "noopener noreferrer">Холодная вода</a></th>
                  <td>
                    { old_data.cold_water }
                  </td>
                  <td>-</td>
                  <td className = "has-success">
                    <input 
                      type = "text" 
                      className = "form-control" 
                      value = { this.findValue(modified_data.cold_water, new_data.cold_water) }
                      name = "cold_water"
                      onChange = { this.handleDataChange } 
                    />
                  </td>
                  <td>
                    { diff.cold_water }
                  </td>
                  <td></td>
                  <td>
                    { results.cold_water }
                  </td>
                </tr>
                <tr>
                  <th>
                    <a href = "https://104.ua/ua/cabinet/info" target = "_blank" rel = "noopener noreferrer">Газ</a>
                  </th>
                  <td>
                    { old_data.gas }
                  </td>
                  <td>-</td>
                  <td className = "has-success">
                    <input 
                      type = "text" 
                      className = "form-control"
                      value = { this.findValue(modified_data.gas, new_data.gas) }
                      name = "gas"
                      onChange = { this.handleDataChange } 
                    />
                  </td>
                  <td>
                    { diff.gas }
                  </td>
                  <td></td>
                  <td>
                    { results.gas }
                  </td>
                </tr>	
                <tr>
                  <th>
                    <a href = "http://www.zoe.com.ua/pokazania.php" target = "_blank" rel = "noopener noreferrer">Свет Т11</a>
                  </th>
                  <td>
                    { old_data.light11 }                
                  </td>
                  <td>-</td>
                  <td className = "has-success">
                    <input 
                      type = "text" 
                      className = "form-control"
                      value = { this.findValue(modified_data.light11, new_data.light11) }
                      name = "light11"
                      onChange = { this.handleDataChange } 
                    />
                  </td>
                  <td>
                    { diff.light11 }
                  </td>
                  <td></td>
                  <td>
                    { results.light11 }                 
                  </td>
                </tr>
                <tr>
                  <th>
                    <a href = "http://www.zoe.com.ua/pokazania.php" target = "_blank" rel = "noopener noreferrer">Свет Т12</a>
                  </th>
                  <td>
                    { old_data.light12 }                
                  </td>
                  <td>-</td>
                  <td className = "has-success">
                    <input 
                      type = "text" 
                      className = "form-control" 
                      value = { this.findValue(modified_data.light12, new_data.light12) }                      
                      name = "light12"
                      onChange = { this.handleDataChange } 
                    />
                  </td>
                  <td>
                    { diff.light12 }
                  </td>
                  <td></td>
                  <td>
                    { results.light12 }                 
                  </td>
                </tr>
                <tr className = "success">
                  <th>ИТОГО</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <th>
                    { results.totall }
                  </th>
                </tr>				
              </tbody>				
            </table>	
            <input type = "submit" className = "btn btn-success btn-lg btn-block" value="Сохранить показания"/>								
          </form>	
				</div>

        <div className = "col-md-4">
          <form id = "tariffs">
            <table className = "table table-striped">
              <tbody>
                <tr>
                  <td>Содержание дома</td>
                  <td className = "has-success">
                    <input 
                      type = "text" 
                      className = "form-control" 
                      value = { this.findValue(modified_tariff.house, tariffs.house) }
                      name = "house"
                      onChange = { this.handleTariffsChange } 
                    />
                  </td>
                </tr>
                <tr>
                  <td>Домофон</td>
                  <td className = "has-success">
                    <input 
                      type = "text" 
                      className = "form-control"
                      value = { this.findValue(modified_tariff.domophone, tariffs.domophone) }
                      name = "domophone"
                      onChange = { this.handleTariffsChange } 
                    />
                  </td>
                </tr>
                <tr>
                  <td>Кабельное</td>
                  <td className = "has-success">
                    <input 
                      type = "text" 
                      className = "form-control"
                      value = { this.findValue(modified_tariff.tv, tariffs.tv) }                    
                      name = "tv"
                      onChange = { this.handleTariffsChange } 
                    />
                  </td>
                </tr>
                <tr>
                  <td>Холодная вода</td>
                  <td className = "has-success">
                    <input 
                      type = "text" 
                      className = "form-control" 
                      value = { this.findValue(modified_tariff.cold_water, tariffs.cold_water) }  
                      name = "cold_water"
                      onChange = { this.handleTariffsChange } 
                    />
                  </td>
                </tr>	
                <tr>
                  <td>Горячая вода</td>
                  <td className = "has-success">
                    <input 
                      type = "text" 
                      className = "form-control" 
                      value = { this.findValue(modified_tariff.hot_water, tariffs.hot_water) }  
                      name = "hot_water"
                      onChange = { this.handleTariffsChange } 
                    />
                  </td>
                </tr>
                <tr>
                  <td>Стоки</td>
                  <td className = "has-success">
                    <input 
                      type = "text" 
                      className = "form-control" 
                      value = { this.findValue(modified_tariff.stocks, tariffs.stocks) }                    
                      name = "stocks"
                      onChange = { this.handleTariffsChange } 
                    />
                  </td>
                </tr>
                <tr>
                  <td>Газ</td>
                  <td className = "has-success">
                    <input 
                      type = "text" 
                      className = "form-control" 
                      value = { this.findValue(modified_tariff.gas, tariffs.gas) }
                      name = "gas"
                      onChange = { this.handleTariffsChange } 
                    />
                  </td>
                </tr>
                <tr>
                  <td>Свет &lt; 100</td>
                  <td className = "has-success">
                    <input 
                      type = "text" 
                      className = "form-control" 
                      value = { this.findValue(modified_tariff.light1, tariffs.light1) }
                      name = "light1"
                      onChange = { this.handleTariffsChange } 
                    />
                  </td>
                </tr>
                <tr>
                  <td>Свет &gt; 100</td>
                  <td className = "has-success">
                    <input 
                      type = "text" 
                      className = "form-control" 
                      value = { this.findValue(modified_tariff.light2, tariffs.light2) }
                      name = "light2"
                      onChange = { this.handleTariffsChange } 
                    />
                  </td>
                </tr>
                <tr>
                  <td>Отопление</td>
                  <td className = "has-success">
                    <input 
                      type = "text" 
                      className = "form-control" 
                      value = { this.findValue(modified_tariff.warm, tariffs.warm) }
                      name = "warm"
                      onChange = { this.handleTariffsChange } 
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <input type = "submit" className = "btn btn-success btn-lg btn-block" value = "Сохранить тарифы"/>
          </form>
        </div>
      </div>
    </div>		
		
    );
  }
}

export default App;
