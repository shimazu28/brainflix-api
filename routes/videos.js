const router = require("express").Router();
const fs = require("fs");
const videoData = require("../data/videos.json");
const { v4 } = require("uuid");

router
  .get("/", (req, res) => {
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
    const videoID = req.params.id;
    const selectedVideo = videoData.find((data) => data.id === videoID);
    res.status(200).send(selectedVideo);
  })

  .post("/", (req, res) => {
    const newVideoData = {
      id: v4(),
      title: req.body.title,
      channel: req.body.channel,
      image: req.body.image,
      description: req.body.image,
      views: 0,
      likes: 0,
      duration: req.body.duration,
      video: req.body.video,
      timestamp: req.body.timestamp,
      comments: [
        {
          id: v4(),
          name: req.body.name,
          comment: req.body.comment,
          likes: 0,
          timestamp: req.body.timestamp,
        },
      ],
    }
    videoData.push(newVideoData)
        fs.writeFileSync('../data/videos.json', JSON.stringify(videoData), (err) => {
            if(err){
                console.log(err)
            } else {
                res.status(200).send("suceess!")
            }
        })
    })
module.exports = router;
