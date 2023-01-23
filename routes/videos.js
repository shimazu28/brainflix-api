const router = require("express").Router();
const fs = require("fs");
const { v4 } = require("uuid");

function getVideos() {
    const videosFile = fs.readFileSync("./data/videos.json");
    const videosData = JSON.parse(videosFile);
    return videosData;
  }

router
  .get("/", (req, res) => {
    const videoData = getVideos()
    const status = videoData.map((result) => {
      return {
        id: result.id,
        title: result.title,
        channel: result.channel,
        image: result.image,
      };
    });
    res.status(200).send(status);
  })

  .get("/:id", (req, res) => {
    const videoData = getVideos();
    const videoID = req.params.id;
    const selectedVideo = videoData.find((data) => data.id === videoID);
    res.status(200).send(selectedVideo);
  })

  .post("/", (req, res) => {
console.log(req.body);
    const { title, description } = req.body;
    const newVideoData = {
      id: v4(),
      title,
      channel: "Elf",
      image: "http://localhost:8888/images/upload-video-preview.jpg",
      description,
      views: "454",
      likes: "23",
      duration: "3:31",
      video: "http://localhost:8888/video/brainstation.mp4",
      timestamp: Date.now(),
      comments: [{
        "id": "2d818087-c1f4-4ec2-bcdc-b545fd6ec233",
        "name": "Legolas Evergreen",
        "comment": "Of course, req body isn't working, but we aren't yet done! Nice!",
        "likes": 3,
        "timestamp": Date.now()
    },
    {
        "id": "191de346-b3c2-47b4-bf5b-6db90d1e3bac",
        "name": "Aragorn",
        "comment": "Try again? You will succeed",
        "likes": 0,
        "timestamp": Date.now()
    }],
    }

    const videoData = getVideos();
    videoData.push(newVideoData);
    fs.writeFileSync("data/videos.json", JSON.stringify(videoData));
    res.status(201).send("added video")
  });
module.exports = router;
