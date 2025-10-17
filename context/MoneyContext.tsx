import React, { createContext, useState, ReactNode } from "react";

type MoneyCardData = {
  title: string;
  amount: number;
};

type QueueData = {
  ticket: string;
  position: number;
};

type MoneyContextType = {
  cards: MoneyCardData[];
  addCard: (title: string, amount: number) => void;
  total: number;
  queue: QueueData[];
  joinQueue: () => string;
};

export const MoneyContext = createContext<MoneyContextType | undefined>(
  undefined
);

export const MoneyProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<MoneyCardData[]>([
    { title: "Income", amount: 500 },
    { title: "Expenses", amount: 200 },
    { title: "Savings", amount: 300 },
  ]);

  const [queue, setQueue] = useState<QueueData[]>([]);
  const [ticketNumber, setTicketNumber] = useState(1);

  const addCard = (title: string, amount: number) => {
    setCards([...cards, { title, amount }]);
  };

  const joinQueue = () => {
    const ticket = `Q${ticketNumber}`;
    const newQueueEntry = { ticket, position: queue.length + 1 };
    setQueue([...queue, newQueueEntry]);
    setTicketNumber(ticketNumber + 1);
    return ticket;
  };

  const total = cards.reduce((sum, card) => sum + card.amount, 0);

  return (
    <MoneyContext.Provider
      value={{ cards, addCard, total, queue, joinQueue }}
    >
      {children}
    </MoneyContext.Provider>
  );
};
