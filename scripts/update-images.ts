import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://sqesgghvaazyajzjkoap.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI"
);

const categoryImages: Record<string, string> = {
  experiences:
    "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1200&q=80",
  beaches:
    "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=1200&q=80",
  culture:
    "https://images.unsplash.com/photo-1677507052989-f92898832318?w=1200&q=80",
  nature:
    "https://images.unsplash.com/photo-1590003229635-ceb493adb1de?w=1200&q=80",
  food: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=1200&q=80",
  nightlife:
    "https://images.unsplash.com/photo-1657539130712-7a5782763d94?w=1200&q=80",
  shopping:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
  family:
    "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=1200&q=80",
  wellness:
    "https://images.unsplash.com/photo-1523788200305-636fa871410a?w=1200&q=80",
};

const areaImages: Record<string, string> = {
  "costa-adeje":
    "https://images.unsplash.com/photo-1559511260-66a654ae982a?w=1200&q=80",
  "los-cristianos":
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
  "puerto-de-la-cruz":
    "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=1200&q=80",
  "santa-cruz":
    "https://images.unsplash.com/photo-1518182170546-0766be6f4a56?w=1200&q=80",
  "la-laguna":
    "https://images.unsplash.com/photo-1677507052989-f92898832318?w=1200&q=80",
  "los-gigantes":
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80",
  teide:
    "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1200&q=80",
  anaga:
    "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80",
};

const itemImages: Record<string, string> = {
  "whale-dolphin-catamaran":
    "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=1200&q=80",
  "teide-stargazing":
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
  "teide-sunrise-cable-car":
    "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1200&q=80",
  "playa-del-duque":
    "https://images.unsplash.com/photo-1559511260-66a654ae982a?w=1200&q=80",
  "playa-de-las-teresitas":
    "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=1200&q=80",
  "playa-de-benijo":
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80",
  "masca-valley":
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",
  "anaga-laurel-forest":
    "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80",
  "siam-park":
    "https://images.unsplash.com/photo-1565275945520-e79e0fd6bf46?w=1200&q=80",
  "loro-parque":
    "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=1200&q=80",
};

async function updateTable(
  table: string,
  images: Record<string, string>,
  label: string
) {
  console.log(`\n--- Updating ${label} (${table}) ---`);
  let success = 0;
  let failed = 0;

  for (const [slug, image] of Object.entries(images)) {
    const { data, error } = await supabase
      .from(table)
      .update({ image })
      .eq("slug", slug)
      .select("slug");

    if (error) {
      console.error(`  FAIL  ${slug}: ${error.message}`);
      failed++;
    } else if (!data || data.length === 0) {
      console.warn(`  SKIP  ${slug}: no matching row found`);
      failed++;
    } else {
      console.log(`  OK    ${slug}`);
      success++;
    }
  }

  console.log(
    `  Result: ${success} updated, ${failed} failed/skipped out of ${Object.keys(images).length}`
  );
}

async function main() {
  console.log("Starting image updates...");

  await updateTable("categories", categoryImages, "Categories");
  await updateTable("areas", areaImages, "Areas");
  await updateTable("items", itemImages, "Items");

  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
