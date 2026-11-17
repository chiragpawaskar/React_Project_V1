import React, { useState } from 'react';
import { AuthLayout } from '@/layouts/AuthLayout';
import { NseLoginForm } from '@/features/auth/components/NseLoginForm';
import { NseInstructions } from '@/features/auth/components/NseInstructions';
import { ForgotPasswordModal } from '@/features/auth/components/ForgotPasswordModal';
import { SupportModal } from '@/features/auth/components/SupportModal';

interface LoginPageProps {
  onSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccess }) => {
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <AuthLayout>
      <div className="nse-portal-cards-wrapper">
        <NseLoginForm
          onSuccess={onSuccess}
          onForgotPasswordClick={() => setForgotPasswordOpen(true)}
        />
        <NseInstructions
          onSupportClick={() => setSupportOpen(true)}
        />
      </div>

      <ForgotPasswordModal
        isOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />

      <SupportModal
        isOpen={supportOpen}
        onClose={() => setSupportOpen(false)}
      />
    </AuthLayout>
  );
};

export default LoginPage;
