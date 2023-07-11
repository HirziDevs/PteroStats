const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
const axiosRetry = require("axios-retry");
const chalk = require("chalk");

const postStatus = require("./postStatus");

axiosRetry(axios, { retries: 5 });

module.exports = async ({ client }) => {
  function Embed({ node }) {
    return new EmbedBuilder()
      .setTitle("Node Logging") //if you wanted to change this please change at line 244 too
      .setDescription("`" + node.name + "` is down!")
      .setFooter({ text: "Please see console for more details" })
      .setTimestamp()
      .setColor("ED4245");
  }

  if (client.config.channel.startsWith("Put")) {
    console.log(
      chalk.cyan("[PteroStats] ") + chalk.red("Error! Invalid Channel ID")
    );

    process.exit();
  } else if (client.config.panel.url.startsWith("Put")) {
    console.log(
      chalk.cyan("[PteroStats] ") + chalk.red("Error! Invalid Panel URL")
    );

    process.exit();
  } else if (client.config.panel.key.startsWith("Put")) {
    console.log(
      chalk.cyan("[PteroStats] ") + chalk.red("Error! Invalid Apikey")
    );

    process.exit();
  } else if (!client.config.panel.url.startsWith("http")) {
    console.log(
      chalk.cyan("[PteroStats] ") + chalk.red("Error! Invalid Panel URL")
    );
    console.log(
      chalk.cyan("[PteroStats] ") +
        chalk.red(
          '1. Make sure the panel url is starts with "https://" or "http://"'
        )
    );

    process.exit();
  }

  if (client.config.panel.url.endsWith("/")) {
    client.config.panel.url = client.config.panel.url.slice(0, -1);
  }

  const nodes = [];
  const embeds = [];

  const panel = {
    status: false,
    total_servers: -1,
    total_users: -1,
  };

  console.log(chalk.cyan("[PteroStats] ") + chalk.green("Getting nodes stats"));

  try {
    const users = await axios(
      client.config.panel.url + "/api/application/users",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + client.config.panel.key,
        },
      }
    );

    if (users?.status === 200 && users?.data) {
      const servers = await axios(
        client.config.panel.url + "/api/application/servers",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + client.config.panel.key,
          },
        }
      );

      if (servers?.status === 200 && users?.data) {
        panel.total_users = users?.data?.meta?.pagination?.total || "ERROR";
        panel.total_servers = servers?.data.meta?.pagination?.total || "ERROR";
        panel.status = true;

        const res = await axios(
          client.config.panel.url +
            "/api/application/nodes?include=servers,location,allocations",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + client.config.panel.key,
            },
          }
        );

        if (res?.status === 200 && res?.data?.data) {
          for (const node of res.data.data) {
            const data = await axios(
              client.config.panel.url +
                "/api/application/nodes/" +
                node.attributes.id +
                "/configuration",
              {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + client.config.panel.key,
                },
              }
            );

            if (data?.status === 200 && data?.data) {
              const body = {
                id: node.attributes.id,
                name: node.attributes.name,
                location:
                  node.attributes.relationships.location.attributes.short,
                allocations:
                  node.attributes.relationships.allocations.data.length,
                maintenance: node.attributes.maintenance_mode,
                total_servers:
                  node.attributes.relationships.servers.data.length,
                memory_min: node.attributes.allocated_resources.memory,
                memory_max: node.attributes.memory,
                disk_min: node.attributes.allocated_resources.disk,
                disk_max: node.attributes.disk,
              };

              try {
                const stats = await axios(
                  node.attributes.scheme +
                    "://" +
                    node.attributes.fqdn +
                    ":" +
                    node.attributes.daemon_listen +
                    "/api/servers",
                  {
                    method: "GET",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + data.data.token,
                    },
                  }
                );

                if (stats?.status === 200 && stats?.data) {
                  body.status = true;
                } else {
                  body.status = false;
                }

                setTimeout(() => {
                  if (!body?.status) {
                    if (client.config.log_error)
                      console.log(
                        chalk.cyan("[PteroStats] ") +
                          chalk.yellow(
                            "[Node: " + node.attributes.name + "] "
                          ) +
                          chalk.red("Timeout!")
                      );
                    embeds.push(Embed({ node: body }));

                    body.status = false;
                  }
                }, client.config.timeout * 1000);
              } catch (error) {
                if (client.config.log_error)
                  console.log(
                    chalk.cyan("[PteroStats] ") +
                      chalk.yellow("[Node: " + node.attributes.name + "] ") +
                      chalk.red(error)
                  );

                embeds.push(Embed({ node: body }));

                body.status = false;
              }

              nodes.push(body);
            } else {
              throw new Error(
                JSON.stringify({
                  response: {
                    status: data.status,
                  },
                })
              );
            }
          }

          nodes.sort(function (a, b) {
            return a.id - b.id;
          });

          await postStatus({ client: client, panel: panel, nodes: nodes });

          if (
            (client.config.mentions.user.length > 0 ||
              client.config.mentions.role.length > 0) &&
            client.config.mentions.channel
          ) {
            if (
              Array.isArray(client.config.mentions.user) ||
              Array.isArray(client.config.mentions.role)
            ) {
              let mentions = "";

              for (const user of client.config.mentions.user) {
                if (!isNaN(Number(user))) {
                  mentions += " <@" + user + ">";
                }
              }

              for (const role of client.config.mentions.role) {
                if (!isNaN(Number(role))) {
                  mentions += " <@&" + role + ">";
                }
              }

              const channel = await client.channels.cache.get(
                client.config.mentions.channel
              );

              if (channel) {
                const messages = await channel.messages
                  .fetch({ limit: 10 })
                  .then((msg) =>
                    msg
                      .filter(
                        (m) =>
                          m.author.id === client.user.id &&
                          m.embeds[0].data.title === "Node Logging"
                      )
                      .first()
                  );

                if (messages)
                  for (const MsgEmbed of messages.embeds) {
                    for (const embed of embeds) {
                      if (
                        MsgEmbed.data.description === embed.data.description
                      ) {
                        embeds.splice(i, 1);
                      }
                      for (const node of nodes) {
                        if (
                          MsgEmbed.data.description.startsWith(
                            "`" + node.name
                          ) &&
                          node.status
                        ) {
                          messages.delete();
                        }
                      }
                    }
                  }
                if (embeds.length > 0)
                  channel.send({ content: mentions, embeds: embeds });
              }
            }
          }
        } else {
          throw new Error(
            JSON.stringify({
              response: {
                status: res.status,
              },
            })
          );
        }
      } else {
        throw new Error(
          JSON.stringify({
            response: {
              status: servers.status,
            },
          })
        );
      }
    } else {
      throw new Error(
        JSON.stringify({
          response: {
            status: users.status,
          },
        })
      );
    }
  } catch (error) {
    try {
      if (typeof error === "string") {
        error = JSON.parse(error);
      }
    } catch {}

    if (error?.response) {
      if (error.response?.status === 403) {
        console.log(
          chalk.cyan("[PteroStats] ") + chalk.red("Error! Invalid apikey")
        );
        console.log(
          chalk.cyan("[PteroStats] ") +
            chalk.red(
              "1. Make sure the apikey is from admin page not account page"
            )
        );
        console.log(
          chalk.cyan("[PteroStats] ") +
            chalk.red(
              "2. Make sure the apikey has read permission on all options"
            )
        );
        console.log(
          chalk.cyan("[PteroStats] ") +
            chalk.red("3. Make sure the apikey is exist")
        );
      } else if (error.response?.status === 404) {
        console.log(
          chalk.cyan("[PteroStats] ") + chalk.red("Error! Invalid Panel URL")
        );
        console.log(
          chalk.cyan("[PteroStats] ") +
            chalk.red(
              '1. Make sure the panel url is like "https://panel.example.com"'
            )
        );
      } else {
        console.log(chalk.cyan("[PteroStats] ") + chalk.red("Error! " + error));
      }
    } else {
      console.log(chalk.cyan("[PteroStats] ") + chalk.red("Error! " + error));
    }
  }
};
