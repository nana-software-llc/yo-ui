const fs = require("fs");
const path = require("path");

const PUBLIC_R_DIR = path.join(__dirname, "../public/r");

function repairContentInFile(
  filePath,
  { replaceExportDefault, replaceExportToObject }
) {
  try {
    const content = fs.readFileSync(filePath, "utf8");

    let updatedContent = content.replace(
      /NEXT_PUBLIC_BASE_URL/g,
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    );

    updatedContent = updatedContent.replace(
      replaceExportDefault,
      replaceExportToObject
    );

    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, "utf8");
      console.log(`✅ Updated: ${path.relative(process.cwd(), filePath)}`);
    } else {
      console.log(`⏭️  No changes: ${path.relative(process.cwd(), filePath)}`);
    }
  } catch (error) {
    console.error(`❌ Error processing file ${filePath}:`, error.message);
  }
}

function processDirectory(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);

      const fileName = path.basename(filePath, path.extname(filePath));
      const className = fileName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");

      const replaceExportDefault = `export default function ${className}(`;
      const replaceExportToObject = `export function ${className}(`;

      if (stat.isDirectory()) {
        processDirectory(filePath);
      } else if (file.endsWith(".json")) {
        repairContentInFile(filePath, {
          replaceExportDefault,
          replaceExportToObject,
        });
      }
    });
  } catch (error) {
    console.error(`❌ Error reading directory ${dirPath}:`, error.message);
  }
}

// Start processing
console.log("🔄 Starting to replace URLs in JSON files...");
processDirectory(PUBLIC_R_DIR);
console.log("✅ Finished replacing URLs!");
