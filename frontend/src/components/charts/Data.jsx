const Data = ({amount}) => {
    const data = [
        {
          "day": "Income",
          "Income": {amount},
          "IncomeColor": "hsl(130, 70%, 50%)",
        },
        {
          "day": "Expenses",
          "Expenses": 24,
          "ExpensesColor": "hsl(134, 70%, 50%)",
        },
    ]

    return data;
}
export default Data;