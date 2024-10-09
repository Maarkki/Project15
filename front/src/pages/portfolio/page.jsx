import { useLocation, useParams } from "react-router-dom";
import PageHead from "../../ui/control/pagehead/pagehead";
import PortfolioInfo from "../../ui/portfolio/information/portfolioinfo";
import PortfolioAchievements from "../../ui/portfolio/achievements/portfolioAchievements.";
const PortfolioPage = () => {
  const { id } = useParams();
  const plocation = useLocation();
  return (
    <div className="global__wrapper">
      <div className="page__compose">
        <PageHead
          backLink={plocation.state !== null ? plocation.state.prev : undefined}
        >
          <h1>Портфолио пользователя</h1>
        </PageHead>
        <PortfolioInfo id={id} />
        <PortfolioAchievements id={id} />
      </div>
    </div>
  );
};

export default PortfolioPage;

//
//
