import React from 'react';

class Maps extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            loadMap: false
        }
	}

    mapRender = () => {
        const setting = {
            height: "300px",
            width: "400px",
            zoom: 18,
            queryString: "Ecole d'ingénieurs Paris-Sud Ivry - ESME Sudria, Rue Molière, Ivry-sur-Seine, France",
            place_id: 'ChIJa1TH2rJz5kcR_QzMbtAmWHc',
            satellite: false,
            centerCoord: [48.81451141814917, 2.3949183999999857],
            cid: '0x775826d06ecc0cfd',
            lang: 'fr',
            cityUrl: '/france/paris',
            cityAnchorText: 'Carte de Paris, Ile de France, France',
            id: 'map-9cd199b9cc5410cd3b1ad21cab2e54d3',
            embed_id: '497298',
        };
        let d = document;
		let s = d.createElement('script');
		s.src = 'https://1map.com/js/script-for-user.js?embed_id=497298';
        s.onload = () => {
            if (!this.state.loadMap) {
                window.OneMap.initMap(setting);
                this.setState({ loadMap: true });
            }
		};
        let to = d.getElementsByTagName('script')[0];
        to.parentNode.insertBefore(s, to)
	};

	render() {
		return (
            <div id='map-9cd199b9cc5410cd3b1ad21cab2e54d3'>
				{this.mapRender()}
            </div>
		);
	}
}

export default Maps
