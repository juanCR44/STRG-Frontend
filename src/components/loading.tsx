import { useState, useRef, useEffect } from "react";
import $ from 'jquery'

interface PropLoading {
    text: string
    pos: boolean
    fixed: string
}
const LoadingEffect = (props: PropLoading) => {

    useEffect(() => {
        console.log(props.fixed)
        if (props.pos) {
            $('.body-loading').css('gap', '100px')
        } else {
            $('.body-loading').css('gap', '0px')
        }
        if (props.fixed == 'si') {
            $('.body-loading').css('position', 'fixed')
        }
        else{
            $('.body-loading').css('position', 'absolute')
        }

    }, [])

    return (
        <div className="body-loading">
            <div>
                <img className="loadingcat1" src="image/loadingcat1.gif" alt="" />
            </div>
            <p className="loading">{props.text}</p>
        </div>
    )
}

export default LoadingEffect;