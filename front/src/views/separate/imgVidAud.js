import React from 'react';
const ImgVidAud =   (props) =>{
    var {
        file,
        thumb,
        vidAud,
        type,
        class_name
    } = props
    console.log("props",props)
    // return true
return(
   !type ? <></> :
    (type.includes('.mp4') ?
        <video
            id="my-video"
            className={class_name}
            autoPlay 
            playsInline 
            loop
            muted 
            controls
            preload="auto"
            poster={thumb}
            alt="video" loading="lazy"
        >
            <source
                src={vidAud}
                type="video/mp4" />
        </video>
            :
            type.includes('.mp3') ?
            <>
			<img src={thumb} className="img-fluid"  loading="lazy"></img>
            <audio controls controlsList="nodownload"
                // ref={vidRef}
                alt='audio'
                playsInline loop  muted
                type="audio/*"
                autostart="off"
                src={vidAud}
                >
            </audio>
            </>
            :
            <img loading="lazy"
            src={file   ?   file    :   vidAud}
            alt="Collections" className =   {class_name} />)
)
}

export default ImgVidAud