import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    transactionHistory: [],
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
    totalIncome: 0,
    totalExpenses: 0,
  }

  onTitleInput = e => {
    this.setState({
      title: e.target.value,
    })
  }

  onAmountInput = e => {
    this.setState({
      amount: e.target.value,
    })
  }

  onTypeChange = e => {
    this.setState({
      type: e.target.value,
    })
  }

  onAddTransaction = e => {
    e.preventDefault()
    const {title, amount, type, totalIncome, totalExpenses} = this.state
    const typeText = transactionTypeOptions.filter(
      eachOption => eachOption.optionId === type,
    )
    if (title !== '' && amount !== '' && amount > 0) {
      const newTransaction = {
        id: uuidv4(),
        title,
        amount,
        type: typeText[0].displayText,
      }

      this.setState(prevState => ({
        transactionHistory: [...prevState.transactionHistory, newTransaction],
        title: '',
        amount: '',
        type: transactionTypeOptions[0].optionId,
        totalIncome:
          type === 'INCOME' ? totalIncome + parseInt(amount) : totalIncome,
        totalExpenses:
          type === 'INCOME' ? totalExpenses : totalExpenses + parseInt(amount),
      }))
    }
  }

  onDeleteTransaction = transactionId => {
    const {transactionHistory, totalIncome, totalExpenses} = this.state
    const delTransactionDetails = transactionHistory.filter(
      eachTransaction => eachTransaction.id === transactionId,
    )
    const {amount, type} = delTransactionDetails[0]
    this.setState({
      transactionHistory: transactionHistory.filter(
        eachTransaction => eachTransaction.id !== transactionId,
      ),
      totalIncome:
        type === 'Income' ? totalIncome - parseInt(amount) : totalIncome,
      totalExpenses:
        type === 'Income' ? totalExpenses : totalExpenses - parseInt(amount),
    })
  }

  render() {
    const {
      transactionHistory,
      title,
      amount,
      type,
      totalIncome,
      totalExpenses,
    } = this.state
    const moneyDetails = {
      totalBalance: totalIncome - totalExpenses,
      // totalIncome - totalExpenses < 0 ? 0 : totalIncome - totalExpenses,
      totalIncome,
      totalExpenses,
    }
    return (
      <div className="app-container">
        <div className="money-details-container">
          <div className="user-name-section">
            <h1 className="user-name">Hi, Richard</h1>
            <p className="welcome-message">
              Welcome back to your{' '}
              <span className="title-name">Money Manager</span>
            </p>
          </div>
          <div className="money-details-section">
            <MoneyDetails moneyDetails={moneyDetails} />
          </div>
          <div className="transaction-operating-section">
            <div className="add-transaction-section">
              <h1 className="form-heading">Add Transaction</h1>
              <form
                className="add-transaction-form"
                onSubmit={this.onAddTransaction}
              >
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <br /> <br />
                <input
                  id="title"
                  className="input-field"
                  type="text"
                  name="transaction-title"
                  placeholder="TITLE"
                  value={title}
                  onChange={this.onTitleInput}
                />
                <br /> <br />
                <label className="label" htmlFor="amount">
                  AMOUNT
                </label>
                <br /> <br />
                <input
                  id="amount"
                  className="input-field"
                  type="text"
                  name="transaction-amount"
                  placeholder="AMOUNT"
                  value={amount}
                  onChange={this.onAmountInput}
                />
                <br /> <br />
                <label className="label" htmlFor="transaction-type">
                  TYPE
                </label>
                <br /> <br />
                <select
                  className="input-field"
                  name="transaction-types"
                  id="transaction-type"
                  value={type}
                  onChange={this.onTypeChange}
                >
                  {transactionTypeOptions.map(eachOption => (
                    <option
                      key={eachOption.optionId}
                      value={eachOption.optionId}
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
                <br /> <br />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <div className="transaction-history-section">
              <h1 className="transaction-history-heading">History</h1>
              <ul className="transactions-history-table">
                <li className="table-headings-row">
                  <p className="column-heading">Title</p>
                  <p className="column-heading">Amount</p>
                  <p className="column-heading">Type</p>
                </li>

                {transactionHistory.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    transactionDetails={eachTransaction}
                    deleteTransaction={this.onDeleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
