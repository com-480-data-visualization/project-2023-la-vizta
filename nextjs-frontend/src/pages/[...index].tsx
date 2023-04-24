
import DynamicMap from '~/components/DynamicMap';
import CustomRouter from '~/components/CustomRouter';

import Navbar from '~/components/nav';
import Genres from '~/components/genres';
import Flow from '~/components/flow';

export default function() {
	return (
		<DynamicMap>
			<Navbar />
			<CustomRouter match='/genres' component={Genres}/>
			<CustomRouter match='/flow' component={Flow}/>
		</DynamicMap>
	)
}
