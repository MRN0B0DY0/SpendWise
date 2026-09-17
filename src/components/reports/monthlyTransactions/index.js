import { useEffect, useState } from "react";
import {
    getReportRecentTransactions
} from "../../../services/transactionApi";
import "./index.css";

const RecentTransactions = ({selectedMonth, selectedYear}) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                setError(false);
                const data =
                    await getReportRecentTransactions(
                        selectedMonth,
                        selectedYear
                    );
                setTransactions(data);
            } catch (error) {
                console.log(error);
                setError(true);
                setTransactions([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, [
        selectedMonth,
        selectedYear
    ]);

    const formatDate = (date) => {
        const transactionDate =
            new Date(date);
        return transactionDate.toLocaleDateString(
            "en-GB"
        );
    };


    return (
        <div className="report-recent-transactions">
            {loading ? (
                    <div className="report-recent-transactions-message">
                        Loading transactions...
                    </div>
                ) : error ? (
                    <div className="report-recent-transactions-message">
                        Unable to load transactions.
                        Please try again later.
                    </div>
                ) : transactions.length === 0 ? (
                    <div className="report-recent-transactions-message">
                        No transactions found for this month.
                    </div>
                ) : (
                <div className="report-recent-transactions-table-container">
                    <table className="report-recent-transactions-table">
                        <thead>
                            <tr>
                                <th>
                                    Date
                                </th>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Category
                                </th>
                                <th>
                                    Type
                                </th>
                                <th>
                                    Amount
                                </th>
                                <th>
                                    Payment
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map(
                                transaction => (
                                    <tr key={transaction.id} >
                                        <td>
                                            {formatDate(
                                                transaction.transaction_date
                                            )}
                                        </td>

                                        <td>
                                            {
                                                transaction.transaction_name
                                            }
                                        </td>

                                        <td>
                                            {
                                                transaction.category
                                            }
                                        </td>

                                        <td>
                                            <span
                                                className={
                                                    `transaction-type ${
                                                        transaction.type === "Income"
                                                            ? "income"
                                                            : "expense"
                                                    }`
                                                }
                                            >
                                                {
                                                    transaction.type
                                                }
                                            </span>
                                        </td>

                                        <td
                                            className={
                                                transaction.type === "Income"
                                                    ? "transaction-amount income"
                                                    : "transaction-amount expense"
                                            }
                                        >
                                            ₹{""}
                                            {Number(
                                                transaction.amount
                                            ).toLocaleString()}
                                        </td>

                                        <td>
                                            {
                                                transaction.payment_method
                                            }
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RecentTransactions;