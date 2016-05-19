var React = require('react')
var ContactSelect = require('./contact_select.component')


module.exports = React.createClass({

    getInitialState: function(){
        return {
            object: '',
            to: undefined
        }
    },

    onFormSubmit: function(event){
        event.preventDefault()
        this.props.onsubmit({
            object: this.state.object,
            to: this.state.to || this.props.contacts[0]._id
        });
    },

    onObjectChange: function(event) {
        this.setState({object: event.target.value});
    },

    onToChange: function(event) {
        this.setState({to: event.target.value});
    },

    render: function(){
        return <form>
            <span>Je prête </span>
            <input value={this.state.object} onChange={this.onObjectChange} />
            <span> à </span>
            <ContactSelect
                contacts={this.props.contacts}
                value={this.state.to}
                onChange={this.onToChange} />
            <input type="submit" value="Ajouter" onClick={this.onFormSubmit} />
        </form>
    }

});
