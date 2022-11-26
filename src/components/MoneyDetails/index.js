// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {moneyDetails} = props
  const {totalBalance, totalIncome, totalExpenses} = moneyDetails

  return (
    <>
      <div className="money-details-item balance">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="balance-image"
        />
        <div>
          <p className="money-item-heading">Your Balance</p>
          <p className="money-item-amount" testid="balanceAmount">
            Rs {totalBalance}
          </p>
        </div>
      </div>
      <div className="money-details-item income">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="income-image"
        />
        <div>
          <p className="money-item-heading">Your Income</p>
          <p className="money-item-amount" testid="incomeAmount">
            Rs {totalIncome}
          </p>
        </div>
      </div>
      <div className="money-details-item expenses">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="expenses-image"
        />
        <div>
          <p className="money-item-heading">Your Expenses</p>
          <p className="money-item-amount" testid="expensesAmount">
            Rs {totalExpenses}
          </p>
        </div>
      </div>
    </>
  )
}
export default MoneyDetails
