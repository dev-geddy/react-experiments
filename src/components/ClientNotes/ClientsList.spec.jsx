import React from 'react'
import { shallow, mount, render } from 'enzyme'
import ClientsList, {ClientsList as ClientsListInstance} from './ClientsList'
import sampleData from '../../sample-data/clients.json'
import sinon from 'sinon'

describe('Clients list component', () => {
  it('Should render', () => {
    const props = {
      clients: sampleData.clients,
      activeClient: {},
      onClientSelect: sinon.spy()
    }
    const clientsComponent = shallow(<ClientsList {...props} />)
    expect(clientsComponent.find("article").length).toEqual(3)
    expect(clientsComponent.find("article").first().find("p").text()).toContain('Honda Motor Co., Ltd.')
  })
})