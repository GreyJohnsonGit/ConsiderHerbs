import React from 'react';
import Male_Front from './images/Male_Front.png';

const MaleBodyFront = (props) => {

    //Not all of these body areas will be implemented. They are just mentioned so the body model can be scaled up if needed
    
    let MaleHeadArea = "197.,   7., 216.,  13., 224.,  26., 221.,  80., 197.,  94., 175., 81., 171.,  27., 176.,  15."
    let MaleLEar = ""
    let MaleREar = ""
    let MaleMouthArea = ""
    let MaleNeckArea = "177.,  85., 198.,  95., 219.,  84., 233., 109., 161., 110."
    let MaleChestArea = "157., 111., 237., 110., 257., 149., 250., 185., 147., 187., 139., 148."
    let MaleStomachArea = "147., 188., 249., 185., 248., 260., 241., 275., 157., 276., 149., 261."
    let MaleLArmArea = "87., 302., 101., 305., 123., 268., 130., 238., 145., 210., 145., 184., 137., 148., 156., 112., 134., 116., 121., 131., 115., 150., 117., 170., 105., 224.,  92., 242."
    let MaleRArmArea = "293., 304., 308., 300., 303., 240., 291., 224., 279., 177., 281., 153., 272., 130., 260., 115., 239., 111., 258., 149., 251., 182., 250., 208., 266., 236., 272., 262."
    let MaleLWristArea = ""
    let MaleRWristArea = ""
    let MaleLHandArea = ""
    let MaleRHandArea = ""
    let MaleArea = ""
    let MaleBackArea = ""
    let MaleLLeg = "140., 325., 194., 339., 192., 377., 175., 430., 166., 497., 150., 557., 131., 556., 126., 484., 138., 451., 130., 370."
    let MaleRLeg = "202., 339., 257., 327., 265., 365., 260., 449., 271., 496., 264., 553., 247., 555., 230., 496., 220., 431., 203., 373."
    let MaleLKnee = ""
    let MaleRKnee = ""
    let MaleLFootArea = "128., 581., 150., 584., 151., 612., 146., 627., 138., 632., 115., 619., 116., 603."
    let MaleRFootArea = "246., 585., 267., 581., 280., 603., 281., 620., 259., 631., 250., 626., 245., 612."


    let canvasy =<canvas id = "malefront" width = "400" height = "650"></canvas>;
    //let ctx  = canvasy.getContext("2d");
    //ctx.drawImage(Male_Front, 0, 0);
    return (
        <div>
            <img src={Male_Front} width="400" useMap='#MFmap'></img>
            <map name="MFmap">
                <area shape="poly" coords={MaleChestArea} onMouseOver={() => { console.log("Chest") }} onClick={()=>{props.setFilterText("chest")}} />
                <area shape="poly" coords={MaleNeckArea} onMouseOver={() => { console.log("Throat") }} onClick={()=>{props.setFilterText("throat")}} />
                <area shape="poly" coords={MaleHeadArea} onMouseOver={() => { console.log("Head") }} onClick={()=>{props.setFilterText("head")}} />
                <area shape="poly" coords={MaleStomachArea} onMouseOver={() => { console.log("Stomach") }} onClick={()=>{props.setFilterText("stomach")}} />
                <area shape="poly" coords={MaleLArmArea} onMouseOver={() => { console.log("Arm") }} onClick={()=>{props.setFilterText("arm")}} />
                <area shape="poly" coords={MaleRArmArea} onMouseOver={() => { console.log("Arm") }} onClick={()=>{props.setFilterText("arm")}} />
                <area shape="poly" coords={MaleLLeg} onMouseOver={() => { console.log("Leg") }} onClick={()=>{props.setFilterText("leg")}} />
                <area shape="poly" coords={MaleRLeg} onMouseOver={() => { console.log("Leg") }} onClick={()=>{props.setFilterText("leg")}} />
                <area shape="poly" coords={MaleLFootArea} onMouseOver={() => { console.log("Foot") }} onClick={()=>{props.setFilterText("foot")}} />
                <area shape="poly" coords={MaleRFootArea} onMouseOver={() => { console.log("Foot") }} onClick={()=>{props.setFilterText("foot")}} />
            </map>
        </div>
    )
}

export default MaleBodyFront;