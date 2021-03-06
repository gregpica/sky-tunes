import React from 'react'

const TrackIndexTile = props => {

  let editDiv
  let hideForEdit = "";

  if (props.editMode) {
    hideForEdit = "hidden";

    const checkBoxDiv = props.allCategories.map(category => {
        return (
          <div key={category.id} className="columns small-3">
            <label className="container edit-checkbox">
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

    editDiv = <form className="edit-form" onSubmit={props.handleSubmit}>
      <i className="fas fa-times edit-x" onClick={props.cancelEdit}></i>
      <div className="row">
        <div className="columns small-12 medium-8 small-centered">
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
            <label className="container edit-checkbox">
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
      <div className="columns small-12 medium-8 small-centered">
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
        <span className="small-4 medium-3 columns">{props.artists}</span>
        <span className="small-0 medium-2 columns hide-mobile">{props.album}</span>
        <span className="small-0 medium-1 columns hide-mobile">{props.duration}</span>
        <i className={`${props.dropDownIcon} small-1 columns`} onClick={props.dropDownTrack}></i>
      </span>
      <div className={props.hidden}>
        <span className="small-12 columns wrapper">
          {editDiv}
          <div className={`small-8 medium-6 large-4 columns small-centered ${hideForEdit}`}>
            <div className="row">
              <button className="small-6 columns edit-delete" onClick={props.handleEditClick}>Edit</button>
              <button className="small-6 columns edit-delete" onClick={props.handleDelete}>Delete</button>
            </div>
          </div>
        </span>
      </div>
    </div>
  )
}

export default TrackIndexTile
