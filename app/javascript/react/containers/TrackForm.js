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
         categories: body.categories
       })
     )
     .catch(error => console.error(`Error in fetch: ${error.message}`));
 }

 render() {
   const categoryCheckBoxes = this.state.categories.map(category => {
     return (
       <div key={category.id} className="columns small-3">
         <label className="container">
           {category.name}
           <input
             type="checkbox"
             onChange={() => this.props.handleInputChange(category.id)}
           />
           <div className="checkmark"></div>
         </label>
       </div>
      );
   })

   return (
     <form onSubmit={this.props.handleSubmit}>
       <div className="track-from">
         <img className="form-album-cover" src={this.props.albumCover} alt="album cover"/>
         <h3>{this.props.title}</h3>
         <p>{this.props.artists} - {this.props.album}</p>
         <p>
            <i className="far fa-clock"></i>
            {`  ${this.props.duration}`}
         </p>
       </div>
       <div className="row">
       <div className="columns small-12 medium-8 small-centered">
        <div className="row">
          {categoryCheckBoxes}
        </div>
       </div>
       </div>
       <button type="submit" value="Submit" className="form-save">Save</button>
     </form>
   )

 }
}

export default TrackForm
