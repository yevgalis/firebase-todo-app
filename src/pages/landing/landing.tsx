import Button from '@/components/button/button';
import { Link } from 'react-router-dom';
import Title from '@/components/title/title';
import './landing.css';
import SecondaryText from '@/components/secondary-text/secondary-text';

const Landing = () => {
  return (
    <div className="container">
      <main className="landing">
        <div className="landing__image-wrapper">
          <img
            className="landing__image"
            src={require('../../assets/images/home-screen.svg')}
            alt="Girl juggles tasks"
          />
        </div>
        <Title className="landing__title">Organize your life</Title>
        <SecondaryText className="landing__text">
          Become focused, organized, and calm with our app. Managing your projects is easy now. Just try it!
        </SecondaryText>
        <div className="landing__controls">
          {/* <Button className="home__button--register">*/}
          {/*  Create account*/}
          {/* </Button>*/}
          {/* <Button className="home__button--sign-in" variant="secondary">*/}
          {/*  Sign in*/}
          {/* </Button>*/}
          <Link to="/sign-in" className="landing__controls-link">
            <Button className="landing__button--sign-in">
              Get started
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Landing;
