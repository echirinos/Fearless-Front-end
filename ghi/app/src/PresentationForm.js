import React from 'react'

class PresentationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            company: '',
            title: '',
            synopsis: '',
            conferences: [],
        }

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleCompanyChange = this.handleCompanyChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleSynopsisChange = this.handleSynopsisChange.bind(this)
        this.handleConferenceChange = this.handleConferenceChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault()
        const data = { ...this.state }
        data.presenter_name = data.name
        data.company_name = data.company
        data.presenter_email = data.email
        data.conference = data.conference.slice(17, -1)
        delete data.name
        delete data.company
        delete data.email
        delete data.conferences
        const presentationUrl = `http://localhost:8000/api/conferences/${data.conference}/presentations/`
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(presentationUrl, fetchConfig)
        if (response.ok) {
            const newPresentation = await response.json()
            console.log(newPresentation)

            const cleared = {
                conference: '',
                name: '',
                email: '',
            }
            this.setState(cleared)
        }
    }

    handleNameChange(event) {
        const value = event.target.value
        this.setState({ name: value })
    }

    handleEmailChange(event) {
        const value = event.target.value
        this.setState({ email: value })
    }

    handleCompanyChange(event) {
        const value = event.target.value
        this.setState({ company: value })
    }

    handleTitleChange(event) {
        const value = event.target.value
        this.setState({ title: value })
    }

    handleSynopsisChange(event) {
        const value = event.target.value
        this.setState({ synopsis: value })
    }

    handleConferenceChange(event) {
        const value = event.target.value
        this.setState({ conference: value })
    }

    async componentDidMount() {
        const url = 'http://localhost:8000/api/conferences/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json()
            this.setState({ conferences: data.conferences })
        }
    }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new presentation</h1>
                        <form onSubmit={this.handleSubmit} id="create-presentation-form">
                            <div className="form-floating mb-3">
                                <input value={this.state.name} onChange={this.handleNameChange} placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control" />
                                <label htmlFor="presenter_name">Presenter name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.email} onChange={this.handleEmailChange} placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" className="form-control" />
                                <label htmlFor="presenter_email">Presenter email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.company} onChange={this.handleCompanyChange} placeholder="Company name" type="text" name="company_name" id="company_name" className="form-control" />
                                <label htmlFor="company_name">Company name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.title} onChange={this.handleTitleChange} placeholder="Title" required type="text" name="title" id="title" className="form-control" />
                                <label htmlFor="title">Title</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="synopsis">Synopsis</label>
                                <textarea value={this.state.synopsis} onChange={this.handleSynopsisChange} className="form-control" id="synopsis" rows="3" name="synopsis"></textarea>
                            </div>
                            <div className="mb-3">
                                <select value={this.state.conference} onChange={this.handleConferenceChange} required name="conference" id="conference" className="form-select">
                                    <option value="">Choose a conference</option>
                                    {this.state.conferences.map(conference => {
                                        return (
                                            <option value={conference.href} key={conference.href}>
                                                {conference.name}
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
        );
    }
}

export default PresentationForm
