import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    data: {
      old_data: {
                  tv: '123',
                  house: '245',
                  domophone: '345',
                  hot_water: '456',
                  cold_water: '567',
                  gas: '678',
                  light1: '789',
                  light2: '890',
                  warm: '901',
      },
      new_data: {
                  tv: '123',
                  house: '245',
                  domophone: '345',
                  hot_water: '456',
                  cold_water: '567',
                  gas: '678',
                  light1: '789',
                  light2: '890',
                  warm: '901',
      },
      tariffs: {
                  tv: 123,
                  house: 245,
                  domophone: 345,
                  hot_water: 456,
                  cold_water: 567,
                  stocks: 123,
                  gas: 678,
                  light1: 789,
                  light2: 890,
                  warm: 901,
      },        
    },
    isDataFetching: false,
  }

  render() {
    const { data, isDataFetching } = this.state;
    return (
      <div class="container">
				<div class="row">
					<div class="col-md-6">	
						<div class="alert alert-success" id="success-alert">
							<strong>Успешно! </strong>
							Данные загружены!
						</div>	
						<form id="form" action="">										
							<div id="options" class="pull-right">
								<select name="years" class="years selectpicker">
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                </select>
								<select name="months" class="months selectpicker">
									<option value="1">январь</option>
									<option value="2">февраль</option>
									<option value="3">март</option>
									<option value="4">апрель</option>
									<option value="5">май</option>
									<option value="6">июнь</option>
									<option value="7">июль</option>
									<option value="8">август</option>
									<option value="9">сентябрь</option>
									<option value="10">октябрь</option>
									<option value="11">ноябрь</option>
									<option value="12">декабрь</option>
								</select>			
							</div>	
								
							<table class="table table-striped">
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
                  <th>Кабельное</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    итог
                  </td>
                </tr>
                <tr>
                  <th>Содержание дома</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>35.43</td>
                  <td></td>
                  <td>
                    итог
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
                    итог
                  </td>
                </tr>
								<tr>
                  <th>  
                    <a href="http://teploseti.zp.ua/ru/abonent/" target="_blank">Горячая вода</a>
                  </th>
                  <td>
                    {data.old_data.hot_water}
                  </td>
                  <td>-</td>
                  <td class="has-success">
                    <input type="text" pattern="^[ 0-9]+$" name="hot" class="form-control" value={data.new_data.hot_water}/>
                  </td>
                  <td>
                  diff
                  </td>
                  <td></td>
                  <td>
                    расчет по показаниям
                  </td>
                </tr>	
                <tr>
								  <th><a href="http://www.vodokanal.zp.ua/entry" target="_blank">Холодная вода</a></th>
                  <td>
                    {data.old_data.cold_water}
                  </td>
									<td>-</td>
									<td class="has-success"><input type="text" pattern="^[ 0-9]+$" name="cold" class="form-control" value={data.new_data.cold_water}/></td>
									<td>
                    diff
									</td>
									<td></td>
									<td>
									  расчет по показаниям
									</td>
								</tr>
								<tr>
                  <th><a href="https://104.ua/ua/cabinet/info" target="_blank">Газ</a></th>
                  <td>{data.old_data.gas}</td>
                  <td>-</td>
                  <td class="has-success"><input type="text" pattern="^[ 0-9]+$" name="gas" class="form-control" value={data.new_data.gas}/></td>
                  <td>
                    diff
                  </td>
                  <td></td>
									<td>
                    расчет по показаниям
									</td>
								</tr>	
								<tr>
                  <th><a href="http://www.zoe.com.ua/pokazania.php" target="_blank">Свет T11</a></th>
                  <td>{data.old_data.light1}</td>
                  <td>-</td>
                  <td class="has-success"><input type="text" pattern="^[ 0-9]+$" name="light" class="form-control" value={data.new_data.light1}/></td>
                  <td>
									  diff
									</td>
									<td></td>
									<td>
									  расчет по показаниям
									</td>
								</tr>
                <tr>
                  <th><a href="http://www.zoe.com.ua/pokazania.php" target="_blank">Свет T12</a></th>
                  <td>{data.old_data.light2}</td>
                  <td>-</td>
                  <td class="has-success"><input type="text" pattern="^[ 0-9]+$" name="light" class="form-control" value={data.old_data.light2}/></td>
                  <td>
									  diff
									</td>
									<td></td>
									<td>
									  расчет по показаниям
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
                    расчет по показаниям
									</td>
								</tr>	
								<tr class="success">
									<th>ИТОГО</th>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<th>
                    tottaly
									</th>
								</tr>	
                </tbody>							
							</table>	
							<input type="submit" class="btn btn-success btn-lg btn-block" value="Сохранить показания"/>								
						</form>	
					</div>
					<div class="col-md-4">
						<form id="tariffs" action="#">
							<table class="table table-striped" >
              <tbody>
								<tr>
									<td>Содержание дома</td>
									<td class="has-success"><input type="text" pattern="[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)" name="serv_house" class="form-control" value={data.tariffs.house}/></td>
								</tr>
                <tr>
                  <td>Домофон</td>
                  <td class="has-success"><input type="text" pattern="[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)" name="domophone" class="form-control" value={data.tariffs.domophone}/></td>
                </tr>
                <tr>
                  <td>Кабельное</td>
                  <td class="has-success"><input type="text" pattern="[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)" name="tv" class="form-control" value={data.tariffs.tv}/></td>
                </tr>
                <tr>
                  <td>Холодная вода</td>
                  <td class="has-success"><input type="text" pattern="[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)" name="cold_tariff" class="form-control" value={data.tariffs.cold_water}/></td>
                </tr>	
                <tr>
                  <td>Горячая вода</td>
                  <td class="has-success"><input type="text" pattern="[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)" name="hot_tariff" class="form-control" value={data.tariffs.hot_water}/></td>
                </tr>
                <tr>
                  <td>Стоки</td>
                  <td class="has-success"><input type="text" pattern="[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)" name="stock_tariff" class="form-control" value={data.tariffs.stocks}/></td>
                </tr>
                <tr>
                  <td>Газ</td>
                  <td class="has-success"><input type="text" pattern="[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)" name="gas_tariff" class="form-control" value={data.tariffs.gas}/></td>
                </tr>
                <tr>
                  <td>Свет &lt; 100</td>
                  <td class="has-success"><input type="text" pattern="[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)" name="light_tariff" class="form-control" value={data.tariffs.light1}/></td>
                </tr>
                <tr>
                  <td>Свет &gt; 100</td>
                  <td class="has-success"><input type="text" pattern="[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)" name="light_over_tariff" class="form-control" value={data.tariffs.light2}/></td>
                </tr>
                <tr>
                  <td>Отопление</td>
                  <td class="has-success"><input type="text" pattern="[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)" name="warm_tariff" class="form-control" value={data.tariffs.warm}/></td>
                </tr>
                </tbody>
							</table>
							<input id="tariff" type="submit" class="btn btn-success btn-lg btn-block" value="Сохранить тарифы"/>
						</form>
					</div>
				</div>
			</div>
    );
  }
}

export default App;
