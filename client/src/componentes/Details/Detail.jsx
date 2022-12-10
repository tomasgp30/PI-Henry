import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    },[dispatch])

    const myGame = useSelector((state) => state.detail)

    return (
        <div>
            { myGame.length === 0 ? (
                <div>
                    <p>NO COOL</p>
                </div>
            ):(
                <div>
                    <h1>{myGame.name}</h1>
                    <img src={myGame.background_image} alt="Not Found" />
                    <p>{myGame.description}</p>
                    <h1>{myGame.rating}</h1>
                </div>    
            )}
        </div>
    )
}