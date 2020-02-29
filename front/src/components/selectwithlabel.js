import React  from 'react'
import Select from 'react-select'

import Typography  from '@material-ui/core/Typography';

export default function SelectWithLabel({options, label, onChange}) {
  return (
    <div style={{display: 'flex', alignItems: 'center', margin: '16px 0'}}>

      <div style={{width: '30%'}}>
        <Typography variant={'body2'}>{label}:</Typography>
      </div>
      <div style={{width: '70%'}}>
        <Select options={options} onChange={onChange} placeholder={''}/>
      </div>

    </div>
  )
};
