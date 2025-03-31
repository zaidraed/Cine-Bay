const fs = require("fs");
const path = require("path");

// Función para buscar y reemplazar en archivos
function replaceInFiles(directory, searchValue, replaceValue) {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      replaceInFiles(filePath, searchValue, replaceValue);
    } else if (file.endsWith(".js")) {
      let content = fs.readFileSync(filePath, "utf8");
      if (content.includes(searchValue)) {
        content = content.replace(new RegExp(searchValue, "g"), replaceValue);
        fs.writeFileSync(filePath, content, "utf8");
      }
    }
  });
}

// Arreglo de rutas después de la compilación
console.log("Corrigiendo rutas de importación...");
replaceInFiles("./dist", 'require\\("src/', 'require\\("./');
console.log("Rutas corregidas con éxito!");
