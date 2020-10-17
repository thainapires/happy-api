import Library from '../models/Library';
import imagesView from './images_view';

export default{
    render(library: Library){
        return {            
            id: library.id,
            name: library.name,
            latitude: library.latitude,
            longitude: library.longitude,
            about: library.about,
            phone: library.phone,
            website: library.website,
            facebook: library.facebook,
            instagram: library.instagram,
            opening_hours: library.opening_hours,
            open_on_weekends: library.open_on_weekends,
            images: imagesView.renderMany(library.images)
        };
    },
    renderMany(libraries: Library[]){
        return libraries.map(library => this.render(library));
    }
};