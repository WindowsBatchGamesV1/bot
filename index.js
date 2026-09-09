const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const SUPPORTER_ROLE_ID = process.env.SUPPORTER_ROLE_ID;

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  const hadRole = oldMember.roles.cache.has(SUPPORTER_ROLE_ID);
  const hasRole = newMember.roles.cache.has(SUPPORTER_ROLE_ID);

  if (!hadRole && hasRole) {
    try {
      await newMember.send(
        "🎉 Congrats! You now have **Supporter**!"
      );

      console.log(`Sent Supporter message to ${newMember.user.tag}`);
    } catch {
      console.log(`Couldn't DM ${newMember.user.tag}`);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);