import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Logo } from '../components/index';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I am baby roof party blue bottle four loko crucifix authentic,
            pop-up vape drinking vinegar bushwick air plant kale chips hoodie
            schlitz. Banjo schlitz next level try-hard before they sold out
            street art. Portland meditation thundercats kombucha, try-hard pork
            belly cardigan tousled plaid. Gatekeep bruh four dollar toast vinyl
            vice raclette edison bulb.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
