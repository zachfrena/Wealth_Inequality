import React, { useState, useEffect } from 'react'
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
  Center,
  TextInput,
  Notification
} from '@mantine/core'
import { keyboard } from '@testing-library/user-event/dist/keyboard'

function Item (props) {
  const [count, setCount] = useState(0)
  const [oldCount, setOldCount] = useState(0)
  const [lock, setLock] = useState(false)

  let incrementCount = () => {
    setCount(count + 1)
    setOldCount(count)
  }

  let decrementCount = () => {
    setCount(count - 1)
    setOldCount(count)
  }

  let incrementClick = val => {
    if (lock) {
      return
    } else {
      if (count > 0) {
        props.increment(val)
        decrementCount()
      }
      setOldCount(count)
    }
  }

  let decrementClick = val => {
    if (lock) {
      return
    } else {
      if (count < props.maximum) {
        props.decrement(val)
        incrementCount()
      }
      setOldCount(count)
    }
  }

  let updateCount = val => {
    if (val <= props.maximum) {
      if (Math.abs(oldCount - count) == 1) {
        setOldCount(count)
      }
      setCount(val)
    }
    setLock(true)
  }

  let inputUpdate = () => {
    setLock(false)
    let steps = count - oldCount
    console.log(steps)
    if (steps > 0) {
      for (var i = 0; i < steps - 1; i++) {
        props.decrement(props.value * (count - oldCount))
        console.log('inside p')
      }
    } else if(steps<0) {
      for (var i = 0; i < -steps; i++) {
        props.increment(props.value * (oldCount - count))
        console.log('inside n')
      }
    }
    setOldCount(count)
  }

  useEffect(() => {
    console.log('useEffect count: ' + count)
    console.log('useEffect oldCount: ' + oldCount)
    console.log(props.value)
  })

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
  })

  var formattedValue = formatter.format(props.value)

  const theme = useMantineTheme()

  return (
    <div className='card' style={{ margin: 'auto' }}>
      <Card shadow='sm' padding='lg' style={{ background: '#faf5f5' }}>
        <Card.Section>
          <Image src={props.img_url} height={160} alt='Norway' />
        </Card.Section>

        <Group position='center' style={{ marginBottom: 0, minHeight: 42 }}>
          <Text size='xl' weight={700}>
            {props.item}
          </Text>
        </Group>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text size='sm' style={{ lineHeight: 1.5, minHeight: 42 }}>
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
          <Text
            size='lg'
            weight={500}
            style={{ color: 'green', lineHeight: 1.5 }}
          >
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
          disabled={lock?true:false}
            color={count > 0 ? 'red' : 'gray'}
            onClick={() => incrementClick(props.value)}
            style={{
              width: 120,
              marginRight: 5,
              marginLeft: 0
            }}
          >
            Sell
          </Button>
          {/* <div
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
            <Text size='lg' style={{ lineHeight: 1.5 }}>
              {count}
            </Text>
          </div> */}
          <TextInput
          
            type='text'
            value={count}
            onChange={event => updateCount(parseInt(event.currentTarget.value))}
          />
          <Button
          className='updateButton'
            color='dark'
            onClick={() => inputUpdate()}
          >Set</Button>
          <Button
          disabled={lock?true:false}
            color='green'
            onClick={() => decrementClick(props.value)}
            style={{
              width: 120,
              marginRight: 0,
              marginLeft: 5
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
