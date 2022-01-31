import pkg from "mongoose";
import fs from "fs";
import { google } from "googleapis";

const CALENDAR_ID = "si5gunvnmlvphaeonkm0ipl1uc@group.calendar.google.com";
const KEYFILE = "Habr Demo-4ec17ea5f8b6.json";
const SCOPE_CALENDAR = "https://www.googleapis.com/auth/calendar";
const SCOPE_EVENTS = "https://www.googleapis.com/auth/calendar.events";
const JSONTOKEN = fs.readFileSync("nikaweb-6ee99c657bc0.json");

let jsonToken = JSON.parse(JSONTOKEN);
let calendar = google.calendar("v3");
const key = jsonToken;

const aauth = async (key) => {
  const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    [SCOPE_CALENDAR, SCOPE_EVENTS]
  );

  await jwtClient.authorize();
  return jwtClient;
};

export async function addNew(dateFrom, dateTo) {
  console.log(dateFrom, "dateFrom");
  console.log(dateTo, "dateTo");
  let descr;
  let id;
  async function createEvent(auth) {
    console.log(0);
    const event = {
      summary: "nikaTest",
      description: "Тест для NikaWeb",
      start: {
        dateTime: dateFrom,
        timeZone: "Europe/Kiev",
      },
      end: {
        dateTime: dateTo,
        timeZone: "Europe/Kiev",
      },
    };

    await calendar.events
      .insert({
        auth: auth,
        calendarId: CALENDAR_ID,
        resource: event,
      })
      .then((res) => {
        console.log(res, "res");
      });

    // let test1 = await calendar.events.insert({
    //   auth: auth,
    //   calendarId: CALENDAR_ID,
    //   resource: event,
    // });

    // console.log(test1, "test1");
    // console.log(test1.data.id, "test1");
    // console.log(test1.config.data.description, "test1.config.data.description");

    descr = test1.config.data.description;
    id = test1.data.id;
    console.log(test1, "test1");
  }

  try {
    const auth = await aauth(key);
    await createEvent(auth);
  } catch (e) {
    console.log("Error: " + e);
  }
  return { descr: descr, id: id, message: `descr: ${descr} id: ${id}` };
}

export async function getAll() {
  let test1;
  async function getEvents(auth) {
    test1 = await calendar.events.list({
      auth: auth,
      calendarId: CALENDAR_ID,
    });
    // console.log(test1.data.items, "test1");
  }

  try {
    const auth = await aauth(key);
    await getEvents(auth);
  } catch (e) {
    console.log("Error: " + e);
  }
  return { items: test1.data.items };
}

export async function delOne(id) {
  let test;
  async function delEvent(auth) {
    test = await calendar.events.delete({
      auth: auth,
      calendarId: CALENDAR_ID,
      eventId: id,
    });
    // console.log(test, "test");
  }

  try {
    const auth = await aauth(key);
    await delEvent(auth);
  } catch (e) {
    console.log("Error: " + e);
  }

  return test;
}
