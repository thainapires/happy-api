import Image from '../models/Image'
export default{
    render(image: Image){
        return {            
            id: image.id,
            /*url: `http://localhost:3333/uploads/${image.path}` */ /*web*/
            url: `http://192.168.0.12:3333/uploads/${image.path}` /* mobile*/
        };
    },
    renderMany(images: Image[]){
        return images.map(image => this.render(image));
    }
};