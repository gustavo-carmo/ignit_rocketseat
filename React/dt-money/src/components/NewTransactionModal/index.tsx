import Modal from 'react-modal';
import { FormEvent, useState } from 'react';

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

import { ButtonType, Container, TransactionTypeContainer } from './styles';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose(): void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const { createTransaction } = useTransactions();

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type
    });

    setTitle('');
    setAmount(0);
    setType('deposit');
    setCategory('');
    onRequestClose();
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      overlayClassName="modal-overlay-class-name" 
      className="modal-content-class-name"
    >
      <button 
        type="button" 
        onClick={onRequestClose} 
        className="modal-close-button"
      >
        <img src={closeImg} alt="Fechar Modal" />
      </button>
      
      <Container
        onSubmit={handleCreateNewTransaction}
      >
        <h2>Cadastrar transação</h2>

        <input 
          type="text" 
          placeholder='Título' 
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input 
          type="number" 
          placeholder='Valor' 
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <ButtonType 
            type='button'
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt='Entrada' />
            <span>Entrada</span>
          </ButtonType>

          <ButtonType 
            type='button'
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt='Saída' />
            <span>Saída</span>
          </ButtonType>
        </TransactionTypeContainer>

        <input 
          type="text" 
          placeholder='Categoria' 
          value={category}
          onChange={(event) => setCategory(event.target.value)}  
        />

        <button type="submit">Cadastrar</button>

      </Container>
    </Modal>
  );
}