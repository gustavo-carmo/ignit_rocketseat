interface RepositoryItem {
  repository: {
    html_url: string;
    name: string;
    description: string;
  }
};

export function RepositoryItem({ repository }: RepositoryItem) {

  return(
    <li>
      <strong>{repository.name}</strong>
      <p>{repository.description}</p>

      <a href={repository.html_url}>
        Acessar Repositório
      </a>
    </li>
  );
}