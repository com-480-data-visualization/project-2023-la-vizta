
import dynamic from 'next/dynamic';

const DynamicFlow = dynamic( () => import('~/components/flow/'), {
	ssr: false
});

export default DynamicFlow;