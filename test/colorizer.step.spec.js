import test from 'ava'
import colorizer from '../index'

test('can step any method', (t) => {
  t.deepEqual(colorizer.rgb('#7c608f').step('multiply', 1.1, 10), ['7c608f', '886a9d', '9675ad', 'a581be', 'b68ed1', 'c89ce6', 'dcacfd', 'f2bdff', 'ffd0ff', 'ffe5ff', 'fffcff'])
})
