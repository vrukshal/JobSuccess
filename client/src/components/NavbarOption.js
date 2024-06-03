import React from 'react'

function NavbarOption(props) {
  return (
    <a className={props.class} href={props.href} > 
        {props.text}
    </a>
  )
}

export default NavbarOption
