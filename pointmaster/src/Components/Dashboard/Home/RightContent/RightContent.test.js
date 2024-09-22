import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import RightContent from './RightContent';
import { HomeContext } from '../../../../Context/HomeContext';
import '@testing-library/jest-dom';


// Mock axios for testing
jest.mock('axios');

// Dummy HomeContext values for testing
const mockContextValues = {
  selectedItems: [
    { item_name: 'Item 1', price: 10, quantity: 1, discount: 2 },
    { item_name: 'Item 2', price: 20, quantity: 2, discount: 3 },
  ],
  removeItem: jest.fn(),
  increaseQuantity: jest.fn(),
  decreaseQuantity: jest.fn(),
  customerDetails: { name: 'John Doe', phoneNumber: '1234567890', points: 100 },
  customerSelected: true,
  handleCustomerSelection: jest.fn(),
  resetCustomerSelection: jest.fn(),
  setRightContent: jest.fn(),
  setPaymentInfo: jest.fn(),
  setTotalAmount: jest.fn(),
  setTotalDiscount: jest.fn(),
};

describe('RightContent Component', () => {
  it('renders customer details when customer is selected', () => {
    render(
      <HomeContext.Provider value={mockContextValues}>
        <RightContent />
      </HomeContext.Provider>
    );

    expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
    expect(screen.getByText('Phone: 1234567890')).toBeInTheDocument();
    expect(screen.getByText('Points: 100')).toBeInTheDocument();
  });

  it('renders selected items correctly', () => {
    render(
      <HomeContext.Provider value={mockContextValues}>
        <RightContent />
      </HomeContext.Provider>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('$10.00 / unit')).toBeInTheDocument();
    expect(screen.getByText('Discount: $2.00')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();

    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('$20.00 / unit')).toBeInTheDocument();
    expect(screen.getByText('Discount: $6.00')).toBeInTheDocument();
    expect(screen.getByText('$40.00')).toBeInTheDocument();
  });

  it('calls removeItem when remove button is clicked', () => {
    render(
      <HomeContext.Provider value={mockContextValues}>
        <RightContent />
      </HomeContext.Provider>
    );

    const removeButtons = screen.getAllByRole('button', { name: /close/i });
    fireEvent.click(removeButtons[0]);
    expect(mockContextValues.removeItem).toHaveBeenCalledWith(0);
  });

  it('calls increaseQuantity when plus button is clicked', () => {
    render(
      <HomeContext.Provider value={mockContextValues}>
        <RightContent />
      </HomeContext.Provider>
    );

    const plusButtons = screen.getAllByRole('button', { name: /plus/i });
    fireEvent.click(plusButtons[0]);
    expect(mockContextValues.increaseQuantity).toHaveBeenCalledWith(0);
  });

  it('calls decreaseQuantity when minus button is clicked', () => {
    render(
      <HomeContext.Provider value={mockContextValues}>
        <RightContent />
      </HomeContext.Provider>
    );

    const minusButtons = screen.getAllByRole('button', { name: /minus/i });
    fireEvent.click(minusButtons[0]);
    expect(mockContextValues.decreaseQuantity).toHaveBeenCalledWith(0);
  });

  it('proceeds to PaymentMethods when Proceed button is clicked', () => {
    render(
      <HomeContext.Provider value={mockContextValues}>
        <RightContent />
      </HomeContext.Provider>
    );

    const proceedButton = screen.getByRole('button', { name: /proceed/i });
    fireEvent.click(proceedButton);
    expect(mockContextValues.setRightContent).toHaveBeenCalledWith('PaymentMethods');
  }); 
});
