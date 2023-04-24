
import dynamic from 'next/dynamic';

export default dynamic( () => import('./Country'), {
	ssr: false
});