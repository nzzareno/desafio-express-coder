const fs = require("fs");

class Contenedor {
  constructor(txtNameFile) {
    this.txtNameFile = txtNameFile;
    this.products = [];
  }

  async fileInJSON() {
    let fileTxt = await fs.promises.readFile(this.txtNameFile, "utf-8");
    let type = JSON.parse(fileTxt);
    return type;
  }

  async fileSaving(item) {
    let type = JSON.stringify(item);
    await fs.promises.writeFile(this.txtNameFile, type);
  }

  async save(obj) {
    try {
      let fileTxt = await fs.promises.readFile(this.txtNameFile, "utf-8");
      if (fileTxt === "") {
        obj.id = 1;
        this.products.push(obj);
      } else {
        const type = JSON.parse(fileTxt);
        obj.id = type[type.length - 1].id + 1;
        type.push(obj);
        this.products = type;
        this.fileSaving(type);
      }
      console.log(
        "El producto se ha guardado en el archivo satisfactoriamente"
      );
      return obj.id;
    } catch (error) {
      console.error("No se ha podido guardar");
    }
  }

  async getById(id) {
    let type = await this.fileInJSON();
    let product = type.find((product) => product.id == id);
    return console.log(product);
  }

  async getAll() {
    let type = await this.fileInJSON();
    return console.log(type) || type;
  }

  async getRandom() {
    let type = await this.fileInJSON();
    let product = type[Math.floor(Math.random() * type.length)];
    return product;
  }

  async deleteAll() {
    let item = [];
    this.products = item;
    this.fileSaving(item);
  }

  async deleteById(number) {
    let type = await this.fileInJSON();
    let item = type.find((item) => item.id === number);
    let index = type.indexOf(item);
    type.splice(index, 1);
    this.fileSaving(type);
  }
}

module.exports = Contenedor;
