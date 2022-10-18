import React from 'react'


class ConferenceForm extends React.Component {
    constructor(props) {
        super(props)
        let today = new Date()
        let yyyy = today.getFullYear()
        let mm = today.getMonth()+1
        let dd = today.getDate()
        if (dd < 10) {dd = '0' + dd}
        if (mm < 10) {mm = '0' + mm}
        today = yyyy + '-' +  mm + '-' + dd
        this.state = {
            name: '',
            starts: today,
            ends: today,
            description: '',
            maxPresentations: '',
            maxAttendees: '',
            locations: [],
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleStartsChange = this.handleStartsChange.bind(this)
        this.handleEndsChange = this.handleEndsChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleMaxPresentationsChange = this.handleMaxPresentationsChange.bind(this)
        this.handleMaxAttendeesChange = this.handleMaxAttendeesChange.bind(this)
        this.handleLocationChange = this.handleLocationChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault()
        const data = {...this.state}
        data.max_presentations = data.maxPresentations
        data.max_attendees = data.maxAttendees
        data.location = data.location.slice(15,-1)
        delete data.maxPresentations
        delete data.locations
        delete data.maxAttendees
        console.log(data)

        const conferenceUrl = 'http://localhost:8000/api/conferences/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(conferenceUrl, fetchConfig)
        if (response.ok) {
            const newConference = await response.json()
            console.log(data)
            const cleared = {
                name: '',
                starts: '',
                ends: '',
                description: '',
                maxPresentations: '',
                maxAttendees: '',
                location: '',
            }
            this.setState(cleared)
        }
    }

    handleNameChange(event) {
        const value = event.target.value
        this.setState({name: value})
    }

    handleStartsChange(event) {
        const value = event.target.value
        this.setState({starts: value})
    }

    handleEndsChange(event) {
        const value = event.target.value
        this.setState({ends: value})
    }

    handleDescriptionChange(event) {
        const value = event.target.value
        this.setState({description: value})
    }

    handleMaxPresentationsChange(event) {
        const value = event.target.value
        this.setState({maxPresentations: value})
    }

    handleMaxAttendeesChange(event) {
        const value = event.target.value
        this.setState({maxAttendees: value})
    }

    handleLocationChange(event) {
        const value = event.target.value
        this.setState({location: value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json()
          this.setState({locations: data.locations})
        }
    }


    render() {
      return (
        <div className="my-5 container">
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Conference</h1>
            <form onSubmit={this.handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input value={this.state.name} onChange={this.handleNameChange} placeholder="Name" name="name" required type="text" id="name" className="form-control"/>
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3 datepicker">
                <input value={this.state.starts} onChange={this.handleStartsChange} placeholder="Start date" name="starts" required type="date" id="starts" className="form-control"/>
                <label htmlFor="starts">Start date</label>
              </div>
              <div className="form-floating mb-3 datepicker">
                <input value={this.state.ends} onChange={this.handleEndsChange} placeholder="End date" name="ends" required type="date" id="ends" className="form-control"/>
                <label htmlFor="ends">End date</label>
              </div>
              <div className="form-floating mb-3">
                <textarea value={this.state.description} onChange={this.handleDescriptionChange} className="form-control" id="description" placeholder="Description" name="description" rows="3"></textarea>
                <label htmlFor="description">Description</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.maxPresentations} onChange={this.handleMaxPresentationsChange} placeholder="Maximum presentations" name="max_presentations" required type="number" id="max_presentations" className="form-control"/>
                <label htmlFor="max_presentations">Maximum presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.maxAttendees} onChange={this.handleMaxAttendeesChange} placeholder="Maximum attendees" name="max_attendees" required type="number" id="max_attendees" className="form-control"/>
                <label htmlFor="max_attendees">Maximum attendees</label>
              </div>
              <div className="mb-3">
                <select value={this.state.location} onChange={this.handleLocationChange} required id="location" name="location" className="form-select">
                  <option value="">Choose a location</option>
                  {this.state.locations.map(location => {
                        return (
                            <option value={location.href} key={location.href}>
                                {location.name}
                            </option>
                        )
                    })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
      </div>
      );
    }
  }

export default ConferenceForm
