import React from 'react';
import { AuthLayout } from '@/layouts/AuthLayout';
import { Card } from '@/components/common/Card/Card';
import { AuthHeader } from '@/features/auth/components/AuthHeader';
import { LoginForm } from '@/features/auth/components/LoginForm';

interface LoginPageProps {
  onSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccess }) => {
  return (
    <AuthLayout>
      <Card
        className="glass-panel"
        header={<AuthHeader />}
      >
        <LoginForm onSuccess={onSuccess} />
      </Card>
    </AuthLayout>
  );
};
