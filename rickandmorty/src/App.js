import React from "react";
// import logo from './logo.svg';
import "./App.css";
import api from "./lib/api";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActivo: false,
      character: [],
      personajeSeleccionado: {}
    };
  }

  activarModal(id) {
    console.log(id, "desactivarmodal")
    api.getCharacterById(id)
    .then(p => {this.setState({
      modalActivo: true,
      personajeSeleccionado: p
    })
  })
  }

  desactivarModal() {
    this.setState({
      modalActivo: false
    });
  }

  componentDidMount() {
    api.getAllChars().then(results => {
      this.setState({
        character: results
      })
    })
    .catch(e => console.error(e));
  }

  renderCards(p) {
    return (
      <div key={p.id} className="Card" onClick={e => this.activarModal(p.id)}>
        <div className="Card-imagen">
          <figure>
            <img alt="test" src={p.image} />
          </figure>
        </div>
        <div className="Card-descripcion">
          <div className="Card-name">
            <h3>{p.name}</h3>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { modalActivo, character} = this.state;
    const cards = character.map(p => this.renderCards(p));
    console.log(this.state.personajeSeleccionado);
    return (
      <div className="App">
        <div className="App-contenedor">
          <h1>Rick and Morty</h1>
          <div className="Cards-contenedor">{cards}</div>
          {modalActivo ? (
            <div className="Modal" onClick={e => this.desactivarModal()}>
              <div className="Card-detalle">
                <div className="Card-imagen">
                  <figure>
                    <img
                      alt="test"
                      src={this.state.personajeSeleccionado.image}
                    />
                  </figure>
                </div>
                <div className="Card-detalle-descripcion">
                  <div className="descripcion">
                    <div className="descripcion-valor">
                      <h3>{this.state.personajeSeleccionado.name}</h3>
                      <div className="caracteristica">
                        <p>Status</p>
                        <p className="caracteristica-valor">
                        {this.state.personajeSeleccionado.status}
                        </p>
                      </div>
                      <div className="caracteristica">
                        <p>Especie</p>
                        <p className="caracteristica-valor">
                        {this.state.personajeSeleccionado.species}
                        </p>
                      </div>
                      <div className="caracteristica">
                        <p>Genero</p>
                        <p className="caracteristica-valor">
                        {this.state.personajeSeleccionado.gender}
                        </p>
                      </div>
                      <div className="caracteristica">
                        <p>Origen</p>
                        <p className="caracteristica-valor">
                        {this.state.personajeSeleccionado.origin.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
