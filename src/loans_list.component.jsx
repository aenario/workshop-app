var React = require('react')

module.exports = function renderLoansList( {contacts, loans, ondelete} ){
    return <ul>{
        Object.keys(loans).map( (id) => loans[id] )
              .map( (loan) =>
                  <li key={loan._id}>
                      J'ai prêté {loan.object} à  {contacts[loan.to] && contacts[loan.to].fn}
                      <a onClick={ondelete.bind(null, loan._id)}> &times; </a>
                  </li>
              )
    }</ul>
};
