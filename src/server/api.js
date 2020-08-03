var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.send("Tu niech powstanie dokumentacja usług restowych");
});

router.post("/saveContractor", (req, res) => {
  console.log("req.body.params", req.body);
  let response = {
    data: {
      data: {
        result: {
          items: [
            {
              name: "zapisany!",
              nip: "zapisany",
              email: "zapisany",
              address: {
                street: "Bądkowskiego",
                houseNumber: "31",
                postalCode: "97-451",
                city: "Kowale",
              },
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

router.post("/getContractor", (req, res) => {
  console.log("req.body.params", req.body);
  let response = {
    data: {
      data: {
        result: {
          items: [
            {
              name: "Drogi Pamiętniku",
              nip: "106-34-00-062",
              email: "pamietnik@for.ever",
              address: {
                street: "Bądkowskiego",
                houseNumber: "31",
                postalCode: "97-451",
                city: "Kowale",
              },
            },
            {
              name: "Pamiątki z podróży",
              nip: "356-00-10-056",
              email: "pamiatkiz@gmail.com",
              address: {
                street: "Żuławskiego",
                houseNumber: "4/6",
                postalCode: "52-501",
                city: "Sztum",
              },
            },
            {
              name: "Domestos i spółka",
              nip: "254-06-90-076",
              email: "biuro@chemiadopracy.com",
              address: {
                street: "Dolna",
                houseNumber: "55",
                postalCode: "00-781",
                city: "Warszawa",
              },
            },
            {
              name: "Dezynfex",
              nip: "123-08-70-567",
              email: "biuro@dezynfex.com",
              address: {
                street: "Książęca",
                houseNumber: "33",
                postalCode: "12-654",
                city: "Grodzisk Mazowiecki",
              },
            },
            {
              name: "Kuchnia Węgierska",
              nip: "134-12-10-042",
              email: "office@smakiwegier.com",
              address: {
                street: "1000lecia",
                houseNumber: "11",
                postalCode: "78-456",
                city: "Jankowo",
              },
            },
          ],
        },
      },
    },
  };
  setTimeout(() => {
    res.status("200").json(response);
    res.end();
  }, 1000);
});

router.post("/getTeams", (req, res) => {
  console.log("req.body.params", req.body);
  let response = {
    data: {
      data: {
        result: {
          items: [
            "Dział Obrony",
            "Dział Finansów",
            "Dział Gier i Zabaw",
            "Dział Rozwoju Kosmonautyki",
          ],
        },
      },
      actions: null,
    },
  };
  setTimeout(() => {
    res.status("200").json(response);
    res.end();
  }, 1000);
});

router.post("/getComments", (req, res) => {
  console.log("req.body.params", req.body);
  let response = {
    data: {
      data: {
        comments: {
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

router.post("/getCons", (req, res) => {
  console.log("req.body.params", req.body);
  let response = {
    data: {
      data: {
        result: {
          items: [
            { fullName: "Angelika Tyburska" },
            { fullName: "Joanna Szpadkiewicz" },
            { fullName: "Katarzyna Sitarz" },
          ],
        },
      },
      actions: null,
    },
  };
  setTimeout(() => {
    res.status("200").json(response);
    res.end();
  }, 1000);
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

router.post("/getDocumentListService", (req, res) => {
  var documentList = { items: [] };
  var documentListLength = 5;
  for (let docIndex = 0; docIndex < documentListLength; docIndex++) {
    var document = {
      documentId: 35235235 + 1000 * docIndex,
      documentName: `Testowy dokument v.${(docIndex + 1).toString()}`,
      issueDate: "2019-01-29T18:32:03.268Z",
      author: "Ja",
      version: docIndex + 1,
    };
    documentList.items.push(document);
  }

  var data = {
    status: "200",
    data: {
      data: {
        messageInfo: "Dokument został usunięty",
        serviceStatus: "end",
        key: "@6296",
        step: "End",
        documentList,
        actions: null,
      },
    },
  };
  setTimeout(() => {
    res.status("200").json(data);
    res.end();
  }, 1000);
});
router.post("/createDocumentService", (req, res) => {
  var data = {
    status: "200",
    data: {
      data: {
        messageInfo: "Dokument został dodany",
        serviceStatus: "end",
        key: "@6296",
        step: "End",
        data: {
          documentId:
            "workspace://SpacesStore/893b061c-642a-4bec-befa-ba2c5056ff06;1.0",
        },
        actions: null,
      },
    },
  };
  setTimeout(() => {
    res.status("200").json(data);
    res.end();
  }, 1000);
});
router.post("/deleteDocumentService", (req, res) => {
  var data = {
    status: "200",
    data: {
      data: {
        messageInfo: "Dokument został usunięty",
        serviceStatus: "end",
        key: "@6296",
        step: "End",
        data: {},
        actions: null,
      },
    },
  };
  setTimeout(() => {
    res.status("200").json(data);
    res.end();
  }, 1000);
});
router.post("/getDocumentContentService", (req, res) => {
  var data = {
    status: "200",
    data: {
      serviceStatus: "end",
      key: "@6361",
      step: "End",
      data: {
        contentStream: {
          contentLength: 2753,
          mimeType: "text/html",
          fileName: "reklamacja_potwierdzenie_1496407193158_1496409294982.html",
          content:
            "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",
          "@metadata": {
            objectID: "29c94f34-a3b4-44ce-9935-99120451bcb6",
            dirty: true,
            invalid: false,
            shared: false,
            rootVersionContextID: "2064.92dfbd88-cfc5-4f3f-9e2b-88eefd063e5b",
            className: "ECMContentStream",
          },
        },
      },
      actions: null,
    },
  };
  setTimeout(() => {
    res.status("200").json(data);
    res.end();
  }, 1000);
});

module.exports = router;
