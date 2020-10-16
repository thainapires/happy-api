import React, {useEffect, useState} from 'react';
import mapMarkerImg from '../images/map-marker.svg';
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import api from '../services/api';

import '../styles/pages/library-map.css'
import mapIcon from "../utils/mapIcon";

interface Library {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap(){
    const [libraries, setLibraries] = useState<Library[]>([]);

    useEffect(() => {
        api.get('libraries').then(response => {
            setLibraries(response.data);
        })
    }, []);

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>
                    <h2>Escolha uma biblioteca no mapa</h2>
                    <p>Se uma palavra pode mudar tudo, imagina um livro!</p>
                </header>

                <footer>
                    <strong>Rio de Janeiro</strong>
                    <span>RJ</span>
                </footer>
            </aside>

            <Map
                center={[-22.8941377,-43.2608639]}
                zoom={12}
                style={{ width: '100%', height: '100%'}}
            >
                <TileLayer 
                    /*url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"*/
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {libraries.map(library => {
                    return (
                        <Marker
                            icon={mapIcon}
                            position={[library.latitude,library.longitude]}
                            key={library.id}
                        >
                            <Popup closeButton={false} minWidth={150} maxWidth={220} className="map-popup">
                                {library.name}
                                <Link to={`/libraries/${library.id}`}>
                                    <FiArrowRight size={20} color="#FFF"/>
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>

            <Link to="/libraries/create" className="create-orphanage">
                <FiPlus size={32} color="FFF"/>
            </Link>
        </div>
    )
}

export default OrphanagesMap;