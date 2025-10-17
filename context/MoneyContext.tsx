import React, { createContext, useState, ReactNode } from "react";

export type MoneyCardData = { title: string; amount: number; type: string; date: Date };
export type QueueData = { ticket: string; position: number; type: "Normal" | "VIP"; joinTime: Date };

type Action = { type: "add" | "edit" | "delete" | "queue" | "cancel"; description: string; date: Date };

type MoneyContextType = {
  cards: MoneyCardData[];
  addCard: (title: string, amount: number, type: string) => void;
  editCard: (index: number, title: string, amount: number, type: string) => void;
  deleteCard: (index: number) => void;
  total: number;
  totalByType: (type: string) => number;
  queue: QueueData[];
  queueHistory: QueueData[];
  joinQueue: (type?: "Normal" | "VIP") => string;
  removeQueue: (ticket: string) => void;
  clearQueue: () => void;
  cancelTicket: (ticket: string) => void;
  promoteTicket: (ticket: string) => void;
  resetQueue: () => void;
  actions: Action[];
  undoLastAction: () => void;
};

export const MoneyContext = createContext<MoneyContextType | undefined>(undefined);

export const MoneyProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<MoneyCardData[]>([
    { title: "Income", amount: 500, type: "Income", date: new Date() },
    { title: "Expenses", amount: 200, type: "Expense", date: new Date() },
    { title: "Savings", amount: 300, type: "Savings", date: new Date() },
  ]);

  const [queue, setQueue] = useState<QueueData[]>([]);
  const [queueHistory, setQueueHistory] = useState<QueueData[]>([]);
  const [ticketNumber, setTicketNumber] = useState(1);
  const [actions, setActions] = useState<Action[]>([]);

  const addCard = (title: string, amount: number, type: string) => {
    const card = { title, amount, type, date: new Date() };
    setCards([...cards, card]);
    setActions([...actions, { type: "add", description: `Added ${title}`, date: new Date() }]);
  };

  const editCard = (index: number, title: string, amount: number, type: string) => {
    const newCards = [...cards];
    newCards[index] = { title, amount, type, date: new Date() };
    setCards(newCards);
    setActions([...actions, { type: "edit", description: `Edited ${title}`, date: new Date() }]);
  };

  const deleteCard = (index: number) => {
    const card = cards[index];
    setCards(cards.filter((_, i) => i !== index));
    setActions([...actions, { type: "delete", description: `Deleted ${card.title}`, date: new Date() }]);
  };

  const total = cards.reduce((sum, c) => sum + c.amount, 0);
  const totalByType = (type: string) => cards.filter(c => c.type === type).reduce((sum, c) => sum + c.amount, 0);

  const joinQueue = (type: "Normal" | "VIP" = "Normal") => {
    const ticket = `${type[0]}${ticketNumber}`;
    const newQueueEntry = { ticket, position: queue.length + 1, type, joinTime: new Date() };
    setQueue([...queue, newQueueEntry]);
    setQueueHistory([...queueHistory, newQueueEntry]);
    setTicketNumber(ticketNumber + 1);
    setActions([...actions, { type: "queue", description: `Joined queue ${ticket}`, date: new Date() }]);
    return ticket;
  };

  const removeQueue = (ticket: string) => {
    setQueue(queue.filter(q => q.ticket !== ticket));
    setActions([...actions, { type: "cancel", description: `Removed ticket ${ticket}`, date: new Date() }]);
  };

  const clearQueue = () => {
    setQueue([]);
    setTicketNumber(1);
    setActions([...actions, { type: "cancel", description: `Cleared queue`, date: new Date() }]);
  };

  const cancelTicket = (ticket: string) => {
    setQueue(queue.filter(q => q.ticket !== ticket));
    setActions([...actions, { type: "cancel", description: `Canceled ticket ${ticket}`, date: new Date() }]);
  };

  const promoteTicket = (ticket: string) => {
    setQueue(queue.map(q => (q.ticket === ticket ? { ...q, type: "VIP" } : q)));
  };

  const resetQueue = () => {
    setQueue([]);
    setTicketNumber(1);
  };

  const undoLastAction = () => {
    const last = actions.pop();
    setActions([...actions]);
    if (!last) return;
    // Optional: implement undo logic per action type
  };

  return (
    <MoneyContext.Provider value={{
      cards, addCard, editCard, deleteCard, total, totalByType,
      queue, queueHistory, joinQueue, removeQueue, clearQueue,
      cancelTicket, promoteTicket, resetQueue, actions, undoLastAction
    }}>
      {children}
    </MoneyContext.Provider>
  );
};
