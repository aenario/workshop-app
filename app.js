// data management

var contacts = {};
var loans = {};

cozysdk.queryView('contact', 'all', {include_docs: true}, function(err, entries){
    if(err) return alert(err);
    contacts = {}
    entries.forEach(function(entry){
        contacts[entry.id] = entry.doc
    })
    render();
} );

function refreshLoans(){
    cozysdk.queryView('loan', 'all', {include_docs: true}, function(err, entries){
        if(err) return alert(err);
        loans = {}
        entries.forEach(function(entry){
            loans[entry.id] = entry.doc
        })
        render()
    });
}

function deleteLoan(id){
    cozysdk.destroy('loan', id, function(err) {
        if(err) return alert(err);
        refreshLoans();
    });
}


var mapFunction = function(doc){
    emit(doc.id, doc)
}
cozysdk.defineView('loan', 'all', mapFunction, function(err){
    if(err) return alert(err);
    refreshLoans()
});


// event handlers

function onFormSubmit(){
    event.preventDefault()
    var newLoan = {
        object: document.getElementById('loan_thing').value,
        to: document.getElementById('loan_to').value
    }
    cozysdk.create('loan', newLoan, function(err, created) {
        console.log('loan created', created._id)
        refreshLoans()
    });
}

// rendering
function renderContactOption(contact) {
    return '<option value="' + contact._id + '">' + contact.fn + '</option>'
}

function renderContactsSelect() {
    return '<select id="loan_to">' +
        Object.keys(contacts)
              .map( function(id) { return contacts[id] } )
              .map( renderContactOption ).join('') +
    '</select>'
}

function renderLoanForm() {
    return '<form onsubmit="onFormSubmit()">' +
        '<span>Je prête </span>' +
        '<input id="loan_thing" type="text" placeholder="quelque chose">' +
        '<span> à </span>' +
        renderContactsSelect() +
        '<input type="submit" value="Ajouter" />'
}

function renderLoanLine(loan){
    return '<li>J\'ai prêté ' + loan.object + ' à ' + contacts[loan.to].fn +
          '<a onClick="deleteLoan(\'' + loan._id + '\')">&times;</a></li>'

}

function renderLoansList(){
    return '<ul>' +
        Object.keys(loans)
              .map( function(id) { return loans[id] } )
              .map( renderLoanLine ).join('') +
    '</ul>'

}

function render(){
    document.getElementById('container').innerHTML =
        renderLoanForm()  +
        renderLoansList()
}
