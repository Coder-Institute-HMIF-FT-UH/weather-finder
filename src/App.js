import React from "react";
import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";
import axios from "axios";
import Footer from "./components/Footer"

const API_KEY = "f36fbd3f27a1478489cabfae7fe1b812";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
  };

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`).then((res) => {
        if (city && country) {
          this.setState({
            temperature: res.data.main.temp,
            city: res.data.name,
            country: res.data.sys.country,
            humidity: res.data.main.humidity,
            description: res.data.weather[0].description,
            error: "",
          });
        } else {
          alert('error')
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
        this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: "Data Not Found",
        });
      });
  };
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="row">
              <div className="col-xs-5 title-container">
                <Title />
              </div>
              <div className="col-xs-7 form-container">
                <Form getWeather={this.getWeather} />
                <Weather
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                />
              </div>
            </div>
            <Footer/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
