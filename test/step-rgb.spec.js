import test from 'ava'
import { stepRgb } from '../src'

/**
 * DA70D6 => 218, 112, 214
 */

test.beforeEach((t) => {
  t.context.color = [ 218, 112, 214 ]
})

test('can step the multiply method', (t) => {
  const steps = stepRgb('multiply', 1.1, 10)(t.context.color)
  t.deepEqual(steps, [
    [ 218, 112, 214 ],
    [ 240, 123, 235 ],
    [ 255, 136, 255 ],
    [ 255, 149, 255 ],
    [ 255, 164, 255 ],
    [ 255, 180, 255 ],
    [ 255, 198, 255 ],
    [ 255, 218, 255 ],
    [ 255, 240, 255 ],
    [ 255, 255, 255 ],
    [ 255, 255, 255 ]
  ])
  t.deepEqual(steps.length, 11)
})

test('can step the divide method', (t) => {
  const steps = stepRgb('divide', 1.1, 5)(t.context.color)
  t.deepEqual(steps, [
    [ 218, 112, 214 ],
    [ 198, 102, 195 ],
    [ 180, 93, 177 ],
    [ 164, 84, 161 ],
    [ 149, 76, 146 ],
    [ 135, 70, 133 ]
  ])
  t.deepEqual(steps.length, 6)
})

test('can step the add method', (t) => {
  const steps = stepRgb('add', 10, 5)(t.context.color)
  t.deepEqual(steps, [
    [ 218, 112, 214 ],
    [ 228, 122, 224 ],
    [ 238, 132, 234 ],
    [ 248, 142, 244 ],
    [ 255, 152, 254 ],
    [ 255, 162, 255 ]
  ])
  t.deepEqual(steps.length, 6)
})

test('can step the subtract method', (t) => {
  const steps = stepRgb('subtract', 10, 5)(t.context.color)
  t.deepEqual(steps, [
    [ 218, 112, 214 ],
    [ 208, 102, 204 ],
    [ 198, 92, 194 ],
    [ 188, 82, 184 ],
    [ 178, 72, 174 ],
    [ 168, 62, 164 ]
  ])
  t.deepEqual(steps.length, 6)
})

test('throws an error if bad method provided', (t) => {
  t.throws(() => stepRgb('poop', 10, 5)(t.context.color), Error, 'Invalid method provided')
})
