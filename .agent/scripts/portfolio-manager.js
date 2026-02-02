const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

// Paths
const DATA_PATH = path.join(__dirname, "../../src/data/projects.json");
const IMAGES_DIR = path.join(__dirname, "../../public/images/projects");

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

async function runPortfolioUpdate() {
  console.log("🚀 Starting Portfolio Manager Agent...");

  // Read projects data
  let projects = [];
  try {
    const data = fs.readFileSync(DATA_PATH, "utf8");
    projects = JSON.parse(data);
  } catch (error) {
    console.error("❌ Error reading projects.json:", error);
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  });

  let updatesMade = false;

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];

    // Only process websites with valid URLs
    if (
      project.isWebsite &&
      project.websiteUrl &&
      !project.websiteUrl.includes("youtube.com")
    ) {
      console.log(`\n📸 Processing: ${project.title} (${project.websiteUrl})`);

      try {
        const page = await context.newPage();

        // Go to page
        await page.goto(project.websiteUrl, {
          waitUntil: "networkidle",
          timeout: 30000,
        });

        // Take Screenshot
        const imageName = `${project.id}.png`;
        const imagePath = path.join(IMAGES_DIR, imageName);
        const publicPath = `/images/projects/${imageName}`;

        await page.screenshot({ path: imagePath });
        console.log(`   ✅ Screenshot saved: ${imageName}`);

        // Update Project Data
        if (project.image !== publicPath) {
          project.image = publicPath;
          updatesMade = true;
          console.log("   ✏️  Updated image path in data.");
        }

        // --- Description Analysis (Optional Improvement) ---
        // We generally KEEP the existing description as requested, but if it's missing or effectively empty, we could suggest one.
        // For now, we will just log what the site says about itself vs what we have.
        try {
          const metaDescription = await page
            .$eval('meta[name="description"]', (el) => el.content)
            .catch(() => null);
          if (metaDescription) {
            // If current description is very short or placeholder-like, we might want to swap it.
            // For now, let's just update a "metaDescription" field if you want to track it without overwriting user content manually
            // OR just leave it alone. The user said "keep the description".
            // I will add a 'lastChecked' timestamp.
          }
        } catch (e) {
          // ignore
        }

        project.lastUpdated = new Date().toISOString();
        updatesMade = true;

        await page.close();
      } catch (error) {
        console.error(
          `   ❌ Failed to capture ${project.title}:`,
          error.message,
        );
      }
    }
  }

  await browser.close();

  if (updatesMade) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(projects, null, 2), "utf8");
    console.log("\n💾 Updated projects.json with new data.");
  } else {
    console.log("\n✨ No changes needed for projects.json.");
  }

  console.log("🏁 Portfolio Manager Agent finished.");
}

runPortfolioUpdate().catch(console.error);
