"use strict";

/*
|--------------------------------------------------------------------------
| DemoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

const Factory = use("Factory");

class DemoSeeder {
  async run() {
    const user1 = await Factory.model("App/Models/User").create();
    const user2 = await Factory.model("App/Models/User").create();
    const user3 = await Factory.model("App/Models/User").create();
    for (var i = 0; i <= 5; i++) {
      const discussion = await Factory.model("App/Models/Discussion").make();
      if (i % 3 === 0) await user3.discussions().save(discussion);
      else if (i % 2 === 0) await user2.discussions().save(discussion);
      else await user1.discussions().save(discussion);
      for (var j = 0; j <= Math.floor(Math.random() * (5 - 2 + 1)) + 2; j++) {
        const comment = await Factory.model("App/Models/Comment").make();
        comment.discussion_id = discussion.id;
        if (j % 3 === 0) user3.comments().save(comment);
        else if (j % 2 === 0) user2.comments().save(comment);
        else user1.comments().save(comment);
      }
    }
    console.info("Seed finished");
    process.exit();
  }
}

module.exports = DemoSeeder;
