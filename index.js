
const fetch = require("node-fetch");
require('dotenv').config()

async function getData() {
  const branchData = [];
  try {
    const res = await fetch(process.env.API_URL, {
      headers: {
        "X-API-Token": process.env.API_TOKEN,
      },
    });
    const JsonFromApi = await res.json();

    JsonFromApi.forEach((element) =>
      branchData.push({
        name: element.branch.name,
        status: element.lastBuild.result,
        timeBuild:
          Date.parse(element.lastBuild.finishTime) -
          Date.parse(element.lastBuild.startTime),
        id: element.lastBuild.id,
      })
    );

    outPutData(branchData);
  } catch (err) {
    // здесь обработать ошибки и выдать человекочитаемые ответы
    throw err;
  }
}

function outPutData(data) {
  data.forEach((element) => {
    const { name, status, timeBuild, id } = element;
    const linkLog = `${process.env.URL_LOG}${name}/builds/${id}`;
    const resultForConsole = `Branch ${name} build ${status} in ${timeBuild} seconds. Link to build logs: ${linkLog}`;
    const resultForWeb = `Branch ${name} build ${status} in ${timeBuild} seconds. Link to build logs: <a href =${linkLog}> LOGI </a>`;

    console.log(resultForConsole);
  });
}

getData()
