import React from 'react';
import { formatCurrency } from '../../utils/formatters';
import Button from '../ui/Button';

interface HeaderProps {
  currentBalance?: number;
  username?: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentBalance = 0,
  username = 'User',
  onLogout,
}) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-2xl">💰</div>
          <h1 className="text-xl font-bold text-blue-600">BudgetFlow</h1>
        </div>

        {/* Center content - could add navigation here */}
        <div className="flex-1" />

        {/* Right side - Balance and User */}
        <div className="flex items-center gap-6">
          {/* Current Balance */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg">
            <div className="text-xs opacity-90">Current Balance</div>
            <div className="text-lg font-bold">
              {formatCurrency(currentBalance)}
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <span className="text-gray-600">Welcome back, {username}</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {username.charAt(0).toUpperCase()}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-gray-500 hover:text-gray-700"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;