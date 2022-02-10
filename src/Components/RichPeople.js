import React, { useEffect, useState } from 'react'
import { Select } from '@mantine/core'
import axios from 'axios'
import { Text, Group, Grid } from '@mantine/core'

function RichPeople () {
  const url = 'https://forbes400.herokuapp.com/api/forbes400?limit=10'
  const [billionaires, setBillionaires] = useState(null)
  const [worth, setWorth] = useState(null);
  
  function updateWorth(event){
    setWorth(event.worth)
    console.log(event.worth)
    console.log(worth)
}
console.log('worth:', worth)

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
  })

var formattedTotal = formatter.format(worth*1000000)
var remainingPercentage = ((worth / 200000000000) * 100).toFixed(3)

  useEffect(() => {
    axios.get(url).then(response => {
      setBillionaires(response.data)
    })
  }, [])

  if (billionaires) {
      console.log("inside")
    

    let menuData = billionaires.map(people => {
        let container = {};
        container['value']=people.person.name;
        container['label']=`${people.rank}: ${people.person.name}-- net worth: ${formatter.format(people.finalWorth*1000000)} (~${formatter.format(people.finalWorth/1000)} billion USD)`;
        container['worth']=people.finalWorth;
        return container
      })
    return (
      <div>
        <Select
          label='Pick your billionaire'
          placeholder='Pick one'
          data={menuData}
          onChange={(val) => updateWorth(menuData.find(item => item.value === val))}
          />
          <Text
          weight={700}
          style={{
            fontSize: '40px'
          }}
        >
          Total Balance: {formattedTotal}
        </Text>
        <Text
          weight={700}
          style={{
            fontSize: '20px'
          }}
        >
          Percentage of Wealth Remaining: {remainingPercentage}%
        </Text>
      </div>
    )
  }
  return <div></div>
}

export default RichPeople
