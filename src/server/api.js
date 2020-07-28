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

router.post("/getImportantLinks", (req, res) => {
  console.log("req.body.params", req.body);
  let response = {
    data: {
      data: {
        result: {
          items: [
            {
              text: "Dokumentacja IBM BPM",
              href:
                "https://www.ibm.com/support/knowledgecenter/en/SSFPJS_8.5.5/com.ibm.wbpm.main.doc/kc-homepage-bpm.html",
            },
            {
              text: "NodeJS",
              href: "https://nodejs.org/en/",
            },
            {
              text: "Vue.js",
              href: "https://vuejs.org/",
            },
            {
              text: "Vue CLI",
              href: "https://cli.vuejs.org/",
            },
            {
              text: "Vuetify",
              href: "https://vuetifyjs.com/en/",
            },
            {
              text: "Github IBPM",
              href: "https://github.com/IBPM-S-A",
            },
            {
              text: "Wiki IBPM",
              href: "https://wiki.ibpm.pro/",
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
              procesStep: "Konsultacja",
              author: "ksitarz",
            },
            {
              dateAdded: "06-04-2020",
              text: "lorem ipsum dolor sit amet.",
              procesStep: "Akceptaja",
              author: "atyburska",
            },
            {
              dateAdded: "30-05-2020",
              text: "lorem ipsum dolor sit amet.",
              procesStep: "Rejestracja",
              author: "atyburska",
            },
            {
              dateAdded: "09-05-2020",
              text: "lorem ipsum dolor sit amet.",
              procesStep: "Anulowanie",
              author: "jszpadkiweicz",
            },
            {
              dateAdded: "19-01-2020",
              text: "lorem ipsum dolor sit amet.",
              procesStep: "Akceptacja",
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

module.exports = router;
