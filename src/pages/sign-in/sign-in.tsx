import { FormEvent, useState } from 'react';
import Title from '@/components/title/title';
import SecondaryText from '@/components/secondary-text/secondary-text';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import './sign-in.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const onEmailInput = (evt: FormEvent<HTMLInputElement>) => {
    const { value } = evt.target as HTMLInputElement;
    setEmail(value);
  };

  const onPasswordInput = (evt: FormEvent<HTMLInputElement>) => {
    const { value } = evt.target as HTMLInputElement;
    setPassword(value);
  };

  const onFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (!email || !password) {
      setFormError('Email address and password are required!');
      return;
    }
    // eslint-disable-next-line no-console
    console.log(email, password);
  };

  return (
    <div className="container">
      <main className="sign-in">
        <Title className="sign-in__title">Sign in</Title>
        <SecondaryText className="sign-in__text">Enter your account details.</SecondaryText>
        <form className="sign-in__form" onSubmit={onFormSubmit} method="POST">
          <fieldset className="sign-in__fieldset">
            <label className="sign-in__label" htmlFor="email">Email address</label>
            <Input
              className="sign-in__input"
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="example@mail.com"
              onChange={onEmailInput}
              required
            />
            <label className="sign-in__label" htmlFor="password">Password</label>
            <Input
              className="sign-in__input"
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Your password"
              onChange={onPasswordInput}
              required
            />
            <Button className="sign-in__button" type="submit">Sign in</Button>
          </fieldset>
          <p className="sign-in__error">{formError}</p>
        </form>
      </main>
    </div>
  );
};

export default SignIn;
