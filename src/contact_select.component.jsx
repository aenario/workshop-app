var React = require('react')

module.exports = function({contacts, onChange, value}) {
    return <select onChange={onChange} value={value} >{
        Object.keys(contacts).map( (id) => contacts[id] )
              .map( (contact) =>
                <option key={contact._id} value={contact._id}>{ contact.fn }</option>
            )
    }</select>
}
