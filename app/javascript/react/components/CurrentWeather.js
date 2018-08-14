import React from 'react'
import ReactAnimatedWeather from 'react-animated-weather';

const CurrentWeather = props => {

  const iconColor = '#F7E0B1'

  return (
    <div className="sky-con">
      <ReactAnimatedWeather
        icon={props.icon}
        color={iconColor}
        size={100}
        animate={true}
      />
      <div className="columns small-4 small-centered">
        <div className="row wrapper">
          <div className="columns small-6 small-left temp">
            {props.temperature}&deg;F
          </div>
          <div className="columns small-6 small-right weather-summary">
            {props.summary}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather
