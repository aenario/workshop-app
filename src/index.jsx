var React = require('react')
var ReactDOM = require('react-dom')
var LoansList = require('./loans_list.component')
var LoanForm = require('./loan_form.component')

var Application = React.createClass({

    getInitialState: function(){
        return {
            contacts: {},
            loans: {}
        }
    },

    componentWillMount: function(){
        var app = this
        cozysdk.queryView('contact', 'all', {include_docs: true}, function(err, entries){
            if(err) return alert(err);
            var contacts = {}
            entries.forEach(function(entry){
                contacts[entry.id] = entry.doc
            })
            app.setState({contacts: contacts});
        } );

        var mapFunction = function(doc){
            emit(doc.id, doc)
        }
        cozysdk.defineView('loan', 'all', mapFunction, function(err){
            if(err) return alert(err);
            app.refreshLoans()
        });
    },

    refreshLoans: function(){
        var app = this;
        cozysdk.queryView('loan', 'all', {include_docs: true}, function(err, entries){
            if(err) return alert(err);
            var loans = {}
            entries.forEach(function(entry){
                loans[entry.id] = entry.doc
            })
            app.setState({loans: loans});
        });
    },

    deleteLoan: function(id){
        var app = this;
        cozysdk.destroy('loan', id, function(err) {
            if(err) return alert(err);
            app.refreshLoans();
        });
    },

    createLoan: function(attributes){
        var app = this;
        cozysdk.create('loan', attributes, function(err, created) {
            console.log('loan created', created._id)
            app.refreshLoans()
        });
    },

    render: function() {
        return <div>
            <LoanForm
                contacts={this.state.contacts}
                onsubmit={this.createLoan} />

            <LoansList
                contacts={this.state.contacts}
                loans={this.state.loans}
                ondelete={this.deleteLoan} />
        </div>
    }

});

ReactDOM.render(<Application />, document.getElementById('container'))
