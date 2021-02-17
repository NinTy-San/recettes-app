import React from 'react';

const AdminForm = ({
    id: key,
    majRecette,
    supprimerRecette,
    recettes
}) => {
 
    const recette = recettes[key]

    const handleChange = (event, key) => {
        const { name, value } = event.target //on recupère l'element ciblé et sa valeur par l'attribut "name"  
        const recette = recettes[key] // on copie la recette par sa "key"
        recette[name] = value  // on recupère la valeur de l'input 
        majRecette(key, recette) // on met a jour le state via la fonction "majReccette"
    }

    return ( 
        <div className="card">
            <form className="admin-form">

                <input value={recette.nom} onChange={e => handleChange(e, key)}  type="text" name="nom" placeholder="Nom de la recette" />
                
                <input value={recette.image} onChange={e => handleChange(e, key)} type="text" name="image" placeholder="Chemin de l'image" />
                
                <textarea value={recette.ingredients} onChange={e => handleChange(e, key)} name="ingredients" rows="3" placeholder="Liste des ingrédients" ></textarea>
                
                <textarea value={recette.instructions} onChange={e => handleChange(e, key)} name="instructions" rows="15" placeholder="Liste des instructions" ></textarea>
           
            </form>
            <button onClick={() => supprimerRecette(key)}>Supprimer</button>
        </div>
    )
}
 
export default AdminForm;