import React from 'react'
import { shallow, mount, render } from 'enzyme'
import FavouriteTunes, {FavouriteTunes as FavouriteTunesInstance} from './index'
import sampleData from '../../sample-data/iTunes - all three types from music.json'
import sinon from 'sinon'
// jest.dontMock('./FavouriteTunes.scss')

// will have to be moved to be available globally for all tests
// mock local storage within the test
let store = {
  tunes: JSON.stringify(sampleData.clients)
}

window.localStorage = {
  getItem: function (key) {
    return store[key];
  },
  setItem: function (key, value) {
    store[key] = value.toString();
  },
  clear: function () {
    store = {};
  }
}
// end of localStorage mock

const eventMock = {
  preventDefault: () => {}
}

describe('FavouriteTunes component', () => {

  it('Should render',()=>{
    const favouriteTunesComponent = shallow(<FavouriteTunes />)
    expect(typeof favouriteTunesComponent).toEqual('object')
  })

})
