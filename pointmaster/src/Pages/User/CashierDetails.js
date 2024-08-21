import React, { useState } from 'react';
import './cashierdetails.css';

function CashierDetails() {
  const [showPopup, setShowPopup] = useState(false);

  const cashier = {
    name: 'John Doe',
    branchId: 'B123',
    address: '123 Main St, City, State, 12345',
    dateOfBirth: '1990-01-15',
    email: 'john.doe@example.com',
    photoUrl: `${process.env.PUBLIC_URL}/images/cashier.jpg`,
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="cashier-details-container">
      <div className="box">
        <img src={cashier.photoUrl} alt={cashier.name} className="cashier-photo" />
        <div className="cashier-info">
          <p><strong>Name:</strong> {cashier.name}</p>
          <p><strong>Branch ID:</strong> {cashier.branchId}</p>
          <p><strong>Address:</strong> {cashier.address}</p>
          <p><strong>Date of Birth:</strong> {cashier.dateOfBirth}</p>
          <p><strong>Email:</strong> {cashier.email}</p>
        </div>
        <button className="change-cashier-btn" onClick={togglePopup}>
          Change Cashier
        </button>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Switch Cashier</h3>
            <form>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" required />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input type="password" required />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">Login</button>
                <button type="button" className="cancel-btn" onClick={togglePopup}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CashierDetails;
