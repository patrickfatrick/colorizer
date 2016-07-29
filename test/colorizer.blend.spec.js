import test from 'ava'
import colorizer from '../index'

test('can blend two colors', (t) => {
  t.deepEqual(colorizer.rgb('#7c608f').blend('#ffffff', 10), ['7c608f', '89709a', '9680a5', 'a390b1', 'b0a0bc', 'bdb0c7', 'cbbfd2', 'd8cfdd', 'e5dfe9', 'f2eff4', 'ffffff'])
})

test('can blend two colors reversed', (t) => {
  t.deepEqual(colorizer.rgb('#ffffff').blend('#7c608f', 10), ['ffffff', 'f2eff4', 'e5dfe9', 'd8cfdd', 'cbbfd2', 'beafc7', 'b0a0bc', 'a390b1', '9680a5', '89709a', '7c608f'])
})
