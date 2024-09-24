// write me an axios request that sends a POST request to /api/v1/drone/command with the query as the body
import { api } from "./api";

export function DroneCommand(command, name) {
  // send the command to the server
  console.log(command);
  api
    .post(`/drone/command/${name}`, command)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
