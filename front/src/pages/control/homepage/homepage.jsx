import PageHead from "../../../ui/control/pagehead/pagehead";

const ControlHome = () => {
  return (
    <div className="controlpage__background">
      <PageHead>
        <h1>Добро пожаловать в панель управления</h1>
      </PageHead>
      <div className="page__body">
        <p>Выберите необходимый пункт в меню слева</p>
      </div>
    </div>
  );
};

export default ControlHome;
