import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import ReactLoading from "react-loading";
import WinnerOutput from "./WinnerOutput";

const surfaces = [
  { value: "Clay", label: "Clay" },
  { value: "Hard", label: "Hard" },
  { value: "Grass", label: "Grass" }
];

export class MatchInput extends Component {
  state = {
    p1: "",
    p2: "",
    surface: "",
    loading: false,
    display: false,
    winner: "",
    winner_conf: "",
    players: [],
  };

  componentDidUpdate() {
    axios
    .get(
      `https://tennis-prediction-api.herokuapp.com/players`
    )
    .then(result =>
        this.setState({
            players: result.data.map(function(ele){return {"value":ele, "label":ele,}})
          })
    );
  }

  handleP1Change = selectedOption => {
    this.setState({ p1: selectedOption.value });
    console.log(`Option selected:`, selectedOption);
  };

  handleP2Change = selectedOption => {
    this.setState({ p2: selectedOption.value });
    console.log(`Option selected:`, selectedOption);
  };

  handleSurfaceChange = selectedOption => {
    this.setState({ surface: selectedOption.value });
    console.log(`Option selected:`, selectedOption);
  };

  handleClick = e => {
    console.log(
      `https://tennis-prediction-api.herokuapp.com/?p1=${this.state.p1}&p2=${this.state.p2}&surface=${this.state.surface}`
    );
    this.setState({ display: true });
    e.preventDefault();
    if (this.state.p1 && this.state.p2 && this.state.surface) {
      console.log("predicting match");
      this.setState({ loading: true }, () => {
        axios
          .get(
            `https://tennis-prediction-api.herokuapp.com/?p1=${this.state.p1}&p2=${this.state.p2}&surface=${this.state.surface}`
          )
          .then(result =>
            this.setState({
              loading: false,
              winner:
                result.data.p1_win_prob > result.data.p2_win_prob
                  ? result.data.p1_name
                  : result.data.p2_name,
              winner_conf: Math.round(
                Math.max(result.data.p1_win_prob, result.data.p2_win_prob) *
                  100,
                2
              )
            })
          );
      });
    } else {
      console.log("invalid input");
    }
  };

  render() {
    return (
      <div className="oof">
        <h3>Player 1 Name:</h3>
        <Select onChange={this.handleP1Change} options={this.state.players} />
        <h3>Player 2 Name:</h3>
        <Select onChange={this.handleP2Change} options={this.state.players} />
        <h3>Surface:</h3>
        <Select onChange={this.handleSurfaceChange} options={surfaces} />
        <p></p>
        <button className="button" onClick={this.handleClick}>
          Predict Match
        </button>

        {this.state.display ? (
          this.state.loading ? (
            <ReactLoading type={"bars"} color={"black"} className= "output"/>
          ) : (
            <WinnerOutput
              className= "output"
              winner={this.state.winner}
              winner_conf={this.state.winner_conf}
            />
          )
        ) : (
          <h1> </h1>
        )}
      </div>
    );
  }
}

export default MatchInput;
