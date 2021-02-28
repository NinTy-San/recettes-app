import React, { Component } from 'react'
import AjouterRecette from './AjouterRecette'
import AdminForm from './AdminForm'
import Login from './Login'

import firebase from 'firebase/app'
import 'firebase/auth'
import base, {firebaseApp} from '../base'

class Admin extends Component {
    state = {
        uid: null, // l'id de la personne connecté
        chef:null // chef = id du propriétaire de la page recette
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user){
                this.handleAuth({ user })
            }
        })
    }

    handleAuth = async authData => {
        const box = await base.fetch(this.props.pseudo, { context: this })
        if (!box.chef) {
            await base.post(`${this.props.pseudo}/chef`,{
                data: authData.user.uid
            })
        }

        this.setState({
            uid: authData.user.uid,
            chef: box.chef || authData.user.uid
        })
    } 

    authenticate = () => {
        const authProvider = new firebase.auth.GoogleAuthProvider()
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.handleAuth)
    }

    logout = async () => {
        await firebase.auth().signOut()
        this.setState({ uid: null })
    }

    render() {
        const { recettes, ajouterRecette, majRecette, supprimerRecette, chargerExemple } = this.props

        const logout = <button onClick={this.logout}>Déconnexion</button>

        //si l'utilisateur n'est pas connecté 
        if (!this.state.uid){
            return <Login authenticate={this.authenticate} />
        }

        // si l'utilisateur connécté est sur une page qui ne lui appartient pas 
        if (this.state.uid !== this.state.chef){
            return <div>
                <p>tu n'es pas le chef de cette boîte</p>
                {logout}
            </div>
        }

        return (
        <div className="cards">
            <AjouterRecette ajouterRecette={ajouterRecette} />
            {
                Object.keys(recettes)
                  .map(key => <AdminForm 
                    key={key}
                    id={key}
                    majRecette = {majRecette}
                    supprimerRecette = {supprimerRecette}
                    recettes = {recettes} />)
            }
            <footer>
                {logout}
                <button onClick={chargerExemple}>Remplir</button>
            </footer>  
        </div> 
        )   
    }
}
 
export default Admin;