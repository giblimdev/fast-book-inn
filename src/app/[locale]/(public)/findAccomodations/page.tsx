import React from 'react'
import SideNav from '../../appComponents/SideNav'
import FindList from './findList'

function page() {
  return (
    <div className='flex'>
<div><SideNav /></div>
<div><FindList /></div>
    </div>
  )
}

export default page