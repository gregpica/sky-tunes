import React from 'react'

const TrackIndexTile = props => {
  let editDiv;
  let hideForEdit = "";

  if (props.editMode) {
    hideForEdit = "hidden";

    const checkBoxDiv = props.allCategories.map(category => {
        return (
          <div key={category.id} className="columns small-3">
            <label className="container">
              {category.name}
              <input
                type="checkbox"
                checked={props.trackCategories.includes(category.id)}
                onChange={() => props.handleInputChange(category.id)}
              />
              <div className="checkmark"></div>
            </label>
          </div>
         );
      })

    editDiv = <form onSubmit={props.handleSubmit}>
      <br></br>
      <div className="row">
        <div className="columns small-8 small-centered">
           <div className="row">
             {checkBoxDiv}
           </div>
        </div>
      </div>
      <div className="row text-center">
        <button type="submit" value="Submit" className="form-save">Save</button>
      </div>
    </form>

  } else {
    const checkBoxDiv = props.allCategories.map(category => {
        return (
          <div key={category.id} className="columns small-3">
            <label className="container">
              {category.name}
              <input
                type="checkbox"
                checked={props.trackCategories.includes(category.id)}
                readOnly={true}
              />
              <div className="checkmark"></div>
            </label>
          </div>
         );
      })
    editDiv = <div className="row">
      <div className="columns small-8 small-centered">
         <div className="row">
           {checkBoxDiv}
         </div>
      </div>
    </div>
  }

  return (
    <div className="index-tile">
      <span className="small-12 columns wrapper">
        <img className="small-1 columns" src={props.albumCover} alt="album cover" />
        <span className="small-4 columns">{props.title}</span>
        <span className="small-3 columns">{props.artists}</span>
        <span className="small-2 columns">{props.album}</span>
        <span className="small-1 columns">{props.duration}</span>
        <i className={`${props.dropDownIcon} small-1 columns`} onClick={props.dropDownTrack}></i>
      </span>
      <div className={props.hidden}>
        <span className="small-12 columns wrapper">
          {editDiv}
          <div className={`row text-center edit-delete-wrapper ${hideForEdit}`}>
            <button className="small-2 columns edit-delete" onClick={props.handleEditClick}>Edit</button>
            <button className="small-2 columns edit-delete" onClick={props.handleDelete}>Delete</button>
          </div>
        </span>
      </div>
    </div>
  )
}

export default TrackIndexTile
