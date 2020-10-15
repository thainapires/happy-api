import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Library from './Library';

@Entity("images")
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    path: string;

    @ManyToOne(() => Library, library => library.images)
    @JoinColumn({name: 'librarie_id'})
    library: Library;
}