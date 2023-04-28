import { Telegraf } from "telegraf";
import axios from "axios";
import cheerio from "cheerio";

const bot = new Telegraf(process.env.BOT_TOKEN);
const url =
  "https://zh.wiktionary.org/w/index.php?title=Special:%E7%94%A8%E6%88%B7%E8%B4%A1%E7%8C%AE/Hzy980512&target=Hzy980512&limit=10";
bot.on("message", async (ctx) => {
  console.log("message", ctx.message);
  axios
    .get(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const lastItem = $(".mw-contributions-list li").first();
      const lastDate = lastItem.find(".mw-changeslist-date").text();
      const lastWord = lastItem.find(".mw-contributions-title").text();
      console.log("lastDate", `${lastDate} ${lastWord}`);
      ctx.telegram.sendMessage(ctx.message.from.id, `${lastDate} ${lastWord}`);
    })
    .catch((error) => {
      console.log("error", error);
    });
});
bot.on("channel_post", async (ctx) => {
  console.log("channel_post", ctx);
});
bot.launch();
