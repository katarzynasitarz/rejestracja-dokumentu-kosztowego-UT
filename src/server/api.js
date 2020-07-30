var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.send("Tu niech powstanie dokumentacja usług restowych");
});

router.post("/getMentors", (req, res) => {
  console.log("req.body.params", req.body);
  let response = {
    data: {
      data: {
        result: {
          items: [
            {
              login: "lcichorek",
              fullName: "TEst Testowy",
              skype: "lukaszci06",
            },
            {
              login: "pszyszkowski",
              fullName: "Paweł Szyszkowski",
              skype: "szyszkowskipawell",
            },
          ],
        },
      },
    },
  };
  setTimeout(() => {
    res.status("200").json(response);
    res.end();
  }, 2000);
});

router.post("/getComments", (req, res) => {
  console.log("req.body.params", req.body);
  let response = {
    data: {
      data: {
        result: {
          items: [
            {
              dateAdded: "12-03-2020",
              text: "lorem ipsum dolor sit amet.",
              processStep: "Konsultacja",
              author: "ksitarz",
            },
            {
              dateAdded: "06-04-2020",
              text: "lorem ipsum dolor sit amet.",
              processStep: "Akceptaja",
              author: "atyburska",
            },
            {
              dateAdded: "30-05-2020",
              text: "lorem ipsum dolor sit amet.",
              processStep: "Rejestracja",
              author: "atyburska",
            },
            {
              dateAdded: "09-05-2020",
              text: "lorem ipsum dolor sit amet.",
              processStep: "Anulowanie",
              author: "jszpadkiweicz",
            },
            {
              dateAdded: "19-01-2020",
              text: "lorem ipsum dolor sit amet.",
              processStep: "Akceptacja",
              author: "ksitarz",
            },
          ],
        },
      },
    },
  };
  setTimeout(() => {
    res.status("200").json(response);
    res.end();
  }, 2000);
});

router.post("/saveComment", (req, res) => {
  console.log("req.body.params", req.body);
  let response = {
    data: {
      data: {
        result: {
          items: [{ message: "wysłano!" }],
        },
      },
    },
  };
  setTimeout(() => {
    res.status("200").json(response);
    res.end();
  }, 2000);
});

module.exports = router;
