import fs from "fs";
export default class Archivo {
  //le paso como parametro el file
  constructor(file) {
    this.file = file;
  }
  //lee del file el contenido
  async leer() {
    try {
      const arr = await fs.promises.readFile(this.file);
      return JSON.parse(arr);
    } catch (error) {
      console.error("Error en archivo:", error);
      return []; //si no encuentra el file o no puedo accederlo devuelvo []
    }
  }
}
