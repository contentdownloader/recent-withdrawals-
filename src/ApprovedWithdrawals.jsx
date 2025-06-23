import React, { useEffect, useState } from 'react';
import './ApprovedWithdrawals.css';

const indianNames = [
  "Amit", "Sanjay", "Neha", "Kiran", "Rohit", "Sneha", "Manoj", "Anjali",
  "Vikram", "Pushpa", "Omprakash", "Nehal", "Pramod", "Parth", "Lakshmi",
  "Shubham", "Pooja", "Harshit", "Deepika", "Rajeev", "Arjun", "Meena",
  "Kavita", "Suraj", "Bhavna", "Nikhil", "Divya", "Gaurav", "Tanya", "Yogesh"
];

const maskName = (name) => {
  if (name.length <= 2) return name[0] + '*'.repeat(name.length - 1);
  const first = name.slice(0, 2);
  const last = name.slice(-1);
  const masked = '*'.repeat(name.length - 3);
  return first + masked + last;
};

const getRandomAmount = () => {
  return Math.floor(Math.random() * 200000 + 20000);
};

const ApprovedWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  const generateEntries = () => {
    const count = 6 + Math.floor(Math.random() * 2);
    const newEntries = Array.from({ length: count }, () => {
      const name = indianNames[Math.floor(Math.random() * indianNames.length)];
      return {
        name: maskName(name),
        amount: getRandomAmount(),
        id: crypto.randomUUID()
      };
    });
    setWithdrawals(newEntries);
  };

  useEffect(() => {
    generateEntries();
    const interval = setInterval(generateEntries, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="withdrawals">
      {withdrawals.map((entry) => (
        <div className="withdrawal animate-entry" key={entry.id}>
          <strong>{entry.name}</strong>
          <div>Approved Withdrawal:</div>
          <div className="amount">₹{entry.amount.toLocaleString('en-IN')}</div>
        </div>
      ))}
    </div>
  );
};

export default ApprovedWithdrawals;
