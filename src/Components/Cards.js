import React from 'react'
import {
  Card,
  Image,
  Text,
  Button,
  useMantineTheme,
  Container
} from '@mantine/core'

let mockdata = [
  {
    item: 'Shoes',
    description: "With sparkling fjords lacing its coastline and soaring mountains dotting its interior, Norway could rightfully claim to be one of the world's most beautiful countries. A progressive society, thriving cultural scene, and free camping in most areas make Norway a great place to visit.",
    value: 200,
    maximum: Infinity,
    img_url:
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  }
  // },
  // {
  //   title: "Finland",
  //   sale: true,
  //   description:
  //     "Far up North, there is a place simply so magical that it just makes you fall in love. With it’s pastel skies, snow covered trees, cozy hideouts and adorable furry friends Finnish Lapland invites you to explore the more remote “Do Not Disturb” location",
  //   image:
  //     "https://images.unsplash.com/photo-1586699253884-e199770f63b9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  // },
  // {
  //   title: "Russia",
  //   sale: true,
  //   description:
  //     "Brick walls of Gothic-style buildings in Kaliningrad, rich collections of European Art in the Pushkin Museum or the State Hermitage, old northern cities located on the trade route from the Varangians to the Greeks.",
  //   image:
  //     "https://images.unsplash.com/photo-1514813621023-7a1e3fca8c1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  // }
]

export function CountryCards () {
  const theme = useMantineTheme()

  // {
  //     "item": "Groceries for the week",
  //     "description": "",
  //     "value": 200,
  //     "maximum": "",
  //     "img_url":""
  //   },

  const cards = mockdata.map(country => (
    <Card shadow='sm' key={country.item} style={{ minWidth: 240 }}>
      <Image
        src={country.img_url}
        height={160}
        alt={country.item}
        withPlaceholder
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10
        }}
      >
        <Text weight={500}>{country.item}</Text>
    
      </div>

      <Text size='sm' style={{ minHeight: 140 }}>
        {country.description}
      </Text>
      <br></br>
      <Button text='sell'></Button>
      {country.item}({country.value})
      <Button text='buy' ></Button>
      {/* <Button
        size='sm'
        variant='light'
        color='cyan'
        fullWidth
        style={{ marginTop: 10 }}
      >
        Book tour
      </Button> */}
    </Card>
  ))

  return (
    <div style={{ backgroundColor: theme.colors.gray[0] }}>
      <Container style={{ paddingTop: 40, paddingBottom: 40 }} size='md'>
        {cards}
      </Container>
    </div>
  )
}
