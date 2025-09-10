import db from "#server/db/client";
import { createUser } from "#server/db/queries/users";
import { addWinery } from "#server/db/queries/wineries";
import { addReview } from "#server/db/queries/reviews";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  await createUser("foo", "user@example.com", "bar", false);
  await createUser("admin", "admin", "admin@example.com", true);
  await addWinery({
    name: "Test Winery",
    address: "Napa Valley",
    description: "A lovely test winery.",
    image_url: "http://example.com/test-winery.jpg",
  });

  await addReview({
    winery_id: 1,
    user_id: 1,
    venue: 5,
    variety: 5,
    pricing: 5,
    staff: 5,
    overall: 4,
    review_text: "Great experience!",
  });
}
