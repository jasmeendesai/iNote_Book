import React from 'react'

function Alert(props) {
  const capta=(word)=>{
    if(word==='danger'){
      word = 'error'
    }
    return word[0].toUpperCase()+word.slice(1)
}
return (
<div style={{height:'50px'}}>
{props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
    <strong>{capta(props.alert.type)}</strong> : {props.alert.msg}
    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>}
</div>
)
}

export default Alert
