import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { MySession } from "~/session";

import spotify from './api/spotify';
import { isAuthenticated } from "~/session";
import SignOut from "~/components/SignOut";
import { log } from 'console';

interface User {
	name: string;
	followers: number;
	image: string;
	subscription: string;
}


const musics = [["Given Up", 'Linkin Park'], ['All girls are the same', 'Juice Wrld'], ['Choke', 'Bury tomorrow']]


export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx) as MySession
	const logged = await isAuthenticated(session)
	
	if ( !logged ) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}
	
	const me = await spotify(session).me();

    const { display_name, followers, images, product } = me;

    const user: User = {
        name: display_name,
        followers,
        image: images[0].url,
        subscription: product
    }

	const lookupGenres = async (title: string, artist: string) => {
		const track = await spotify(session).search(title, artist)
		const t = track.tracks.items[0]
		const album = await spotify(session).albums(t.album.id)
		if ( album.genres.length > 0 )
			return album.genres
		const { genres } = await spotify(session).artists(t.artists[0].id)
		return genres
	}


	const tracks = (await Promise.all(musics.map(([title, artist]) => lookupGenres(title, artist))))
		.map( (genres, i) => ({genres, title: musics[i][0], artist: musics[i][1]}))

	return { props: { me: user, tracks } };
}

export default function( { me, tracks }: { me: User, tracks: any } )
{
	console.log('here', me);
	
	return (
		<div>
			<SignOut />
			Home page
			<pre>{JSON.stringify(me, null, 2)}</pre><br/>
			<pre>{JSON.stringify(tracks, null, 4)}</pre>
		</div>
	)
}