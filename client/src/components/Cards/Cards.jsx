import React from 'react';
import { useDispatch } from 'react-redux';
import {useState} from 'react';
import {getAllVideogames} from '../../redux/Actions/actions.js';
import img from '../../imagenes/d0898894122ab331c6411faee24cd4bd.jpg';
import Card from '../Card/Card.jsx';
import Styles from '../Cards/Cards.module.css';
import Loading from '../Loading/Loading.jsx';
import Error from '../Error/Error.jsx';


export default function Cards ({currentGames})  {
    
    const dispatch = useDispatch();
    const [carga, setCarga] = useState(true);


    React.useEffect(() => {
        dispatch(getAllVideogames()).then(() => setCarga(false))
    }, [dispatch])

    if(carga){
        return <Loading/>;
    }

    return (
        <div className={Styles.main}>
            {currentGames.length > 0 ?
             currentGames?.map(v => {
                return (<Card
                    key={v.id}
                    id={v.id}
                    background_image={v.background_image ? v.background_image : img}
                    name={v.name}
                    genres={v.genres?.map(e => typeof (e) === 'object' ? e.name : e).join(', ')}
                    platforms={v.platforms}
                    rating={v.rating}
                    />)}) : <Error /> }
        

        </div>
    )
} 