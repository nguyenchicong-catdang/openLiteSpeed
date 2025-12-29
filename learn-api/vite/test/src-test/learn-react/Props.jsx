import React from 'react'
import Car from './Car'

export default function Props() {
  return (
      <div>
          <h1>My 2 children</h1>
          <Son>
              <p>This is son</p>
          </Son>
          <Daughter>
              <p>This is Daughter</p>
          </Daughter>
    </div>
  )
}

function Son(props) {
    return (
        <>
        <h2>Son</h2>
            <div>{ props.children}</div>
        </>
    )
}

function Daughter(props) {
    return(
        <>
            <h2>Daughter</h2>
            <div>{ props.children}</div>
        </>
    )
}
