import React from 'react';
import categoryClient from '../clients/category';

class TrackForm extends React.Component {
 constructor(props) {
   super(props)
   this.state = {
     categories: []
   };
 }

 componentDidMount() {
   categoryClient.get()
     .then(response => response.json())
     .then(body =>
       this.setState({
         categories: body
       })
     )
     .catch(error => console.error(`Error in fetch: ${error.message}`));
 }

 render() {
   const categoryCheckBoxes = this.state.categories.map(category => {
     return (
       <label key={category.id}>
         {category.name}
         <input
           type="checkbox"
           onChange={() => this.props.handleInputChange(category.id)}
         />
       </label>
      );
   })

   return (
     <form onSubmit={this.props.handleSubmit}>
       <div>
         <img src={this.props.albumCover} alt="album cover"/>
         <h3>{this.props.title}</h3>
         <p>{this.props.artists}</p>
         <p>Album: {this.props.album}</p>
         <p>Duration: {this.props.duration}</p>
       </div>
       {categoryCheckBoxes}
       <button type="submit" value="Submit">Save</button>
     </form>
   )

 }
}

export default TrackForm
