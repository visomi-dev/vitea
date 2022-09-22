import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '~/hooks/useAuth';

import { Loader } from '~/components/ui';

export default function SignOut() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    signOut().finally(() => {
      navigate('/');
    });
  }, []);

  return <Loader />;
}
