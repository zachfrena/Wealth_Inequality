import React, { useState } from 'react'
// import Button from './Button'
import './Item.css'
import {
  Card,
  Image,
  Text,
  Button,
  useMantineTheme,
  Group,
  Container,
  Center
} from '@mantine/core'

function Item (props) {
  const [count, setCount] = useState(0)

  let incrementCount = () => {
    setCount(count + 1)
  }

  let decrementCount = () => {
    setCount(count - 1)
  }

  let incrementClick = val => {
    if (count > 0) {
      props.increment(val)
      decrementCount()
    }
  }

  let decrementClick = val => {
    if(count < props.maximum){
        props.decrement(val)
        incrementCount()
    }

  }

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  var formattedValue=formatter.format(props.value)

  const theme = useMantineTheme()

  return (
    <div className= "card" style={{margin: 'auto' }}>
      <Card shadow='sm' padding='lg' style={{background:'#faf5f5'}}>
        <Card.Section>
          <Image src={props.img_url} height={160} alt='Norway' />
        </Card.Section>

        <Group
          position='center'
          style={{ marginBottom: 5, minHeight: 62 }}
        >
          <Text size='xl' weight={700}>{props.item}</Text>
        </Group>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text size='sm' style={{ lineHeight: 1.5, minHeight: 42}}>
            {props.description}
          </Text>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text size='lg' weight={500} style={{color: 'green', lineHeight: 2.5 }}>
                {formattedValue}
          </Text>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Button
            
            color={(count>0?'red':'gray')}
            onClick={() => incrementClick(props.value)}
            style={{
              width: 120,
              marginRight: 10,
              marginLeft: 10
            }}
          >
            Sell
          </Button>
          <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 5,
            border: '1px solid'
          }}
        >
          <Text size='lg' style={{ lineHeight: 1.5 }} >
           {count}
          </Text>
        </div>
          <Button
            color='green'
            onClick={() => decrementClick(props.value)}
            style={{
              width: 120,
              marginRight: 10,
              marginLeft: 10
            }}
          >
            Buy
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Item
