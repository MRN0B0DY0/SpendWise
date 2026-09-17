import { useEffect, useState } from "react";
import {
    getSmartInsights
} from "../../../services/transactionApi";
import "./index.css";

const SmartInsights = ({selectedMonth, selectedYear}) => {
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                setLoading(true);
                setError(false);
                const data =
                    await getSmartInsights(
                        selectedMonth,
                        selectedYear
                    );
                setInsights(data);
            } catch (error) {
                console.log(error);
                setError(true);
                setInsights(null);
            } finally {
                setLoading(false);
            }
        };
        fetchInsights();
    }, [
        selectedMonth,
        selectedYear
    ]);
    
    /* loading */

    if (loading) {
        return (
            <div className="report-smart-insights">
                <p className="smart-insights-message">
                    Analyzing your spending...
                </p>
            </div>
        );
    }

    /* No data */

    if (error) {
        return (
            <div className="report-smart-insights">
                <p className="smart-insights-message">
                    Unable to load smart insights.
                    Please try again later.
                </p>
            </div>
        );
    }

    if (
        !insights ||
        !insights.highestCategory ||
        !insights.lowestCategory ||
        !insights.categoryData ||
        insights.categoryData.length === 0
    ) {
        return (
            <div className="report-smart-insights">
                <p className="smart-insights-message">
                    No expense data available
                    for this month.
                </p>
            </div>
        );
    }

    /* Data available */

    return (
        <div className="report-smart-insights">
            <div className="smart-insight-item">
                <span className="smart-insight-icon">
                    📊
                </span>
                <p>
                    <strong>
                        {insights.highestCategory.category}
                    </strong>{" "}
                    was your highest spending
                    category this month with{" "}
                    <strong>
                        ₹
                        {insights.highestCategory.expense.toLocaleString()}
                    </strong>{" "}
                    spent.
                </p>
            </div>

            <div className="smart-insight-item">
                <span className="smart-insight-icon">
                    💰
                </span>
                <p>
                    Your total expense for this
                    month was{" "}
                    <strong>
                        ₹
                        {insights.totalExpense.toLocaleString()}
                    </strong>.
                </p>
            </div>

            <div className="smart-insight-item">
                <span className="smart-insight-icon">
                    🔎
                </span>
                <p>
                    Your lowest spending category
                    was{" "}
                    <strong>
                        {insights.lowestCategory.category}
                    </strong>{" "}
                    with{" "}
                    <strong>
                        ₹
                        {insights.lowestCategory.expense.toLocaleString()}
                    </strong>{" "}
                    spent.
                </p>
            </div>

            <div className="smart-insight-item">
                <span className="smart-insight-icon">
                    🧾
                </span>
                <p>
                    You made{" "}
                    <strong>
                        {insights.categoryData.reduce(
                            (total, item) =>
                                total +
                                item.transactionCount,
                            0
                        )}
                    </strong>{" "}
                    transactions this month.
                </p>
            </div>
        </div>
    );
};


export default SmartInsights;