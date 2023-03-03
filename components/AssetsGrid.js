import React from 'react'
import GridElement from './GridElement'

function AssetsGrid() {
  return (
    <div className='mt-20 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-8 '>
        <GridElement title="Main Account" amount="0.00" subAmount="0.00" color="border-t-green-300"/>
        <GridElement title="Trading Account" amount="0.00" subAmount="0.00" color="border-t-blue-300" />
        <GridElement title="Futures Account" amount="0.00" subAmount="0.00" color="border-t-gray-400" />
        <GridElement title="Trading Bot Account" amount="0.00" subAmount="0.00" color="border-t-blue-300" />
        <GridElement title="Financial Account" amount="0.00" subAmount="0.00" color="border-t-gray-400" />
    </div>
  )
}

export default AssetsGrid