import { useEffect } from "react";
import { useState } from "react"
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Typography, Box, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { CheckCircle } from "@mui/icons-material";
import Videos from "./Videos";


const VideoDetail = () => {
    const [VideoDetail, setVideoDetail] = useState(null);
    const [videos, setVideos] = useState(null);
    const { id } = useParams();
    console.log('new');
    useEffect(() => {
        const fetchVideoDetail = async () => {
            const data = await fetchFromAPI(`videos?part=snippet,statistics&id=${id}`);
            setVideoDetail(data.items[0]);
            const data2 = await fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`);
            setVideos(data2.items);
        }
        fetchVideoDetail();

    }, [id]);

    if (!VideoDetail?.snippet) return "loading...";
    const {
        snippet: { title, channelId, channelTitle },
        statistics: { viewCount, likeCount },
    } = VideoDetail;

    return (
        <Box minHeight="95vh">
            <Stack direction={{ xs: "column", md: "row" }}>
                <Box flex={1}>
                    <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${id}`}
                            className="react-player desktop-only1"
                            controls
                        />
                        <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
                            {title}
                        </Typography>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            py={1}
                            px={2}
                            sx={{ color: "#fff" }}
                        >
                            <Link to={`/channel/${channelId}`}>
                                <Typography
                                    variant={{ sm: "subtitle1", md: "h6" }}
                                    color="#fff"
                                    fontWeight="bold"
                                >
                                    {channelTitle}
                                    <CheckCircle
                                        sx={{ fontSize: "16px", color: "#0AF", ml: "5px" }}
                                    />
                                </Typography>
                            </Link>
                            <Stack direction="row" gap="20px" alignItems="center">
                                <Typography variant="body1" sx={{ opacity: "0.7" }}>
                                    {parseInt(viewCount).toLocaleString()} views
                                </Typography>
                                <Typography variant="body1" sx={{ opacity: "0.7" }}>
                                    {parseInt(likeCount).toLocaleString()} likes
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
                <Box
                    px={1}
                    py={{ md: 1, xs: 5 }}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Videos videos={videos} direction='column' />
                </Box>
            </Stack>
        </Box>
    );

};

export default VideoDetail;