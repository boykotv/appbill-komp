import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    data: {
      modified_tariff: {},
      modified_data: {},
      old_data: {
                  hot_water: 569,
                  cold_water: 748,
                  gas: 110,
                  light11: 3,
                  light12: 0,
      },
      new_data: {
                  hot_water: 576,
                  cold_water: 751,
                  gas: 114,
                  light11: 33,
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
    results: {
                  tv: 75,
                  house: 297.97,
                  domophone: 0,
                  hot_water: 611.31,
                  cold_water: 90.55,
                  gas: 34.19,
                  light1: 300,
                  light2: 200,
    },
    isDataFetching: false,
  };
   

  handleTariffsChange = (event) => {
    var stateCopy = Object.assign({}, this.state);
    stateCopy.data.modified_tariff[event.target.name] = event.target.value;
    this.setState(stateCopy);
  }

  handleDataChange = (event) => {
    var stateCopy = Object.assign({}, this.state);
    stateCopy.data.modified_data[event.target.name] = event.target.value;
    this.setState(stateCopy);
  }

  findValue = (par1, par2) => {
    return  (typeof(par1) !== 'undefined') ? par1 : par2;
  } 

  render() {
    const { isDataFetching } = this.state;
    const { old_data, new_data, tariffs, modified_tariff, modified_data } = this.state.data;
    
    return (

    <div className = "container">
      <div className = "row">
				<div className = "col-md-6">	
					<div className = "alert alert-success" id = "success-alert">
						<strong>Успешно! </strong>
							Данные загружены!
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
                    { tariffs.tv }
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
                    { tariffs.domophone }
                  </td>
                </tr>
                <tr>
                  <th>Содержание дома</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>35,43</td>
                  <td></td>
                  <td>
                    { tariffs.house * 35.43 }
                  </td>
                </tr>
                <tr>
                  <th>Отопление</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>34,5</td>
                  <td></td>
                  <td>
                    { Math.round(tariffs.warm * 34.5) }
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
                    { new_data.hot_water - old_data.hot_water }
                  </td>
                  <td></td>
                  <td>
                    { (new_data.hot_water - old_data.hot_water) * tariffs.hot_water }
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
                    { new_data.cold_water - old_data.cold_water }
                  </td>
                  <td></td>
                  <td>
                    { Math.round((new_data.cold_water - old_data.cold_water) * tariffs.cold_water) }
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
                    { new_data.gas - old_data.gas }
                  </td>
                  <td></td>
                  <td>
                    { (new_data.gas - old_data.gas) * tariffs.gas }
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
                    { new_data.light11 - old_data.light11 }
                  </td>
                  <td></td>
                  <td>
                    { (new_data.light11 - old_data.light11) * tariffs.light1 }                 
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
                    { new_data.light12 - old_data.light12 }
                  </td>
                  <td></td>
                  <td>
                    { (new_data.light12 - old_data.light12) * tariffs.light2 }                 
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
                    $tottaly;
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
