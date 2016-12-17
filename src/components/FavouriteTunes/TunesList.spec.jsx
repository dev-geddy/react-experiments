import React from 'react'
import { shallow, mount, render } from 'enzyme'
import TunesList, {TunesList as TunesListInstance} from './TunesList'
import sampleTunes from '../../sample-data/iTunes - all three types from music.json'
import sinon from 'sinon'

describe('TunesList list component', () => {
  it('Should render', () => {
    const props = {
      tunes: sampleTunes.results
    }
    const notesComponent = shallow(<TunesList {...props} />)
    expect(notesComponent.find("article").length).toEqual(25)
    expect(notesComponent.find("article").first().find("footer").text()).toEqual(sampleTunes.results[0].primaryGenreName + ' ' + sampleTunes.results[0].releaseDate)
  })
})