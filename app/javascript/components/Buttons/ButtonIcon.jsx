
import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

const ButtonIcon = (props) => (
  <Button className="button" floated='right'
    onClick={props.onClick}
    color={props.btncolor}>
    <Icon className="icon"
      name={props.icontype}
    />
  </Button>
)

export default ButtonIcon