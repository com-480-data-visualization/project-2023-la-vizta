

import dynamic from 'next/dynamic';

export default dynamic( () => import('./Flow'), {
	ssr: false
});