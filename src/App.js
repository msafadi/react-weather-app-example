import { Component } from 'react';
import './App.css';
import Search from './Search';
import WeatherCard from './WeatherCard';
import WeatherForecast from './WeatherForecast';

class App extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      city: "London"
    }

    //this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({
      city: document.querySelector('form [name=city]').value
    })
  }

  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="col-md-12">
            <Search handleSearch={this.handleSearch.bind(this)} />
          </div>
          <div className="col-md-6">
            <WeatherCard />
          </div>
          <div className="col-md-6">
            <WeatherCard city={this.state.city} />
          </div>
        </div>
        <hr />
        <div>
          <WeatherForecast city={this.state.city} />
        </div>
      </div>
    );
  }
}

export default App;
