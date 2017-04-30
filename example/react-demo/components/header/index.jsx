import React from 'react'
import './style.styl'

export default ({onBack, name}) => (
  <div className="mod-header uf">
    <div className="part-left tap-active" onClick={onBack}>
    </div>
    <div className="part-center uf-f1 uf uf-center">{name}</div>
    <div className="part-right"></div>
  </div>
)
