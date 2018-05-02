import { converter } from './index.js'

test('converts state object', () => {
  const state = {
    WW_001: 'Value1',
    WW_002: 'Value2'
  } 

  const expected = {
    wW_001: 'Value1',
    wW_002: 'Value2'
  } 

  const convertState = converter(/^W/, 'w')

  expect(convertState(state)).toEqual(expected);
});
