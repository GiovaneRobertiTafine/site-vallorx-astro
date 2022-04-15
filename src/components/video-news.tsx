import React, { useEffect, useState } from 'react';
import * as obterVideos from "../js/obter-videos.js";

const VideoNews: React.FC<null> = () => {
    const [news, setNews] = useState<[]>([]);

    useEffect(() => {
        obterVideos.obterVideos()
            .then((r) => {
                const res = JSON.parse(r);
                setNews(res);
            });
    }, []);

    return (
        <>
            {
                news.map((video, i) => (
                    <div key={i}>
                        <button className="btn btn-primary float-end d-none d-lg-block" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + video.Id} aria-expanded="false" aria-controls={"collapse" + video.Id}>
                            Assitir vídeo
                            <img src="/assets/svg/play.svg" alt="play" />
                        </button>
                        <h3>{video.Title}</h3>
                        <p className="pt-3">{video.Description}</p>
                        <button className="btn btn-primary float-lg-end d-lg-none mb-3" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + video.Id} aria-expanded="false" aria-controls={"collapse" + video.Id}>
                            Assitir vídeo
                            <img src="/assets/svg/play.svg" alt="play" />
                        </button>
                        <div className="collapse" id={"collapse" + video.Id}>
                            <video className="mx-auto w-100" controls width="70%" poster="" controlsList="nodownload" preload="auto">
                                <source src={"https://vallorx.com.br/videos/" + video.FileName} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                ))

            }
        </>
    );
};

export default VideoNews;