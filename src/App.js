import React, { useEffect, useState } from 'react'
import Item from './Components/Item'
import './App.css'
import ItemData from './ItemData.json'
import RichPeople from './Components/RichPeople'
import { Text, Group, Grid } from '@mantine/core'
import { Image, Select, Button, Collapse } from '@mantine/core'
import axios from 'axios'

function App () {
  const [total, setTotal] = useState(0)
  const [originalTotal, setOriginalTotal] = useState(0)
  const url = 'https://forbes400.herokuapp.com/api/forbes400?limit=10'
  const [billionaires, setBillionaires] = useState(null)
  const [image, setImage] = useState('images/mystery.JPG')
  const [bio1, setBio1] = useState('')
  const [bio2, setBio2] = useState('')
  const [bio3, setBio3] = useState('')
  const [opened, setOpen] = useState(false)
  let titles = ItemData

  function updateWorth (event) {
    console.log(event)
    setTotal(event.worth * 1000000)
    setOriginalTotal(event.worth * 1000000)
    setImage(event.image)
    setBio1(event.bio1)
    setBio2(event.bio2)
    setBio3(event.bio3)
  }

  let updateTotal = val => {
    setTotal(total + val)
  }

  let incrementTotal = val => {
    setTotal(total + val)
  }

  let decrementTotal = val => {
    setTotal(total - val)
  }

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
  })

  useEffect(() => {
    axios.get(url).then(response => {
      setBillionaires(response.data)
    })
  }, [])

  var formattedTotal = formatter.format(total)
  var formattedTotalSpent = formatter.format(originalTotal - total)
  var remainingPercentage = originalTotal
    ? ((total / originalTotal) * 100).toFixed(3)
    : 0

  let nf = new Intl.NumberFormat('en-US')
  var medianHouseHolds = nf.format(((originalTotal - total) / 68000).toFixed(1))
  var medianLifeTimeEarnings = nf.format(
    ((originalTotal - total) / 1700000).toFixed(1)
  )
  var MadagascarGDP = nf.format(
    ((originalTotal - total) / 13720000000).toFixed(1)
  )
  var annualSalaries = nf.format(((originalTotal - total) / 49764).toFixed(1))
  var elonMuskHours = nf.format(((originalTotal - total) / 32400000).toFixed(1))

  if (billionaires) {
    console.log(billionaires)

    let menuData = billionaires.map(people => {
      let container = {}
      container['value'] = people.person.name
      container['label'] = `${people.rank}: ${
        people.person.name
      }-- net worth: ${formatter.format(
        people.finalWorth * 1000000
      )} (~${formatter.format(people.finalWorth / 1000)} billion USD)`
      container['worth'] = people.finalWorth
      container['image'] = people.person.squareImage
      container['bio1'] = people.bios[0]
      container['bio2'] = people.bios[1]
      container['bio3'] = people.bios[2]
      return container
    })

    return (
      <div style={{ background: '#b0b0b0', padding: 20 }}>
        <div
          className='title'
          style={{
            color: 'white',
            background: '#004563',
            padding: 10,
            paddingTop: 30,
            marginBottom: -5
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              rowGap: '40px'
            }}
          >
            <p style={{ fontSize: '24px', width: '85%', textAlign: 'start' }}>
              We've all heard the phrase{' '}
              <span style={{ fontStyle: 'italic' }}>"the rich get richer"</span>
              , but that's not the end of the story-- more and more wealth is
              winding up in the hands of a{' '}
              <span style={{ fontWeight: 'bolder', fontStyle: 'italic' }}>
                shockingly tiny{' '}
              </span>{' '}
              number of people. <br></br>
              <br></br>At the time of writing,{' '}
              <span style={{ fontWeight: 'bolder', color: '#fcd73f' }}>
                the poorest half (55%) of the global population (~4.5 billion
                people) barely owns any wealth at all, possessing just 1.3% of
                the world's total.
              </span>{' '}
              In contrast,{' '}
              <span style={{ fontWeight: 'bolder', color: '#fcd73f' }}>
                the richest 10% of the global population own 76% of all wealth.
              </span>{' '}
              Included in that top 10% are the{' '}
              <span style={{ fontWeight: 'bolder', color: '#fcd73f' }}>
                top 1%, who collectively own 55% of the world's total wealth.{' '}
              </span>
              After Billionaire wealth soared globally in early 2021,{' '}
              <span style={{ fontWeight: 'bolder', color: '#fcd73f' }}>
                the top 0.1% had an 11% share of the world's total wealth.
              </span>
              <sup>
                <a
                  style={{ color: '#8fa9ff', textDecoration: 'none' }}
                  href='https://wir2022.wid.world/'
                >
                  [1]
                </a>{' '}
                <a
                  style={{ color: '#8fa9ff', textDecoration: 'none' }}
                  href='https://www.credit-suisse.com/about-us-news/en/articles/news-and-expertise/global-wealth-report-2021-effects-of-covid-on-household-wealth-in-2020-202106.html'
                >
                  [2]
                </a>{' '}
              </sup>
              <br></br>
              <br></br>
              At this point, it's pretty clear that the majority of the wealth
              is concentrated to those at the very top, percentage-wise.
              However, not many people truly understand{' '}
              <a
                style={{
                  fontWeight: 'bolder',
                  color: '#8fa9ff',
                  textDecoration: 'underline'
                }}
                href='https://mkorostoff.github.io/1-pixel-wealth/'
              >
                just how much money
              </a>{' '}
              these super-wealthy people really have.
              <sup>
                <a
                  style={{ color: '#8fa9ff', textDecoration: 'none' }}
                  href='https://mkorostoff.github.io/1-pixel-wealth/'
                >
                  [3]
                </a>{' '}
              </sup>{' '}
              We consistently underestimate the relative wealth of the
              ultra-rich, usually placing the "hundred millionaires" in the same
              category as the "billionaires" (and even the "hundred
              billionaires").
              <br></br>
              <br></br>
              To investigate this further, let's assume we have access to the
              net worth of the wealthiest people on the planet.
            </p>
          </div>

          <h1
            style={{
              fontSize: '36px',
              width: '100%',
              maxWidth: '1000px',
              margin: 'auto',
              paddingBottom: '5px',
              background: '#003152',
              borderRadius: '10px'
            }}
          >
            Step 1) Choose your Billionaire!
          </h1>

          <br></br>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              textAlign: 'left',
              marginBottom: '50px'
            }}
          >
            <div className='chooseBillionaire'>
              <Image radius='md' src={image} alt='Random unsplash image' />
            </div>
            <div className='billionaireSelect'>
              <Select
                placeholder='Pick one'
                data={menuData}
                onChange={val =>
                  updateWorth(menuData.find(item => item.value === val))
                }
              />
              <p
                style={{
                  fontWeight: 'bolder',
                  fontSize: '24px',
                  marginLeft: '20px'
                }}
              >
                {' '}
                Quick Facts:
              </p>
              <ul>
                <li>{bio1}</li>
                <br></br>
                <li>{bio2}</li>
                <br></br>
                <li>{bio3}</li>
              </ul>
            </div>
          </div>
          <h1
            style={{
              fontSize: '36px',
              width: '100%',
              maxWidth: '1000px',
              margin: 'auto',
              marginBottom: '20px',
              paddingBottom: '5px',
              background: '#003152',
              borderRadius: '10px'
            }}
          >
            Step 2) Let's go shopping!
          </h1>
        </div>

        <Group
          className='dollarHeader'
          position='center'
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky',
            top: 0,
            width: '100%',
            zIndex: 10000,
            padding: '5px 30px 10px 30px',
            marginBottom: 20,
            background: '#40c057',
            border: '1px solid #40c057',
            borderRadius: 8
          }}
        >
          <Text
            className='totalBalance'
            weight={700}
            style={{
              padding: '0px 5px 0px 5px',
              background: '#dff7e3',
              borderRadius: 10
            }}
          >
            Total Balance: {formattedTotal}
          </Text>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Button
              style={{
                background: '#dff7e3',
                color: 'black',
                borderRadius: 20,
                height: '50px'
              }}
              onClick={() => setOpen(o => !o)}
            >
              <div>
                <Text
                  className='totalDollarsSpent'
                  weight={700}
                  style={{
                    fontSize: '18px',
                    padding: '0px 10px 0px 10px',
                    background: '#dff7e3',
                    borderRadius: 20
                  }}
                >
                  Total Dollars Spent: {formattedTotalSpent}
                </Text>
                <Text
                  className='totalDollarsSpent'
                  weight={700}
                  style={{
                    fontSize: '12px',
                    background: '#dff7e3',
                    borderRadius: 20
                  }}
                >
                  Click here for more details
                </Text>
              </div>
            </Button>

            <Collapse in={opened}>
              <div
                className='spentBox'
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: '#38a84b',
                  padding: '7px',
                  borderRadius: 8
                }}
              >
                <Text weight={500} style={{}}>
                  <div>
                    <div
                      className='comparisons'
                      style={{
                        fontWeight: 'bolder',
                        padding: '0px 0px 5px 0px'
                      }}
                    >
                      Or in other words... the amount you just spent is:
                    </div>
                    <div className='spendStats'>
                      <span
                        style={{
                          fontSize: '18px',
                          color: '#dff7e3',
                          borderRadius: 20
                        }}
                      >
                        {medianHouseHolds}
                      </span>{' '}
                      times the income of the median US household
                      ($68,000/year).
                      <br></br>
                      <span
                        style={{
                          fontSize: '18px',
                          color: '#dff7e3',
                          borderRadius: 20
                        }}
                      >
                        {medianLifeTimeEarnings}
                      </span>{' '}
                      times the median lifetime earnings of a US citizen ($1.7
                      million).
                      <br></br>
                      <span
                        style={{
                          fontSize: '18px',
                          color: '#dff7e3',
                          borderRadius: 20
                        }}
                      >
                        {MadagascarGDP}
                      </span>{' '}
                      times the annual GDP of Madagascar ($13.72 billion for a
                      country of 26 million people).
                      <br></br>
                      Total number of years the average US citizen needs to work
                      to generate same amount (at $49,764/year):{' '}
                      <span
                        style={{
                          fontSize: '18px',
                          color: '#dff7e3',
                          borderRadius: 20
                        }}
                      >
                        {annualSalaries}
                      </span>
                      <br></br>
                      Number of days needed for Elon Musk to generate the same
                      amount (at $32.4 million/day):{' '}
                      <span
                        style={{
                          fontSize: '18px',
                          color: '#dff7e3',
                          borderRadius: 20
                        }}
                      >
                        {elonMuskHours}
                      </span>
                    </div>
                  </div>
                </Text>
              </div>
            </Collapse>
          </div>

          <Text
            weight={700}
            style={{
              fontSize: '20px',
              padding: '0px 10px 0px 10px',
              background: '#dff7e3',
              borderRadius: 10
            }}
          >
            Percentage of Wealth Remaining: {remainingPercentage}%
          </Text>
        </Group>
        <Grid>
          {titles.map(data => (
            <Grid.Col className='grid' lg={3}>
              <Item
                key={data.item}
                item={data.item}
                description={data.description}
                value={data.value}
                maximum={data.maximum}
                img_url={data.img_url}
                decrement={decrementTotal}
                increment={incrementTotal}
                update={updateTotal}
              />
            </Grid.Col>
          ))}
        </Grid>
        <br></br>
        <Text
          weight={700}
          style={{
            fontSize: '15px'
          }}
        >
          References:
          <ul>
            <li>
              [1]{' '}
              <a
                style={{ color: 'blue', textDecoration: 'none' }}
                href='https://wir2022.wid.world/'
              >
                World Inequality Report 2022
              </a>{' '}
            </li>
            <li>
              [2]{' '}
              <a
                style={{ color: 'blue', textDecoration: 'none' }}
                href='https://www.credit-suisse.com/about-us-news/en/articles/news-and-expertise/global-wealth-report-2021-effects-of-covid-on-household-wealth-in-2020-202106.html'
              >
                Global Wealth Report 2021
              </a>
            </li>
            <li>
              [3]{' '}
              <a
                style={{ color: 'blue', textDecoration: 'none' }}
                href='https://mkorostoff.github.io/1-pixel-wealth/'
              >
                Wealth, Shown to Scale
              </a>
            </li>
            <li>
              [4]{' '}
              <a
                style={{ color: 'blue', textDecoration: 'none' }}
                href='https://pubmed.ncbi.nlm.nih.gov/25551454/'
              >
                Eliminating Malaria Globally
              </a>
            </li>
            <li>
              [5]{' '}
              <a
                style={{ color: 'blue', textDecoration: 'none' }}
                href='https://prospect.org/power/much-money-take-eliminate-poverty-america/'
              >
                Eliminating Poverty in America
              </a>
            </li>
          </ul>
        </Text>
      </div>
    )
  }
  return <div></div>
}
export default App
