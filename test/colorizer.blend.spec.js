import test from 'ava'
import Colorizer from '../index'
let color

test.before((t) => {
  color = Colorizer('#DA70D6')
})

test('can blend two colors', (t) => {
  t.deepEqual(color.blend('#ffffff', 10), ['da70d6', 'de7eda', 'e18dde', 'e59be2', 'e9a9e6', 'ecb8ea', 'f0c6ef', 'f4d4f3', 'f8e2f7', 'fbf1fb', 'ffffff'])
})

test('can blend two colors reversed', (t) => {
  t.deepEqual(Colorizer('#fff').blend('#DA70D6', 10), ['ffffff', 'fbf1fb', 'f8e2f7', 'f4d4f3', 'f0c6ef', 'edb7eb', 'e9a9e6', 'e59be2', 'e18dde', 'de7eda', 'da70d6'])
})
