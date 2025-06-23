import React, { useEffect, useState } from 'react';
import './ApprovedWithdrawals.css';

const indianNames = [
  "Amit", "Sanjay", "Neha", "Kiran", "Rohit", "Sneha", "Manoj", "Anjali",
  "Vikram", "Pushpa", "Omprakash", "Nehal", "Pramod", "Parth", "Lakshmi",
  "Shubham", "Pooja", "Harshit", "Deepika", "Rajeev", "Arjun", "Meena",
  "Kavita", "Suraj", "Bhavna", "Nikhil", "Divya", "Gaurav", "Tanya", "Yogesh"
];

// Mask names for privacy
const maskName = (name) => {
  if (name.length <= 2) return name[0] + '*'.repeat(name.length - 1);
  const first = name.slice(0, 2);
  const last = name.slice(-1);
  const masked = '*'.repeat(name.length - 3);
  return first + masked + last;
};

// Get a random amount
const getRandomAmount = () => {
  return Math.floor(Math.random() * 200000 + 20000);
};

// Format current date/time in India Standard Time
const getIndiaDateTime = () => {
  return new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour12: true,
  });
};

// Animate amount scrolling up
const AnimatedAmount = ({ amount }) => {
  const [displayAmount, setDisplayAmount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = Math.ceil((amount - start) / steps);

    const interval = setInterval(() => {
      start += increment;
      if (start >= amount) {
        start = amount;
        clearInterval(interval);
      }
      setDisplayAmount(start);
    }, stepTime);

    return () => clearInterval(interval);
  }, [amount]);

  return <div className="amount">₹{displayAmount.toLocaleString('en-IN')}</div>;
};

// Main component
const ApprovedWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  const generateEntries = () => {
    const count = 6 + Math.floor(Math.random() * 2);
    const newEntries = Array.from({ length: count }, () => {
      const name = indianNames[Math.floor(Math.random() * indianNames.length)];
      return {
        id: crypto.randomUUID(),
        name: maskName(name),
        amount: getRandomAmount(),
        timestamp: getIndiaDateTime()
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
      <div className="title">Verified Withdrawal Records</div>
      {withdrawals.map((entry) => (
        <div className="withdrawal animate-entry" key={entry.id}>
          <strong>{entry.name}</strong>
          <div>Approved Withdrawal:</div>
          <AnimatedAmount amount={entry.amount} />
          <div className="timestamp">{entry.timestamp}</div>
        </div>
      ))}
    </div>
  );
};

export default ApprovedWithdrawals;
