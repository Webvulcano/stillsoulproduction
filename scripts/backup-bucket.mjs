// Egyszeri: a `portfolio` bucket teljes tartalmát lementi helyre (backup).
// Futtatás: node --env-file=.env.local scripts/backup-bucket.mjs <célmappa>
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const dest = process.argv[2];
if (!dest) throw new Error("Hiányzik a célmappa.");
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function walk(prefix = "") {
  const { data, error } = await supabase.storage.from("portfolio").list(prefix, { limit: 1000 });
  if (error) throw error;
  const out = [];
  for (const e of data) {
    const p = prefix ? `${prefix}/${e.name}` : e.name;
    if (e.id) out.push(p);
    else out.push(...(await walk(p)));
  }
  return out;
}

const files = await walk();
let bytes = 0;
for (const p of files) {
  const { data, error } = await supabase.storage.from("portfolio").download(p);
  if (error) throw new Error(`${p}: ${error.message}`);
  const buf = Buffer.from(await data.arrayBuffer());
  fs.mkdirSync(path.dirname(path.join(dest, p)), { recursive: true });
  fs.writeFileSync(path.join(dest, p), buf);
  bytes += buf.length;
}
console.log(`${files.length} fájl, ${(bytes / 1024 / 1024).toFixed(1)} MB → ${dest}`);
