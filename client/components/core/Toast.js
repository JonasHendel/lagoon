import { useEffect } from 'react';
import toast, {Toaster} from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({ message, handleShow }) => {
	
  if (message.error === true) {
		toast.error(message.msg, {
			position: 'top-center',
      id: message.msg
		});

	}
	if (message.error === false) {
		toast.success(message.msg, {
			position: 'top-center',
      id: message.msg
		});
	}
	return (
		<div>
			<Toaster
				limit={2}
				pauseOnHover={false}
				autoClose={3000}
				newestOnTop={true}
			/>
		</div>
	);
};

export default Toast;
