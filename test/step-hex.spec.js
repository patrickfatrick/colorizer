import test from 'ava'
import { stepHex } from '../src'

/**
 * DA70D6 => 218, 112, 214
 */

test.beforeEach((t) => {
  t.context.color = [ 218, 112, 214 ]
})

test('can step the multiply method', (t) => {
  const steps = stepHex('multiply', 1.1, 10)(t.context.color)
  t.deepEqual(steps, [ 'da70d6', 'f07beb', 'ff88ff', 'ff95ff', 'ffa4ff', 'ffb4ff', 'ffc6ff', 'ffdaff', 'fff0ff', 'ffffff', 'ffffff' ])
  t.deepEqual(steps.length, 11)
})

test('can step the divide method', (t) => {
  const steps = stepHex('divide', 1.1, 10)(t.context.color)
  t.deepEqual(steps, [ 'da70d6', 'c666c3', 'b45db1', 'a454a1', '954c92', '874685', '7b3f79', '70396e', '663464', '5c2f5b', '542b53' ])
  t.deepEqual(steps.length, 11)
})

test('can step the add method', (t) => {
  const steps = stepHex('add', 10, 5)(t.context.color)
  t.deepEqual(steps, [ 'da70d6', 'e47ae0', 'ee84ea', 'f88ef4', 'ff98fe', 'ffa2ff' ])
  t.deepEqual(steps.length, 6)
})

test('can step the subtract method', (t) => {
  const steps = stepHex('subtract', 10, 5)(t.context.color)
  t.deepEqual(steps, [ 'da70d6', 'd066cc', 'c65cc2', 'bc52b8', 'b248ae', 'a83ea4' ])
  t.deepEqual(steps.length, 6)
})

test('throws an error if bad method provided', (t) => {
  t.throws(() => stepHex('poop', 10, 5)(t.context.color), Error, 'Invalid method provided')
})
