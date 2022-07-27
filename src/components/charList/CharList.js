import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

import MarvelService from "../../services/MarvelService";

import {Component} from "react";
import marvelService from "../../services/MarvelService";

class CharList extends Component{

    marvelServices = new MarvelService();

    state = {
        allChars: null
    }
    componentDidMount() {
        this.updateList();
    }

    onAllCharsLoaded = (allChars) => {
        this.setState({
            allChars: allChars.map(item =>{
                const {name, thumbnail} = item;
                return (<ListElement char={{name: name, thumbnail: thumbnail}}/>)
            })
        })
    }

    updateList = () =>{
        this.marvelServices
            .getAllCharacters()
            .then(this.onAllCharsLoaded)
    }
    render() {
        const {allChars} = this.state;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {allChars}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const ListElement = ({char}) => {
    const {name, thumbnail} = char
    const styleFlag = ('http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' === thumbnail);
    return (
        <li className="char__item">
            <img src={thumbnail} alt="abyss" style={styleFlag ? {objectFit: "contain"} : {objectFit: "cover"}}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;
