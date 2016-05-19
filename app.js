// data management

var contacts = {};

cozysdk.queryView('contact', 'all', {include_docs: true}, function(err, entries){
    if(err) return alert(err);
    contacts = {}
    entries.forEach(function(entry){
        contacts[entry.id] = entry.doc
    })
    render();
} );

function onFormSubmit(){
    event.preventDefault()
    var what = document.getElementById('loan_thing').value
    var to = document.getElementById('loan_to').value
    console.log("prêt", what, to, contacts[to].fn);
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

function render(){
    document.getElementById('container').innerHTML =
        renderLoanForm()
}
