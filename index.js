const ul = document.createElement('ul');
document.body.append(ul);

async function getData() {
  try {
    const res = await fetch(
      "https://api.appcenter.ms/v0.1/apps/anna.opareva/wewe/branches",
      {
        headers: {
          "X-API-Token": "5fd058c40fa1fd01fb7271ee4fde2c0e032b9a1d",
        },
      }
    );
    const result = await res.json();
    result.forEach(element => {
      const name = element.branch.name;
      const status = element.lastBuild.result;
      const timeBuild = Date.parse(element.lastBuild.finishTime)-Date.parse(element.lastBuild.startTime);
      const linkLog = `https://appcenter.ms/users/anna.opareva/apps/wewe/build/branches/${name}/builds/${element.lastBuild.id}`;

      const resultForConsole = `Branch ${name} build ${status} in ${timeBuild} seconds. Link to build logs: ${linkLog}`;
      const resultForWeb = `Branch ${name} build ${status} in ${timeBuild} seconds. Link to build logs: <a href =${linkLog}> LOGI </a>`;
      console.log(resultForConsole);

      const li = document.createElement('li');
      li.innerHTML = `<li>${resultForWeb}</li>`;

      ul.append(li)
    });
  } catch (err) {
    throw err;
  }
}

getData()