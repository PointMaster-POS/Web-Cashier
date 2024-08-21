import React from 'react';
import './logs.css';

function Logs() {
  const transactions = [
    {
      billId: 'B001',
      cashierName: 'John Doe',
      time: '2024-08-21 14:30',
      totalAmount: '$150.00',
      discount: '$10.00',
    },
    {
      billId: 'B002',
      cashierName: 'Jane Smith',
      time: '2024-08-21 15:00',
      totalAmount: '$200.00',
      discount: '$15.00',
    },
    // Add more transactions as needed
  ];

  const handlePrint = (billId) => {
    // Implement the print functionality here
    console.log(`Printing bill with ID: ${billId}`);
  };

  return (
    <div className="logs-container">
      <h2>Transaction Logs</h2>
      <table className="logs-table">
        <thead>
          <tr>
            <th>Bill ID</th>
            <th>Cashier Name</th>
            <th>Time</th>
            <th>Total Amount</th>
            <th>Discount</th>
            <th>Print</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.billId}</td>
              <td>{transaction.cashierName}</td>
              <td>{transaction.time}</td>
              <td>{transaction.totalAmount}</td>
              <td>{transaction.discount}</td>
              <td>
                <button onClick={() => handlePrint(transaction.billId)} className="print-btn">
                  Print
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Logs;
