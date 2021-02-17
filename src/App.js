import React, { Component } from 'react'
import './App.css'

import Header from './components/Header'
import Admin from './components/Admin'
import Card from './components/Card'
import recettes from './recettes'

// firebase
import base from './base'


class App extends Component {
  state = {
    pseudo: this.props.match.params.pseudo,
    recettes: {} // on initialise l'objet "recettes", dans le state l'objet est vide
  }

componentDidMount() { // on connecte le state avec firebase
  this.ref = base.syncState(`/${this.state.pseudo}/recettes`, {
    context: this,
    state: 'recettes'
  })
}

componentWillUnmount() {
  base.removeBinding(this.ref) // termine la synchronisation entre le state et firebase
}

chargerExemple = () => this.setState({ recettes }); // rempli l'objet "recettes" 

ajouterRecette = recette => {
  const recettes = { ...this.state.recettes}
  recettes[`recettes-${Date.now()}`] = recette
  this.setState({ recettes })
}

majRecette = (key, newRecette) => {
  const recettes = { ...this.state.recettes}
  recettes[key] = newRecette
  this.setState({ recettes })
}

supprimerRecette = key => {
  const recettes = { ...this.state.recettes}
  recettes[key] = null
  this.setState({ recettes })
}

  render () {
    const cards = Object.keys(this.state.recettes)
      .map(key => <Card 
                    details={this.state.recettes[key]} 
                    key={key}/>) 
    return (
      
      <div className='box'>
        <Header pseudo={this.state.pseudo}></Header>
        <div className='cards'>
          {cards}
        </div>
        <Admin
          recettes={this.state.recettes}
          ajouterRecette={this.ajouterRecette}
          majRecette={this.majRecette}
          supprimerRecette={this.supprimerRecette}
          chargerExemple={this.chargerExemple}
          />
      </div>
    )
  }
}

export default App
