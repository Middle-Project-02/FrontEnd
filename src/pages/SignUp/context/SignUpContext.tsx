import React, { createContext, useContext, useState } from 'react';

type Step = 'name' | 'phoneNumber' | 'password' | 'complete' | 'welcome';

interface SignUpContextType {
  name: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
  step: Step;
  setName: (name: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setPassword: (password: string) => void;
  setPasswordConfirm: (passwordConfirm: string) => void;
  setStep: (step: Step) => void;
  reset: () => void;
}

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

export const SignUpProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [step, setStep] = useState<Step>('name');

  const reset = () => {
    setName('');
    setPhoneNumber('');
    setPassword('');
    setPasswordConfirm('');
    setStep('name');
  };

  return (
    <SignUpContext.Provider
      value={{
        name,
        phoneNumber,
        password,
        passwordConfirm,
        step,
        setName,
        setPhoneNumber,
        setPassword,
        setPasswordConfirm,
        setStep,
        reset,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUpContext = () => {
  const context = useContext(SignUpContext);

  if (!context) {
    throw new Error('useSignUpContext는 SignUpProvider 내부에서만 사용할 수 있습니다.');
  }

  return context;
};
