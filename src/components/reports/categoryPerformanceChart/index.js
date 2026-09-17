import { useEffect, useState } from "react";
import {
    getCategoryPerformance
} from "../../../services/transactionApi";
import "./index.css";

const CategoryPerformance = ({selectedMonth, selectedYear}) => {

    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCategoryPerformance = async () => {
            try {
                setLoading(true);
                setError(false);
                const data =
                    await getCategoryPerformance(
                        selectedMonth,
                        selectedYear
                    );
                setCategoryData(data);
            } catch (error) {
                console.log(error);
                setError(true);
                setCategoryData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCategoryPerformance();
    }, [
        selectedMonth,
        selectedYear
    ]);

    return (
        <div className="category-performance">
            {loading ? (
                    <p className="category-performance-message">
                        Loading data...
                    </p>
                ) : error ? (
                    <p className="category-performance-message">
                        Unable to load category performance data.
                        Please try again later.
                    </p>
                ) : categoryData.length === 0 ? (
                    <p className="category-performance-message">
                        No Expense Data...
                    </p>
                ) : (

                <div className="category-performance-list">
                    {categoryData.map(item => (
                        <div
                            className="category-performance-row"
                            key={item.category}
                        >
                            <span className="category-performance-name">
                                {item.category}
                            </span>

                            <div className="category-performance-row-container">
                                <span className="category-performance-amount">
                                    ₹{" "}
                                    {Number(
                                        item.expense
                                    ).toLocaleString()}
                                </span>
                                <span
                                    className={
                                        `category-performance-change ${
                                            item.change
                                        }`
                                    }
                                >
                                    {item.change === "up" && "▲"}
                                    {item.change === "down" && "▼"}
                                    {item.change === "same" && "="}
                                </span>
                            </div>    
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default CategoryPerformance;