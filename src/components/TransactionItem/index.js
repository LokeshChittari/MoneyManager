// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, type} = transactionDetails

  const onDelete = () => {
    deleteTransaction(id)
  }
  return (
    <li className="transactions-data">
      <p className="transaction-row">{title}</p>
      <p className="transaction-row">{amount}</p>
      <p className="transaction-row">{type}</p>
      <button
        type="button"
        className="delete-button"
        onClick={onDelete}
        testid="delete"
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default TransactionItem
