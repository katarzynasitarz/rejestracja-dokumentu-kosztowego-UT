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
                street: 'Bądkowskiego',
                houseNumber:  '31',
                postalCode: '97-451',
                city: 'Kowale'
                },
            }
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

module.exports = router;