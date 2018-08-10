import React from 'react';
import categoryClient from '../clients/category';

class TrackForm extends React.Component {
 constructor(props) {
   super(props)
   this.state = {
     categories: [],
     selectedCategories: []
   };

   this.handleInputChange = this.handleInputChange.bind(this);
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

 handleInputChange({ target: { id } }) {
   const { selectedCategories } = this.state;

   if(selectedCategories.includes(id)) {
     this.setState({
       selectedCategories: selectedCategories.filter(categoryId => categoryId !== id)
     })
   } else {
     selectedCategories.push(id)
     this.setState({
       selectedCategories: selectedCategories
     })
   }
 }

 render() {
   const categoryCheckBoxes = this.state.categories.map(category => {
                                 return  <label key={category.id}>
                                           {category.name}
                                           <input
                                             id={category.id}
                                             type="checkbox"
                                             onChange={this.handleInputChange}
                                           />
                                          </label>
                               })

   return (
     <form onSubmit={this.props.handleSubmit}>
       <h1>Add new Track</h1>
       <div>
         <p>Title: {this.props.title}</p>
         <p>Artist: {this.props.artists}</p>
         <p>Album: {this.props.album}</p>
         <p>Duration: {this.props.duration}</p>
         <img src={this.props.albumCover} alt="album cover"/>
       </div>
       {categoryCheckBoxes}
       <button type="submit" value="Submit">Save</button>
     </form>
   )

 }
}

export default TrackForm
