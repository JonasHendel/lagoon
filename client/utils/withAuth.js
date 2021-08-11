import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const withAuth = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== 'undefined') {
      const router = useRouter();

      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        router.replace('/login');
        return null;
      }

      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default withAuth;