import logoImg from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
  onNewTransactionButtonClick(): void;
}

export function Header({ onNewTransactionButtonClick }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Dt money" />
        <button type="button" onClick={onNewTransactionButtonClick}>
          Nova Transação
        </button>
      </Content>
    </Container>
  );
}