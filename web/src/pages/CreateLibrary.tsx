import React, { useState, FormEvent, ChangeEvent} from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from "react-icons/fi";


import '../styles/pages/create-library.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";
import { useHistory } from "react-router-dom";


export default function CreateLibrary() {
  const history = useHistory();
  const [position, setPosition] = useState( {latitude: 0, longitude: 0} );

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebSite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent){
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return;
    }  

    const selectedImages = Array.from(event.target.files);
    
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent){

    event.preventDefault();

    const { latitude, longitude } = position;
    
    if(name === 'b'){
      window.scrollTo(0, 0)
      return;
    }

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('phone', phone);
    data.append('website', website);
    data.append('facebook', facebook);
    data.append('instagram', instagram);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach(image => {
      data.append('images', image);
    })  
    
    await api.post('libraries', data);

    alert('Cadastro Realizado com sucesso!');

    history.push('/app');

  }

  return (
    <div id="page-create-library">
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className="create-library-form">
          <fieldset>
            <legend>Cadastro de Biblioteca</legend>

            <div className="required-star">* Campos obrigatórios</div>

            <Map 
              center={[-22.9145504,-43.2220397]} 
              style={{ width: '100%', height: 280, marginTop: 20}}
              zoom={13}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              { position.latitude !== 0 && (
                <Marker interactive={false} 
                icon={mapIcon} 
                position={[position.latitude,position.longitude]} 
                />
              ) }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome <div className="required-star">*</div></label>
              <input 
                id="name" 
                value={name} 
                onChange={event => setName(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <div className="required-star">*</div><span>Máximo de 500 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300} 
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="phone">Telefone <div className="required-star">*</div></label>
              <input 
                id="phone"
                value={phone} 
                onChange={event => setPhone(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos <div className="required-star">*</div></label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img src={image} key={image} alt={name}/>
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Mais informações</legend>

            <div className="input-block">
              <label htmlFor="website">Site </label>
              <input 
                id="website"
                value={website} 
                onChange={event => setWebSite(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="facebook">Facebook</label>
              <input 
                id="facebook" 
                value={facebook} 
                onChange={event => setFacebook(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="instagram">Instagram</label>
              <input 
                id="instagram"
                value={instagram} 
                onChange={event => setInstagram(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento (Exemplo: Das 9h as 18h) <div className="required-star">*</div></label>
              <input 
                id="opening_hours" 
                value={opening_hours} 
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana <div className="required-star">*</div></label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active' : ''} 
                  onClick={() => setOpenOnWeekends(true)}
                >
                Sim
                </button>
                <button 
                  type="button" 
                  className={!open_on_weekends ? 'active' : '' }
                  onClick={() => setOpenOnWeekends(false)}
                >
                Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
