const fs = require("fs");
const path = require("path");

const PUBLIC_R_DIR = path.join(__dirname, "../public/r");

function replaceUrlsInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");

    const updatedContent = content.replace(
      /NEXT_PUBLIC_BASE_URL/g,
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
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

      if (stat.isDirectory()) {
        processDirectory(filePath);
      } else if (file.endsWith(".json")) {
        replaceUrlsInFile(filePath);
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
