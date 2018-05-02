import { converter, autoconvert } from './index.js'

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

test('autoconverts nested object', () => {
  const state = {
    warpReducer: {
      WW_001: 'Value1',
      WW_002: 'Value2'
    },
    langReducer: {
      __L_01: 'Val1',
      __L_02: 'Val2'
    }
  }

  const expected = {
    warpReducer: {
      wW_001: 'Value1',
      wW_002: 'Value2'
    },
    langReducer: {
      l_01: 'Val1',
      l_02: 'Val2'
    }
  } 

  expect(autoconvert(state)).toEqual(expected);
});

test('autoconverts list of object', () => {
  const state = [
    [
      {
        WW_001: 'Value1',
        WW_002: 'Value2'
      },
      {
        __L_01: 'Val1',
        __L_02: 'Val2'
      }
    ]
  ]

  const expected = [
    [
      {
        wW_001: 'Value1',
        wW_002: 'Value2'
      },
      {
        l_01: 'Val1',
        l_02: 'Val2'
      }
    ]
  ] 

  expect(autoconvert(state)).toEqual(expected);
});

test('autoconverts underscore only', () => {
  const state = {
    __: 'Val1'
  }

  const expected = {
    n: 'Val1'
  }

  expect(autoconvert(state)).toEqual(expected);
});
