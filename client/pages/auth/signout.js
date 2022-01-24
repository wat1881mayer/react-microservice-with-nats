import { useRouter, userRouter } from 'next/router';
import React, { useEffect } from 'react';
import UseRequest from '../../hooks/use-request';

const Signout = () => {
  const router = useRouter();
  const { doRequest } = UseRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out...</div>;
};

export default Signout;
