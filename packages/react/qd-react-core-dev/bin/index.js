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
  await execAsync(`
    wget -O mkcert $(curl --silent "https://api.github.com/repos/FiloSottile/mkcert/releases/latest"  | grep -Eo 'https.*linux-amd64')
    chmod +x mkcert
    mv mkcert /usr/local/bin
  `)
}

start();