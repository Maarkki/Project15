import PageHead from "../pagehead/pagehead";

const ForbiddenComponent = () => {
  return (
    <div className="controlpage__background">
      <PageHead>
        <h1>Нет доступа</h1>
      </PageHead>
      <div className="page__body">
        Кажется, вы попали на страницу, к которой у вас нет доступа
      </div>
    </div>
  );
};

export default ForbiddenComponent;
