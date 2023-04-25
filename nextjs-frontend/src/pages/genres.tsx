import dynamic from 'next/dynamic';

const DynamicGenres = dynamic( () => import('~/components/genres/'), {
	ssr: false
});

export default DynamicGenres;