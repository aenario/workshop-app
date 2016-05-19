// data management

var contacts = {};

cozysdk.queryView('contact', 'all', {include_docs: true}, function(err, entries){
    if(err) return alert(err);
    contacts = {}
    entries.forEach(function(entry){
        contacts[entry.id] = entry.doc
    })
    console.log(contacts)
} );
