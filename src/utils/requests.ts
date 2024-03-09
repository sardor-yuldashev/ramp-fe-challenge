import {
  PaginatedRequestParams,
  PaginatedResponse,
  RequestByEmployeeParams,
  SetTransactionApprovalParams,
  Transaction,
  Employee,
} from "./types"
import mockData from "../mock-data.json"

const TRANSACTIONS_PER_PAGE = 5

const data: { employees: Employee[]; transactions: Transaction[] } = {
  employees: mockData.employees,
  transactions: mockData.transactions,
}

export const getEmployees = (): Employee[] => data.employees

export const getTransactionsPaginated = ({
  page,
}: PaginatedRequestParams): PaginatedResponse<Transaction[]> => {
  if (page === null) {
    throw new Error("Page cannot be null")
  }

  const start = page * TRANSACTIONS_PER_PAGE
  const end = start + TRANSACTIONS_PER_PAGE

  if (start > data.transactions.length) {
    throw new Error(`Invalid page ${page}`)
  }

  const nextPage = end < data.transactions.length ? page + 1 : null

  return {
    nextPage,
    data: data.transactions.slice(start, end),
  }
}

export const getTransactionsByEmployee = ({ employeeId }: RequestByEmployeeParams) => {
  if (!employeeId) {
    return data.transactions.slice(0, TRANSACTIONS_PER_PAGE)
    // throw new Error("Employee id cannot be empty")
  }

  return data.transactions.filter((transaction) => transaction.employee.id === employeeId)
}

export const setTransactionApproval = ({ transactionId, value }: SetTransactionApprovalParams): void => {

  const transaction = data.transactions.find(
    (currentTransaction) => currentTransaction.id === transactionId
  )

  if (!transaction) {
    throw new Error("Invalid transaction to approve")
  }

  transaction.approved = value
}

// const previous_value = data.transactions.find((currentTransaction) => currentTransaction.id === "77af111b-4177-4774-af57-36df9053e1df")?.approved
// console.log(data.transactions.find((currentTransaction) => currentTransaction.id === "77af111b-4177-4774-af57-36df9053e1df"))
// const wtf = <SetTransactionApprovalParams>{transactionId: "77af111b-4177-4774-af57-36df9053e1df", value: !previous_value}
// setTransactionApproval(wtf);
// console.log(setTransactionApproval(wtf));
// console.log(data.transactions.find((currentTransaction) => currentTransaction.id === "77af111b-4177-4774-af57-36df9053e1df"))