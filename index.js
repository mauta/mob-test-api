// если делаем с node.js, то выносим переменные в .env и .env прописываем в .gitignore

const API_URL = "https://api.appcenter.ms/v0.1/apps/anna.opareva/wewe/branches";
const API_TOKEN = "5fd058c40fa1fd01fb7271ee4fde2c0e032b9a1d";
const URL_LOG =
  "https://appcenter.ms/users/anna.opareva/apps/wewe/build/branches/";

const ul = document.createElement("ul");
document.body.append(ul);

async function getData() {
  const branchData = [];
  try {
    const res = await fetch(API_URL, {
      headers: {
        "X-API-Token": API_TOKEN,
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
    const linkLog = `${URL_LOG}${name}/builds/${id}`;
    const resultForConsole = `Branch ${name} build ${status} in ${timeBuild} seconds. Link to build logs: ${linkLog}`;
    const resultForWeb = `Branch ${name} build ${status} in ${timeBuild} seconds. Link to build logs: <a href =${linkLog}> LOGI </a>`;

    console.log(resultForConsole);

    const li = document.createElement("li");
    li.innerHTML = `<li>${resultForWeb}</li>`;
    ul.append(li);
  });
}

getData()