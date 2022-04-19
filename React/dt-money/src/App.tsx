import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles";
import Modal from 'react-modal';

import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";

Modal.setAppElement('#root');


export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModal] = useState(false);

  function handleNewTransactionModalOpen() {
    setIsNewTransactionModal(true);
  }

  function handleNewTransactionModalClose() {
    setIsNewTransactionModal(false);
  }


  return (
    <TransactionsProvider>
      <Header onNewTransactionButtonClick={handleNewTransactionModalOpen} />
      <Dashboard />

      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleNewTransactionModalClose}/>
      <GlobalStyle />
    </TransactionsProvider>
  );
}