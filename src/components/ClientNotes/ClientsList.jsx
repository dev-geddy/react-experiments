import React, {Component} from 'react'

class ClientsList extends Component {

  static propTypes = {
    clients: React.PropTypes.array,
    activeClient: React.PropTypes.object,
    onClientSelect: React.PropTypes.func
  }

  onClientSelect(client, event) {
    event.preventDefault()
    this.props.onClientSelect(client)
  }

  renderClients(clients) {
    const {
      activeClient
    } = this.props
    return clients.map((client, index)=>{
      return (
        <article className={'clients-list__client' + (activeClient.id === client.id ? ' active':'')}
                 key={index}
                 onClick={this.onClientSelect.bind(this, client)}>
          <p>{client.name}<br /><small>ID: {client.id}</small></p>
        </article>
      )
    })
  }

  render() {
    const {
      clients
    } = this.props
    return (
      <section className="clients-list">
        {this.renderClients(clients)}
      </section>
    )
  }
}

export default ClientsList
