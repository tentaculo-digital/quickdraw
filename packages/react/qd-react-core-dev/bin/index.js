import { exec } from "child_process";


const execAsync = (query) => {
  return new Promise((resolve, reject) => {
    exec(query, (error, stdout, stderr) => {
      console.log("error", error)
      console.log("stdout", stdout)
      console.log("stderr", stderr)
      resolve();
    });
  });
};

const start = async () => {
  await execAsync(`yarn core-dev`)
}

start();